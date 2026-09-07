import { useMemo } from 'react'

function generateSeats(flightId) {
  const rows = 6
  const cols = ['A', 'B', 'C', 'D', 'E', 'F']
  function isOccupied(label) {
    let hash = 0
    const str = flightId + label
    for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0
    return hash % 4 === 0
  }
  const rowsData = []
  for (let r = 1; r <= rows; r++) {
    rowsData.push(cols.map((c) => ({ label: `${r}${c}`, occupied: isOccupied(`${r}${c}`) })))
  }
  return rowsData
}

function SeatButton({ seat, selected, onSelect }) {
  if (seat.occupied) {
    return <div className="h-8 w-8 rounded bg-slate-300" title={`${seat.label} — taken`} />
  }
  return (
    <button
      type="button"
      onClick={() => onSelect(seat.label)}
      className={`h-8 w-8 rounded border text-[10px] font-semibold ${
        selected ? 'border-gold-500 bg-gold-400 text-navy-900' : 'border-slate-300 bg-white text-slate-500 hover:border-navy-900'
      }`}
    >
      {seat.label}
    </button>
  )
}

export default function SeatSelection({ flightId, selectedSeat, onSelect, onBack, onContinue }) {
  const rows = useMemo(() => generateSeats(flightId), [flightId])

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-navy-900">Choose Your Seat</h1>
      <p className="mb-6 text-sm text-slate-500">Economy cabin — select an available seat.</p>

      <div className="rounded-2xl border border-slate-200 p-6">
        <div className="mb-6 flex justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1"><span className="inline-block h-4 w-4 rounded border border-slate-300 bg-white" /> Available</span>
          <span className="flex items-center gap-1"><span className="inline-block h-4 w-4 rounded bg-gold-400" /> Selected</span>
          <span className="flex items-center gap-1"><span className="inline-block h-4 w-4 rounded bg-slate-300" /> Taken</span>
        </div>

        <div className="mx-auto max-w-xs space-y-2">
          {rows.map((row, i) => (
            <div key={i} className="flex items-center justify-center gap-2">
              <span className="w-4 text-xs text-slate-400">{i + 1}</span>
              {row.slice(0, 3).map((seat) => (
                <SeatButton key={seat.label} seat={seat} selected={selectedSeat === seat.label} onSelect={onSelect} />
              ))}
              <span className="w-4" />
              {row.slice(3).map((seat) => (
                <SeatButton key={seat.label} seat={seat} selected={selectedSeat === seat.label} onSelect={onSelect} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Back</button>
        <button
          onClick={onContinue}
          disabled={!selectedSeat}
          className="rounded-full bg-gold-400 px-6 py-2 text-sm font-semibold text-navy-900 hover:bg-gold-500 disabled:opacity-40"
        >
          Continue to Add-ons →
        </button>
      </div>
    </div>
  )
}