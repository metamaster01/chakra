export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createServer } from '@/lib/supabase-server'

type Props = { params: Promise<{ id: string }> }

export default async function CheckoutPage({ params }: Props) {
  const { id } = await params
  const orderId = Number(id)   // ensure numeric for equality
  const supabase = await createServer()

  // Must be logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/checkout/${id}`)}`)
  }

  // Owner-scoped read (RLS enforces this too)
  const { data: order, error: oErr } = await supabase
    .from('orders')
    .select('id,user_id,total_paise,payment_status,shipping_method,contact_email,contact_phone,address')
    .eq('id', orderId)
    .single()

  if (oErr) {
    console.error('checkout order error:', oErr)
  }
  if (!order) {
    return <div className="mx-auto max-w-4xl p-8 text-purple-900">Order not found.</div>
  }

  // Optional extra guard (not needed if RLS correct):
  if (order.user_id !== user.id) {
    return <div className="mx-auto max-w-4xl p-8 text-purple-900">Order not found.</div>
  }

  const { data: items, error: iErr } = await supabase
    .from('order_items')
    .select('id,product_id,variant_id,quantity,unit_price_paise,name_snapshot,color_snapshot,size_snapshot,image_snapshot')
    .eq('order_id', orderId)

  if (iErr) console.error('checkout items error:', iErr)

  const CheckoutClient = (await import('@/components/ui/CheckoutClient')).default
  return <CheckoutClient order={order} items={items || []} />
}
