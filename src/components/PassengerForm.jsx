const countries = ['United States', 'United Kingdom', 'Nigeria', 'France', 'Japan', 'Indonesia', 'South Africa', 'Greece', 'Brazil', 'Australia', 'United Arab Emirates', 'Iceland']

export default function PassengerForm({ data, onChange, onContinue, onBack, passengers = 1 }) {
  function update(field, value) {
    onChange({ ...data, [field]: value })
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onContinue() }} className="space-y-6">
      <div className="rounded-2xl border border-slate-200 p-6">
        <h2 className="mb-1 text-sm font-bold text-navy-900">Passenger 1 of {passengers} (Adult)</h2>
        {passengers > 1 && (
          <p className="mb-4 text-xs text-slate-400">
            This demo only collects details for the primary passenger — the total already accounts for all {passengers} passengers.
          </p>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-semibold text-slate-500">
            First Name
            <input value={data.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="e.g. Tony" required className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="text-xs font-semibold text-slate-500">
            Middle Name &amp; Last Name
            <input value={data.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="e.g. Edward Stark" required className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="text-xs font-semibold text-slate-500">
            Date of Birth
            <input type="date" value={data.dob} onChange={(e) => update('dob', e.target.value)} required className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="text-xs font-semibold text-slate-500">
            Gender
            <select value={data.gender} onChange={(e) => update('gender', e.target.value)} required className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="">Select Gender</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-500">
            Nationality
            <select value={data.nationality} onChange={(e) => update('nationality', e.target.value)} required className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="">Select Country</option>
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-500">
            Passport Number
            <input value={data.passportNumber} onChange={(e) => update('passportNumber', e.target.value)} placeholder="Optional for now" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-6">
        <h2 className="mb-1 text-sm font-bold text-navy-900">Contact Information</h2>
        <p className="mb-4 text-xs text-slate-400">We'll use this to send your booking confirmation and flight updates.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs font-semibold text-slate-500">
            Email Address
            <input type="email" value={data.email} onChange={(e) => update('email', e.target.value)} placeholder="tonystark@example.com" required className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="text-xs font-semibold text-slate-500">
            Phone Number
            <div className="mt-1 flex gap-2">
              <select value={data.countryCode} onChange={(e) => update('countryCode', e.target.value)} className="rounded-lg border border-slate-300 px-2 py-2 text-sm">
                <option>+1</option><option>+44</option><option>+234</option><option>+971</option><option>+61</option>
              </select>
              <input value={data.phone} onChange={(e) => update('phone', e.target.value)} placeholder="555 123 4567" required className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Back</button>
        <button type="submit" className="rounded-full bg-gold-400 px-6 py-2 text-sm font-semibold text-navy-900 hover:bg-gold-500">Continue to Seats →</button>
      </div>
    </form>
  )
}