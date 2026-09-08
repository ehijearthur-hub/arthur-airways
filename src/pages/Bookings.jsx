import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { flights, addOns as allAddOns, users } from '../data/mockData.js'
import { useBookings } from '../context/BookingsContext.jsx'
import BookingStepper from '../components/BookingStepper.jsx'
import BookingSummary from '../components/BookingSummary.jsx'
import PassengerForm from '../components/PassengerForm.jsx'
import SeatSelection from '../components/SeatSelection.jsx'
import AddOns from '../components/AddOns.jsx'
import PaymentForm from '../components/PaymentForm.jsx'
import BookingConfirmation from '../components/BookingConfirmation.jsx'


function generateBookingReference() {
  return `TRV${Math.floor(10000 + Math.random() * 90000)}`
}

export default function Booking() {
  const { flightId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addBooking } = useBookings()
  const flight = flights.find((f) => f.id === flightId)
  const passengers = parseInt(searchParams.get('passengers'), 10) || 1

  const [step, setStep] = useState('Passenger')
  useEffect(() => { window.scrollTo(0, 0) }, [step])
  const [passenger, setPassenger] = useState({
    firstName: '', lastName: '', dob: '', gender: '', nationality: '', passportNumber: '',
    email: '', countryCode: '+1', phone: '',
  })
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [selectedAddOnIds, setSelectedAddOnIds] = useState([])
  const [bookingReference, setBookingReference] = useState(null)

  if (!flight) return <p className="p-12 text-center text-slate-500">Flight not found.</p>

  function toggleAddOn(id) {
    setSelectedAddOnIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const selectedAddOns = allAddOns.filter((a) => selectedAddOnIds.includes(a.id))
  const fare = flight.cabinClasses.find((c) => c.type === 'Economy') || flight.cabinClasses[0]
  const fareTotal = fare.price * passengers
  const taxesAndFees = Math.round(fareTotal * 0.12 * 100) / 100
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0)
  const total = (fareTotal + taxesAndFees + addOnsTotal).toFixed(2)

  function handlePay() {
    const currentUser = users[0] // no auth yet — stands in for "the logged-in user"
    const ref = generateBookingReference()
    addBooking({
      id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      bookingReference: ref,
      userId: currentUser.id,
      flightId: flight.id,
      cabinClass: 'Economy',
      passengers: [{ name: `${passenger.firstName} ${passenger.lastName}`.trim() || 'Guest', seat: selectedSeat || 'TBD' }],
      passengerCount: passengers,
      status: 'Confirmed',
      bookingDate: new Date().toISOString().slice(0, 10),
      totalPrice: Number(total),
      currency: flight.currency,
      addOns: selectedAddOnIds,
      rescheduledFrom: null,
    })
    setBookingReference(ref)
    setStep('Confirmation')
  }

  if (step === 'Confirmation') {
    return (
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-12">
        <BookingConfirmation flight={flight} passenger={passenger} seat={selectedSeat} total={total} bookingReference={bookingReference} passengers={passengers} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-12">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="text-lg font-bold text-navy-900">Arthur Airways</button>
        <button onClick={() => navigate('/')} className="text-sm font-medium text-slate-500 hover:text-navy-900">Save &amp; Exit</button>
      </div>

      <BookingStepper current={step} />

      <div className="grid gap-8 md:grid-cols-[1fr_320px]">
        <div>
          {step === 'Passenger' && (
            <>
              <h1 className="mb-1 text-2xl font-bold text-navy-900">Passenger Information</h1>
              <p className="mb-6 text-sm text-slate-500">Please ensure all details match exactly as they appear on your government-issued ID.</p>
              <PassengerForm data={passenger} onChange={setPassenger} onContinue={() => setStep('Seat')} passengers={passengers} />
            </>
          )}
          {step === 'Seat' && (
            <SeatSelection flightId={flight.id} selectedSeat={selectedSeat} onSelect={setSelectedSeat} onBack={() => setStep('Passenger')} onContinue={() => setStep('Add-ons')} />
          )}
          {step === 'Add-ons' && (
            <AddOns addOns={allAddOns} selected={selectedAddOnIds} onToggle={toggleAddOn} onBack={() => setStep('Seat')} onContinue={() => setStep('Payment')} />
          )}
          {step === 'Payment' && (
            <>
              <h1 className="mb-1 text-2xl font-bold text-navy-900">Payment</h1>
              <p className="mb-6 text-sm text-slate-500">Enter your payment details to confirm this booking.</p>
              <PaymentForm total={total} onBack={() => setStep('Add-ons')} onPay={handlePay} />
            </>
          )}
        </div>
        <BookingSummary flight={flight} addOns={selectedAddOns} passengers={passengers} />
      </div>
    </div>
  )
}