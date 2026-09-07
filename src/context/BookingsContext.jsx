import { createContext, useContext, useEffect, useState } from 'react'
import { bookings as initialBookings } from '../data/mockData.js'

const BookingsContext = createContext(null)
const STORAGE_KEY = 'arthur-airways-bookings'

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialBookings
    } catch {
      return initialBookings
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  }, [bookings])

  function addBooking(booking) {
    setBookings((prev) => [...prev, booking])
  }

  function rescheduleBooking(bookingId, newFlightId) {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, rescheduledFrom: b.flightId, flightId: newFlightId, status: 'Rescheduled' }
          : b
      )
    )
  }

  function cancelBooking(bookingId) {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    )
  }

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, rescheduleBooking, cancelBooking }}>
      {children}
    </BookingsContext.Provider>
  )
}

export function useBookings() {
  const ctx = useContext(BookingsContext)
  if (!ctx) throw new Error('useBookings must be used within a BookingsProvider')
  return ctx
}