'use server'

import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function server() {
  const c = require('next/headers').cookies()
  return createServerClient(URL, ANON, {
    cookies: {
      get: (n: string) => c.get(n)?.value,
      set: (n: string, v: string, o: CookieOptions) => { try { c.set({ name:n, value:v, ...o }) } catch {} },
      remove: (n: string, o: CookieOptions) => { try { c.set({ name:n, value:'', ...o, maxAge:0 }) } catch {} },
    },
  })
}

export async function saveCheckout(input: {
  orderId: number
  contact: { email: string; phone: string }
  address: any
  shipping: 'standard'|'fast'|'premium'
  paymentMethod: 'razorpay'|'cod'
  grandTotalPaise: number
}) {
  try {
    const supabase = server()
    // owner RLS enforced by policy
    const { error } = await supabase.from('orders').update({
      contact_email: input.contact.email,
      contact_phone: input.contact.phone,
      address: input.address,
      shipping_method: input.shipping,
      payment_method: input.paymentMethod,
      total_paise: input.grandTotalPaise
    }).eq('id', input.orderId)
    if (error) throw error
    return { ok: true }
  } catch (e: any) {
    console.error('[saveCheckout] failed:', e?.message || e)
    return { ok: false, error: e?.message || 'Failed to save checkout' }
  }
}

export async function markPaid(input: {
  orderId: number
  razorpay_order_id?: string
  razorpay_payment_id?: string
  notes?: string
}) {
  try {
    const supabase = server()
    const { error } = await supabase.from('orders').update({
      status: 'paid',             // or 'confirmed' if that’s your enum
      payment_status: 'paid',
      razorpay_order_id: input.razorpay_order_id ?? null,
      razorpay_payment_id: input.razorpay_payment_id ?? null,
      notes: input.notes ?? null
    }).eq('id', input.orderId)
    if (error) throw error
    return { ok: true }
  } catch (e: any) {
    console.error('[markPaid] failed:', e?.message || e)
    return { ok: false, error: e?.message || 'Failed to mark paid' }
  }
}
