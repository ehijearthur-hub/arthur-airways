import { airports } from '../data/mockData.js'

export default function BookingSummary({ flight, cabinClass = 'Economy', addOns = [], passengers = 1 }) {
  const fare = flight.cabinClasses.find((c) => c.type === cabinClass) || flight.cabinClasses[0]
  const fareTotal = fare.price * passengers
  const taxesAndFees = Math.round(fareTotal * 0.12 * 100) / 100
  const addOnsTotal = addOns.reduce((sum, a) => sum + a.price, 0)
  const total = (fareTotal + taxesAndFees + addOnsTotal).toFixed(2)

  const originCity = airports.find((a) => a.code === flight.origin)?.city || flight.origin
  const destinationCity = airports.find((a) => a.code === flight.destination)?.city || flight.destination
  const departDate = new Date(flight.departureTime)
  const dateLabel = departDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  const departTime = departDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  const arriveTime = new Date(flight.arrivalTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">Booking Summary</h3>

      <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
        <span>Outbound</span>
        <span>{dateLabel}</span>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-navy-900">{flight.origin}</p>
          <p className="text-xs text-slate-400">{departTime}</p>
        </div>
        <div className="flex-1 px-3 text-center text-xs text-slate-300">
          <p>{flight.duration}</p>
          <div className="my-1 h-px bg-slate-200" />
          <p>{originCity} → {destinationCity}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-navy-900">{flight.destination}</p>
          <p className="text-xs text-slate-400">{arriveTime}</p>
        </div>
      </div>

      <div className="space-y-2 border-t border-slate-100 pt-4 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>{passengers}x Adult</span>
          <span>${fareTotal.toFixed(2)}</span>
        </div>
        {passengers > 1 && (
          <p className="-mt-1 text-xs text-slate-400">${fare.price.toFixed(2)} × {passengers} passengers</p>
        )}
        <div className="flex justify-between text-slate-600">
          <span>Taxes &amp; Fees</span>
          <span>${taxesAndFees.toFixed(2)}</span>
        </div>
        {addOns.map((a) => (
          <div key={a.id} className="flex justify-between text-slate-600">
            <span>{a.name}</span>
            <span>${a.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between border-t border-slate-200 pt-4">
        <span className="font-bold text-navy-900">Total</span>
        <span className="text-xl font-bold text-navy-900">${total}</span>
      </div>
    </aside>
  )
}