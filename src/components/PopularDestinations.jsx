import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/mockData.js'

export default function PopularDestinations() {
  const popular = destinations
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % popular.length)
  }, [popular.length])

  const prev = () => setIndex((i) => (i - 1 + popular.length) % popular.length)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 4500)
    return () => clearInterval(timer)
  }, [paused, next])

  return (
    <section id="popular-destinations" className="px-6 py-16 md:px-12">
      <h2 className="mb-8 text-center text-2xl font-bold text-navy-900">Popular Destinations</h2>

      <div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {popular.map((d) => (
            <div key={d.id} className="relative w-full flex-shrink-0">
              <img src={d.image} alt={d.city} className="h-72 w-full object-cover md:h-96" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 text-white">
                <div>
                  <p className="text-2xl font-bold">{d.city}</p>
                  <p className="text-sm text-slate-200">{d.country}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-200">From</p>
                  <p className="mb-2 text-xl font-bold text-gold-400">${d.startingPrice}</p>
                  <Link
                    to={`/search?to=${d.airportCode}`}
                    className="inline-block rounded-full border border-white/50 px-4 py-1.5 text-xs font-semibold hover:bg-white/10"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          aria-label="Previous destination"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-navy-900 hover:bg-white"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next destination"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-navy-900 hover:bg-white"
        >
          ›
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {popular.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to ${d.city}`}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-gold-400' : 'w-2 bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}