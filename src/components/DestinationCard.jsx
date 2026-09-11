import { Link } from 'react-router-dom';

export default function DestinationCard({ destination }) {
    return (
        <div className="overflow-hidden rounded-2xl shadow-lg">
            <img src={destination.image} alt={destination.imageAlt} className="h-56 w-full object-cover" />
            <div className="bg-navy-900 p-4 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold">{destination.city}</p>
                        <p className="text-xs text-slate-300">{destination.country}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-300">From</p>
                        <p className="font-semibold text-gold-400">${destination.startingPrice}</p>
                    </div>
                </div>   
                <Link to={`/search?to=${destination.airportCode}`} className="mt-3 block rounded-full border border-white/40 py-2 text-center text-xs font-semibold hover:bg-white/10">
                 Explore
                </Link>  
            </div>
        </div>
    )
}