import { Link } from 'react-router-dom'
import { aboutCreator, siteConfig } from '../data/mockData.js'

export default function Footer() {
  return (
    <footer id="footer" className="bg-navy-900 px-6 py-12 text-slate-300 md:px-12">
      <div className="grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold text-white">{siteConfig.airlineName}</h3>
          <p className="mt-2 text-sm">
            Elevating your travel experience with modern luxury and heritage reliability.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gold-400">Company</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gold-400">Discover</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/#popular-destinations" className="hover:text-white">Destinations</Link></li>
            <li><a href="/search" className="hover:text-white">Travel Info</a></li>
            <li><a href="#" className="hover:text-white">Sitemap</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gold-400">Support</h4>
          <ul className="space-y-1 text-sm">
            <li><a href={`mailto:${aboutCreator.email}`} className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <p className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
        © 2026 {siteConfig.airlineName}. All rights reserved.
      </p>
    </footer>
  )
}