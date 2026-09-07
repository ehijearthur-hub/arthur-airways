export default function AddOns({ addOns, selected, onToggle, onBack, onContinue }) {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-navy-900">Add-ons</h1>
      <p className="mb-6 text-sm text-slate-500">Optional extras — add anything you'd like, or skip straight to payment.</p>

      <div className="space-y-3">
        {addOns.map((addon) => {
          const checked = selected.includes(addon.id)
          return (
            <label
              key={addon.id}
              className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 ${
                checked ? 'border-gold-500 bg-gold-50' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(addon.id)}
                  className="h-4 w-4 accent-gold-500"
                />
                <div>
                  <p className="text-sm font-semibold text-navy-900">{addon.name}</p>
                  <p className="text-xs text-slate-400">{addon.description}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-navy-900">${addon.price.toFixed(2)}</p>
            </label>
          )
        })}
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Back</button>
        <button onClick={onContinue} className="rounded-full bg-gold-400 px-6 py-2 text-sm font-semibold text-navy-900 hover:bg-gold-500">Continue to Payment →</button>
      </div>
    </div>
  )
}