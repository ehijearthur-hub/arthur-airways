const steps = ['Select', 'Passenger', 'Seat', 'Add-ons', 'Payment']

export default function BookStepper({ current }) {
    const currentIndex = steps.indexOf(current)

    return (
        <div className="mb-10 flex items-center justify-center gap-0 md:gap-2">
            {steps.map((label, i) => {
                const done = i === 0 || i < currentIndex
                const active = i === currentIndex
                return (
                    <div key={label} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                                done ? 'bg-navy-900 text-white' : active ? 'border-2 border-navy-900 text-navy-900' : 'border border-slate-300 text-slate-300'
                            }`}>
                                {done ? '✓' : i + 1}
                            </div>
                            <span className={`mt-1 text-xs ${active ? 'font-semibold text-navy-900' : 'text-slate-400'}`}>{label}</span>
                        </div>
                        {i < steps.length - 1 && <div className="mx-2 h-px w-10 bg-slate-200" />}
                    </div>
                )
            })}
        </div>
    )
}