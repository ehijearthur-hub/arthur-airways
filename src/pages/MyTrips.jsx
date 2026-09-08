import { flights, users } from '../data/mockData.js'
import { useBookings } from '../context/BookingsContext.jsx'

export default function MyTrips() {
  const { bookings, rescheduleBooking, cancelBooking } = useBookings()
  const currentUser = users[0] // no auth yet — stands in for "the logged-in user"
  const myBookings = bookings
    .filter((b) => b.userId === currentUser.id)
    .slice()
    .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))

  function alternateFlights(flight) {
    return flights.filter(
      (f) => f.origin === flight.origin && f.destination === flight.destination && f.status !== 'Cancelled' && f.id !== flight.id
    )
  }

  const statusStyle = {
    Cancelled: 'bg-red-100 text-red-700',
    Rescheduled: 'bg-amber-100 text-amber-700',
    Completed: 'bg-slate-100 text-slate-600',
    Confirmed: 'bg-emerald-100 text-emerald-700',
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:px-12">
      <h1 className="mb-6 text-2xl font-bold text-navy-900">My Trips</h1>
      <div className="space-y-4">
        {myBookings.length === 0 && (
          <p className="text-sm text-slate-500">No bookings yet — search for a flight to get started.</p>
        )}
        {myBookings.map((booking) => {
          const flight = flights.find((f) => f.id === booking.flightId)
          if (!flight) return null
          const options = alternateFlights(flight)
          return (
            <div key={booking.id} className="rounded-xl border border-slate-200 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-navy-900">{flight.airline} · {flight.flightNumber}</p>
                  <p className="text-sm text-slate-500">{flight.origin} → {flight.destination}</p>
                  <p className="text-xs text-slate-400">{new Date(flight.departureTime).toLocaleString()}</p>
                  <p className="text-xs text-slate-400">Ref: {booking.bookingReference}</p>
                  {booking.totalPrice != null && (
                    <p className="mt-1 text-xs font-bold">Total paid: ${Number(booking.totalPrice).toFixed(2)}</p>
                  )}
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[booking.status] || ''}`}>
                  {booking.status}
                </span>
              </div>

              {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {options.length > 0 && (
                    <select
                      onChange={(e) => e.target.value && rescheduleBooking(booking.id, e.target.value)}
                      defaultValue=""
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    >
                      <option value="">Reschedule to…</option>
                      {options.map((f) => (
                        <option key={f.id} value={f.id}>{f.flightNumber} — {new Date(f.departureTime).toLocaleDateString()}</option>
                      ))}
                    </select>
                  )}
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}