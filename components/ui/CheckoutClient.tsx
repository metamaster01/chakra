'use client'
import { useMemo, useState } from 'react'
import { inr } from '@/lib/money'
import { createClient } from '@/lib/supabase-browser'
import { saveCheckout , markPaid } from '@/app/checkout/[id]/actions'

type Order = {
  id: number; total_paise: number; payment_status: string;
  contact_email?: string|null; contact_phone?: string|null;
  shipping_method?: string|null; address?: any;
}
type Item = {
  id: number; quantity: number; unit_price_paise: number;
  name_snapshot: string; color_snapshot: string|null; size_snapshot: string|null; image_snapshot: string|null;
}

export default function CheckoutClient({ order, items }: { order: Order; items: Item[] }) {
  const supabase = createClient()
  const [contact, setContact] = useState({
    email: order.contact_email || '',
    phone: order.contact_phone || ''
  })
  const [addr, setAddr] = useState(() => ({
    first_name: order.address?.first_name || '',
    last_name: order.address?.last_name || '',
    line1: order.address?.line1 || '',
    line2: order.address?.line2 || '',
    city: order.address?.city || '',
    state: order.address?.state || '',
    pincode: order.address?.pincode || '',
    country: order.address?.country || 'India'
  }))
  const [ship, setShip] = useState(order.shipping_method || 'standard')
  const [method, setMethod] = useState<'razorpay'|'cod'>('razorpay')
  const [saving, setSaving] = useState(false)
  const [thanks, setThanks] = useState(false)

  const shipFee = useMemo(() => ship==='standard'? 0 : ship==='fast'? 9900 : 14900, [ship]) // in paisa
  const subtotal = useMemo(() => items.reduce((s,i)=>s+i.unit_price_paise*i.quantity,0), [items])
  const grand = subtotal + shipFee

async function saveDraft() {
  setSaving(true)
  const res = await saveCheckout({
    orderId: order.id,
    contact,
    address: addr,
    shipping: ship as any,
    paymentMethod: method,
    grandTotalPaise: grand,
  })
  setSaving(false)
  if (!res.ok) alert(res.error)
}

async function pay() {
  // 1) always persist the form first (server-side)
  const saved = await saveCheckout({
    orderId: order.id,
    contact,
    address: addr,
    shipping: ship as any,
    paymentMethod: method,
    grandTotalPaise: grand,
  })
  if (!saved.ok) { alert(saved.error); return }

  if (method === 'cod') {
    const ok = await markPaid({ orderId: order.id, notes: 'COD' })
    if (!ok.ok) { alert(ok.error); return }
    setThanks(true); return
  }

  // 2) Razorpay
  const res = await fetch('/api/razorpay/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount_paise: grand, order_id: order.id })
  }).then(r => r.json())

  if (!res?.razorpay_order_id || !res?.key) { alert('Payment init failed'); return }

  const options = {
    key: res.key,
    amount: grand,
    currency: 'INR',
    name: 'Chakra Healing',
    order_id: res.razorpay_order_id,
    prefill: { email: contact.email, contact: contact.phone, name: `${addr.first_name} ${addr.last_name}` },
    theme: { color: '#3b0764' },
    handler: async (resp: any) => {
      const verify = await fetch('/api/razorpay/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...resp, order_id: order.id })
      }).then(r => r.json())

      if (verify?.ok) {
        const ok = await markPaid({
          orderId: order.id,
          razorpay_order_id: resp.razorpay_order_id,
          razorpay_payment_id: resp.razorpay_payment_id
        })
        if (!ok.ok) { alert(ok.error); return }
        setThanks(true)
      } else {
        alert('Payment verification failed')
      }
    }
  }

  // @ts-ignore
  const rzp = new (window as any).Razorpay(options)
  rzp.open()
}

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-8">
      {/* Thank you dialog */}
      {thanks && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center">
            <div className="text-2xl font-semibold text-purple-900">Thank you! 🎉</div>
            <p className="mt-2 text-purple-900/70">Your order has been placed successfully.</p>
            <div className="mt-5 flex gap-3 justify-center">
              <a href="/" className="px-4 py-2 rounded-full bg-amber-200 text-purple-900">Go to Home</a>
              <a href="/account" className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-900 to-purple-700 text-white">Track Order</a>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_420px] gap-8">
        {/* Left: forms */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-purple-900/10 bg-white p-5">
            <h2 className="font-semibold text-purple-900">Contact</h2>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <input className="rounded-xl border border-purple-900/20 px-3 py-2" placeholder="Email"
                value={contact.email} onChange={e=>setContact(s=>({...s,email:e.target.value}))}/>
              <input className="rounded-xl border border-purple-900/20 px-3 py-2" placeholder="Phone"
                value={contact.phone} onChange={e=>setContact(s=>({...s,phone:e.target.value}))}/>
            </div>
          </section>

          <section className="rounded-2xl border border-purple-900/10 bg-white p-5">
            <h2 className="font-semibold text-purple-900">Delivery</h2>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <input className="rounded-xl border border-purple-900/20 px-3 py-2" placeholder="First name"
                value={addr.first_name} onChange={e=>setAddr(a=>({...a,first_name:e.target.value}))}/>
              <input className="rounded-xl border border-purple-900/20 px-3 py-2" placeholder="Last name"
                value={addr.last_name} onChange={e=>setAddr(a=>({...a,last_name:e.target.value}))}/>
              <input className="rounded-xl border border-purple-900/20 px-3 py-2 sm:col-span-2" placeholder="Address"
                value={addr.line1} onChange={e=>setAddr(a=>({...a,line1:e.target.value}))}/>
              <input className="rounded-xl border border-purple-900/20 px-3 py-2 sm:col-span-2" placeholder="Apartment, suite, etc."
                value={addr.line2} onChange={e=>setAddr(a=>({...a,line2:e.target.value}))}/>
              <input className="rounded-xl border border-purple-900/20 px-3 py-2" placeholder="City"
                value={addr.city} onChange={e=>setAddr(a=>({...a,city:e.target.value}))}/>
              <input className="rounded-xl border border-purple-900/20 px-3 py-2" placeholder="State"
                value={addr.state} onChange={e=>setAddr(a=>({...a,state:e.target.value}))}/>
              <input className="rounded-xl border border-purple-900/20 px-3 py-2" placeholder="PIN code"
                value={addr.pincode} onChange={e=>setAddr(a=>({...a,pincode:e.target.value}))}/>
              <input className="rounded-xl border border-purple-900/20 px-3 py-2" placeholder="Country"
                value={addr.country} onChange={e=>setAddr(a=>({...a,country:e.target.value}))}/>
            </div>
          </section>

          <section className="rounded-2xl border border-purple-900/10 bg-white p-5">
            <h2 className="font-semibold text-purple-900">Shipping method</h2>
            <div className="mt-3 grid gap-2">
              {[
                { id:'standard', label:'Standard (5–6 days)', fee:0 },
                { id:'fast',     label:'Fast (2–3 days)',    fee:9900 },
                { id:'premium',  label:'Premium (Next day)', fee:14900 },
              ].map(opt => (
                <label key={opt.id} className={`rounded-xl border px-3 py-2 cursor-pointer ${ship===opt.id?'border-amber-300 bg-amber-100':'border-purple-900/20'}`}>
                  <input type="radio" name="ship" className="mr-2" checked={ship===opt.id} onChange={()=>setShip(opt.id as any)} />
                  {opt.label} <span className="float-right text-purple-900/70">{opt.fee ? inr(opt.fee): 'Free'}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-purple-900/10 bg-white p-5">
            <h2 className="font-semibold text-purple-900">Payment</h2>
            <div className="mt-3 grid gap-2">
              <label className={`rounded-xl border px-3 py-2 cursor-pointer ${method==='razorpay'?'border-amber-300 bg-amber-100':'border-purple-900/20'}`}>
                <input type="radio" name="pay" className="mr-2" checked={method==='razorpay'} onChange={()=>setMethod('razorpay')} />
                Razorpay (UPI / Cards / Wallets)
              </label>
              <label className={`rounded-xl border px-3 py-2 cursor-pointer ${method==='cod'?'border-amber-300 bg-amber-100':'border-purple-900/20'}`}>
                <input type="radio" name="pay" className="mr-2" checked={method==='cod'} onChange={()=>setMethod('cod')} />
                Cash on Delivery (COD)
              </label>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={pay}
                disabled={saving}
                className="rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-900 to-purple-700 hover:opacity-95"
              >
                Pay now
              </button>
              <button onClick={saveDraft} className="rounded-full px-6 py-3 text-sm font-medium bg-amber-200 text-purple-900">
                Save
              </button>
            </div>
          </section>
        </div>

        {/* Right rail: order summary */}
        <aside className="rounded-2xl border border-purple-900/10 bg-white p-5 h-fit">
          <div className="space-y-4">
            {items.map(i => (
              <div key={i.id} className="flex gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.image_snapshot||'/placeholder.png'} className="w-14 h-14 rounded-xl object-cover" alt="" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-purple-900 line-clamp-1">{i.name_snapshot}</div>
                  <div className="text-xs text-purple-900/60">
                    {i.size_snapshot && <>Size: {i.size_snapshot} · </>}
                    {i.color_snapshot && <>Color: {i.color_snapshot} · </>}
                    Qty: {i.quantity}
                  </div>
                </div>
                <div className="text-sm text-purple-900">{inr(i.unit_price_paise * i.quantity)}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-purple-900/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-purple-900/70">Subtotal</span><span>{inr(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-purple-900/70">Shipping</span><span>{shipFee ? inr(shipFee) : 'Enter shipping address'}</span></div>
            <div className="flex justify-between font-semibold text-purple-900 border-t border-purple-900/10 pt-2">
              <span>Total</span><span>{inr(grand)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
