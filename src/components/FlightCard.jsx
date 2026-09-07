export default function FlightCard({ flight, onSelect, passengers = 1 }) {
  const economy = flight.cabinClasses.find((c) => c.type === 'Economy') || flight.cabinClasses[0]
  const total = economy.price * passengers
  const statusStyle =
    flight.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
    flight.status === 'Delayed' ? 'bg-amber-100 text-amber-700' :
    'bg-emerald-100 text-emerald-700'

  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 p-5 md:flex-row md:items-center">
      <div>
        <p className="text-sm font-semibold text-navy-900">{flight.airline} · {flight.flightNumber}</p>
        <p className="text-xs text-slate-500">{flight.origin} → {flight.destination} · {flight.duration}</p>
        <p className="mt-1 text-xs text-slate-400">
          {new Date(flight.departureTime).toLocaleString()} → {new Date(flight.arrivalTime).toLocaleString()}
        </p>
        <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle}`}>
          {flight.status}
        </span>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-navy-900">${total}</p>
        {passengers > 1 && <p className="text-xs text-slate-400">${economy.price} × {passengers} passengers</p>}
        <p className="text-xs text-slate-400">{economy.seatsAvailable} seats left</p>
        <button
          onClick={() => onSelect(flight)}
          disabled={flight.status === 'Cancelled'}
          className="mt-2 rounded-full bg-gold-400 px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-gold-500 disabled:opacity-40"
        >
          Select
        </button>
      </div>
    </div>
  )
}