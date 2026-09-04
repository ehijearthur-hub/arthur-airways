import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComposableMap, Geographies, Geography, Graticule, Sphere, Line, Marker } from 'react-simple-maps'
import { destinations, airports } from '../data/mockData.js'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const hub = airports.find((a) => a.code === 'LHR')

export default function WorldMap() {
  const [hovered, setHovered] = useState(null)
  const navigate = useNavigate()

  return (
    <section className="bg-navy-950 px-6 py-16 md:px-12">
      <h2 className="mb-2 text-center text-2xl font-bold text-white">Where We Fly</h2>
      <p className="mb-8 text-center text-sm text-slate-400">Hover a pin to preview, click to search flights there.</p>

      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10">
        <ComposableMap projectionConfig={{ scale: 140 }} style={{ width: '100%', height: 'auto' }}>
          <Sphere id="rsm-sphere" stroke="rgba(255,255,255,0.15)" strokeWidth={0.5} fill="transparent" />
          <Graticule stroke="rgba(255,255,255,0.08)" strokeWidth={0.3} />

          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#2d4a73"
                  stroke="#0b1220"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: '#3a5c8f' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {hub &&
            destinations.map((d) => (
              <Line
                key={`route-${d.id}`}
                from={[hub.coordinates.lng, hub.coordinates.lat]}
                to={[d.coordinates.lng, d.coordinates.lat]}
                stroke="#f5c542"
                strokeWidth={hovered?.id === d.id ? 1.5 : 0.6}
                strokeLinecap="round"
                strokeOpacity={hovered?.id === d.id ? 0.9 : 0.4}
              />
            ))}

          {destinations.map((d) => (
            <Marker
              key={d.id}
              coordinates={[d.coordinates.lng, d.coordinates.lat]}
              onMouseEnter={() => setHovered(d)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(`/search?to=${d.airportCode}`)}
            >
              <circle
                r={9}
                fill="#f5c542"
                opacity={0.25}
                className="animate-ping"
                style={{ transformBox: 'fill-box', transformOrigin: 'center', cursor: 'pointer' }}
              />
              <circle r={4.5} fill="#f5c542" stroke="#0f172a" strokeWidth={1.5} style={{ cursor: 'pointer' }} />
            </Marker>
          ))}
        </ComposableMap>

        {hovered && (
          <div className="pointer-events-none absolute left-4 top-4 rounded-xl bg-white px-4 py-2 text-sm text-navy-900 shadow-lg">
            <p className="font-semibold">{hovered.city}, {hovered.country}</p>
            <p className="text-gold-500 font-medium">From ${hovered.startingPrice}</p>
          </div>
        )}
      </div>
    </section>
  )
}