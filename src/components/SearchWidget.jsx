import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { airports, siteConfig } from '../data/mockData';

export default function SearchWidget() {
    const navigate = useNavigate()
    const [tripType, setTripType] = useState(siteConfig.tripTypes[0])
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [depart, setDepart] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [passengers, setPassengers] = useState(1)
    const [cabinClass, setCabinClass] = useState('Economy')

    function handleSearch(e) {
        e.preventDefault()
        const params = new URLSearchParams({ from, to, depart, returnDate, passengers, cabinClass, tripType })
        navigate(`/search?${params.toString()}`)
    }

    return (
        <form onSubmit={handleSearch} className="relative z-10 mx-auto -mt-16 w-[92%] max-w-4xl rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-1 hover:ring-gold-400/40 md:p-8 md:max-w-6xl">
            <div className="mb-4 flex gap-6 text-sm font-medium text-slate-500">
                {siteConfig.tripTypes.map((type) => (
                    <button type="button" key={type} onClick={() => setTripType(type)} className={`border-b-2 pb-1 ${tripType === type ? 'border-gold-500 text-navy-900' : 'border-transparent'}`}>
                        {type}
                    </button>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-5">
                <label className="text-xs font-semibold text-slate-500">
                    From
                    <select value={from} onChange={(e) => setFrom(e.target.value)} required className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                        <option value="">Departure City</option>
                        {airports.map((a) => (
                            <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
                        ))}
                    </select>
                </label>

                <label className="text-xs font-semibold text-slate-500">
                    To 
                    <select value={to} onChange={(e) => setTo(e.target.value)} required className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                        <option value="">Arrival City</option>
                        {airports.map((a) => (
                            <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
                        ))}
                    </select>
                </label>

                <label className="text-xs font-semibold text-slate-500">
                    Depart
                    <input type="date" value={depart} onChange={(e) => setDepart(e.target.value)} required className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                </label>

                {tripType === 'Round Trip' && (
                    <label className="text-xs font-semibold text-slate-500">
                        Return
                        <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                    </label>
                )}

                <label className="text-xs font-semibold text-slate-500">
                    Passengers &amp; Class
                    <div className="mt-1 flex gap-2">
                        <input type="number" min="1" value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-16 rounded-lg border border-slate-300 px-2 py-2 text-sm" />
                        <select value={cabinClass} onChange={(e) => setCabinClass(e.target.value)} className="flex-1 rounded-lg border border-slate-300 px-2 py-2 text-sm">
                            <option>Economy</option>
                            <option>Premium Economy</option>
                            <option>Business</option>
                            <option>First Class</option>
                        </select>
                    </div>
                </label>
            </div>

            <button type="submit" className="mt-6 w-full rounded-lg bg-navy-900 py-3 text-sm font-semibold text-white hover:bg-navy-800 md:w-auto md:px-8">
                Search Flights →
            </button>
        </form>
    )
}