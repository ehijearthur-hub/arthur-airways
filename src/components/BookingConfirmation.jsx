import { useNavigate } from 'react-router-dom'

export default function BookingConfirmation({ flight, passenger, seat, total, bookingReference, passengers = 1 }) {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-lg py-12 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">✓</div>
      <h1 className="mb-2 text-2xl font-bold text-navy-900">Booking Confirmed!</h1>
      <p className="mb-8 text-sm text-slate-500">A confirmation email has been sent to {passenger.email || 'your email'}.</p>

      <div className="mb-8 rounded-2xl border border-slate-200 p-6 text-left">
        <div className="mb-4 flex justify-between text-sm"><span className="text-slate-400">Booking Reference</span><span className="font-semibold text-navy-900">{bookingReference}</span></div>
        <div className="mb-4 flex justify-between text-sm"><span className="text-slate-400">Passenger</span><span className="font-semibold text-navy-900">{passenger.firstName} {passenger.lastName}</span></div>
        <div className="mb-4 flex justify-between text-sm"><span className="text-slate-400">Flight</span><span className="font-semibold text-navy-900">{flight.flightNumber} · {flight.origin} → {flight.destination}</span></div>
        <div className="mb-4 flex justify-between text-sm"><span className="text-slate-400">Passengers</span><span className="font-semibold text-navy-900">{passengers}</span></div>
        <div className="mb-4 flex justify-between text-sm"><span className="text-slate-400">Seat</span><span className="font-semibold text-navy-900">{seat}</span></div>
        <div className="flex justify-between border-t border-slate-100 pt-4 text-sm"><span className="font-bold text-navy-900">Total Paid</span><span className="font-bold text-navy-900">${total}</span></div>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={() => navigate('/')} className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Back to Home</button>
        <button onClick={() => navigate('/my-trips')} className="rounded-full bg-gold-400 px-6 py-2 text-sm font-semibold text-navy-900 hover:bg-gold-500">View My Trips</button>
      </div>
    </div>
  )
}