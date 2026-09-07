import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToHash from './components/ScrollToHash.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import SearchResults from './pages/SearchResults.jsx'
import Booking from './pages/Bookings.jsx'
import MyTrips from './pages/MyTrips.jsx'

function SiteLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/my-trips" element={<MyTrips />} />
        </Route>
        <Route path="/booking/:flightId" element={<Booking />} />
      </Routes>
    </>
  )
}