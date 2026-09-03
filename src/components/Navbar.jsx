import { Link } from 'react-router-dom';
import { siteConfig } from '../data/mockData';

const linkPaths = {
    Home: '/',
    Explore: '/search',
    Flights: '/search',
    'My Trips': '/my-trips',
    'Flight Status': '/search',
    Help: '/'
}

export default function Navbar() {
    return (
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 md:px-12">
            <Link to="/" className="text-lg font-bold tracking-tight text-navy-900  animate-bounce">
             {siteConfig.airlineName}
            </Link>
            <nav className="hidden gap-8 text-sm font-medium text-slate-700 md:flex">
                {siteConfig.navLinks.map((link) => (
                    <Link key={link} to={linkPaths[link] || '/'} className="hover:text-navy-900">
                        {link}
                    </Link>
                ))}
            </nav>
            <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-slate-700 hover:text-navy-900">Sign In</button>
                <Link to="/search" className="rounded-full bg-gold-400 px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-gold-500">
                 Book a Flight
                </Link>
            </div>
        </header>
    )
}