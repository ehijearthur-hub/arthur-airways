import { usePaystackPayment } from 'react-paystack'

const PAYSTACK_CURRENCY = 'NGN' 

export default function PaymentForm({ total, email, onBack, onPay }) {
  const config = {
    reference: `arthur-${Date.now()}`,
    email: email || 'guest@example.com',
    amount: Math.round(Number(total) * 100), // Paystack expects the smallest currency unit (kobo)
    currency: PAYSTACK_CURRENCY,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    metadata: {
      custom_fields: [{ display_name: 'Booking Total', variable_name: 'booking_total', value: `$${total}` }],
    },
  }

  const initializePayment = usePaystackPayment(config)

  function handleSuccess(response) {
    onPay(response.reference)
  }

  function handleClose() {
    // Popup closed with no payment — booking is intentionally not created
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 p-6">
        <h2 className="mb-2 text-sm font-bold text-navy-900">Payment</h2>
        <p className="mb-6 text-sm text-slate-500">
          You'll be securely redirected to Paystack to complete this payment — no card details are collected on this page.
        </p>

        <div className="mb-6 flex items-center justify-between rounded-xl bg-slate-50 p-4">
          <span className="text-sm font-medium text-slate-600">Total due</span>
          <span className="text-xl font-bold text-navy-900">${total}</span>
        </div>

        <button
          type="button"
          onClick={() => initializePayment(handleSuccess, handleClose)}
          className="w-full rounded-full bg-gold-400 py-3 text-sm font-semibold text-navy-900 hover:bg-gold-500"
        >
          Pay ${total} with Paystack
        </button>

        <p className="mt-4 text-xs text-slate-400">
          Test mode — use card <span className="font-mono">4084 0840 8408 4081</span>, any future expiry, any CVV. No real charge occurs.
        </p>
      </div>

      <button type="button" onClick={onBack} className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
        Back
      </button>
    </div>
  )
}