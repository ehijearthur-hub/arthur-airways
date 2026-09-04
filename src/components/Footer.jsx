import { siteConfig } from '../data/mockData.js'

export default function Footer() {
  return (
    <footer className="bg-navy-900 px-6 py-12 text-slate-300 md:px-12">
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
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gold-400">Discover</h4>
          <ul className="space-y-1 text-sm">
            <li>Destinations</li>
            <li>Travel Info</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gold-400">Support</h4>
          <ul className="space-y-1 text-sm">
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <p className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
        © 2026 {siteConfig.airlineName}. All rights reserved.
      </p>
    </footer>
  )
}