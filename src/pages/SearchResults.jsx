import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { flights, airports } from '../data/mockData.js'
import FlightCard from '../components/FlightCard.jsx'
import { FiChevronDown } from 'react-icons/fi'

function economyPrice(flight) {
  return flight.cabinClasses.find((c) => c.type === 'Economy')?.price ?? flight.cabinClasses[0].price
}

function parseDurationToMinutes(duration) {
  const match = duration.match(/(\d+)h\s*(\d+)?m?/)
  if (!match) return 0
  return parseInt(match[1], 10) * 60 + (parseInt(match[2], 10) || 0)
}

function bestScore(flight) {
  return economyPrice(flight) * 0.6 + parseDurationToMinutes(flight.duration) * 0.4
}

function formatDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (isNaN(d)) return null
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const depart = formatDate(searchParams.get('depart'))
  const returnDate = formatDate(searchParams.get('returnDate'))
  const passengers = parseInt(searchParams.get('passengers'), 10) || 1
  const cabinClass = searchParams.get('cabinClass') || 'Economy'

  const fromAirport = airports.find((a) => a.code === from)
  const toAirport = airports.find((a) => a.code === to)

  const [sortBy, setSortBy] = useState('best')
  const [visibleCount, setVisibleCount] = useState(2)

  const results = useMemo(() => {
    return flights.filter((f) => (!from || f.origin === from) && (!to || f.destination === to))
  }, [from, to])

  useEffect(() => {
    setVisibleCount(2)
    setSortBy('best')
  }, [from, to])

  const cheapestFlight = useMemo(() => [...results].sort((a, b) => economyPrice(a) - economyPrice(b))[0], [results])
  const fastestFlight = useMemo(() => [...results].sort((a, b) => parseDurationToMinutes(a.duration) - parseDurationToMinutes(b.duration))[0], [results])
  const bestFlight = useMemo(() => [...results].sort((a, b) => bestScore(a) - bestScore(b))[0], [results])

  const sortedResults = useMemo(() => {
    const sorted = [...results]
    if (sortBy === 'cheapest') sorted.sort((a, b) => economyPrice(a) - economyPrice(b))
    else if (sortBy === 'fastest') sorted.sort((a, b) => parseDurationToMinutes(a.duration) - parseDurationToMinutes(b.duration))
    else sorted.sort((a, b) => bestScore(a) - bestScore(b))
    return sorted
  }, [results, sortBy])

  const visibleResults = sortedResults.slice(0, visibleCount)

  function handleSelect(flight) {
  navigate(`/booking/${flight.id}?passengers=${passengers}`)
}

  if (!bestFlight) {
    return (
      <div className="px-6 py-12 text-center md:px-12">
        <p className="text-sm text-slate-500">No flights match that route yet — try a different origin or destination.</p>
      </div>
    )
  }

  const tabs = [
    { key: 'best', label: 'Best', flight: bestFlight },
    { key: 'cheapest', label: 'Cheapest', flight: cheapestFlight },
    { key: 'fastest', label: 'Fastest', flight: fastestFlight },
  ]

  return (
    <div className="px-6 py-8 md:px-12 max-w-5xl mx-auto">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-navy-900">
          {fromAirport ? `${fromAirport.city} (${fromAirport.code})` : from || '?'}
          {' '}✈{' '}
          {toAirport ? `${toAirport.city} (${toAirport.code})` : to || '?'}
        </h1>

      </div>
      <p className="mb-8 text-sm text-slate-500">
        {depart}{returnDate ? ` - ${returnDate}` : ''} · {passengers} Passenger{passengers !== 1 ? 's' : ''}, {cabinClass}
      </p>

      <div className="mb-8 grid gap-3 rounded-2xl border border-slate-200 p-3 md:grid-cols-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSortBy(tab.key)}
            className={`rounded-xl px-4 py-3 text-center transition ${
              sortBy === tab.key ? 'bg-gold-400 text-navy-900' : 'bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            <p className="text-sm font-semibold">{tab.label}</p>
            <p className="text-xs">${economyPrice(tab.flight) * passengers} · {tab.flight.duration}</p>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {visibleResults.map((flight) => (
          <FlightCard key={flight.id} flight={flight} onSelect={handleSelect} passengers={passengers} />
        ))}
      </div>

      {visibleCount < sortedResults.length && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setVisibleCount((c) => c + 5)}
            className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <FiChevronDown className="inline-block mr-2" />
            Load More Flights
          </button>
        </div>
      )}
    </div>
  )
}