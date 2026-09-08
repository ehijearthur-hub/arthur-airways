import { useState } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../data/mockData.js'

const linkPaths = {
  Home: '/',
  Explore: '/#popular-destinations',
  Flights: '/search',
  'My Trips': '/my-trips',
  'About The Creator': '/about',
  Help: '/#footer',
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white px-6 py-4 md:px-12">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-lg font-bold tracking-tight text-navy-900" onClick={() => setOpen(false)}>
          {siteConfig.airlineName}
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-slate-700 md:flex">
          {siteConfig.navLinks.map((link) => (
            <Link key={link} to={linkPaths[link] || '/'} className="hover:text-navy-900">
              {link}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button className="text-sm font-medium text-slate-700 hover:text-navy-900">Sign In</button>
          <Link to="/search" className="rounded-full bg-gold-400 px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-gold-500">
            Book a Flight
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 bg-navy-900 transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-navy-900 transition ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-navy-900 transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="mt-4 flex flex-col gap-4 border-t border-slate-200 pt-4 md:hidden">
          {siteConfig.navLinks.map((link) => (
            <Link key={link} to={linkPaths[link] || '/'} onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700 hover:text-navy-900">
              {link}
            </Link>
          ))}
          <button className="text-left text-sm font-medium text-slate-700 hover:text-navy-900">Sign In</button>
          <Link to="/search" onClick={() => setOpen(false)} className="rounded-full bg-gold-400 px-5 py-2 text-center text-sm font-semibold text-navy-900 hover:bg-gold-500">
            Book a Flight
          </Link>
        </div>
      )}
    </header>
  )
}