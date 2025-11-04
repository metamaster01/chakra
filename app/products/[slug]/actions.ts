'use server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function createDraftOrder(input: {
  productId: number; variantId: number | null; quantity: number;
}) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(URL, ANON, {
      cookies: {
        get: (n) => cookieStore.get(n)?.value,
        set: (n, v, o) => { cookieStore.set({ name:n, value:v, ...o }) },
        remove: (n, o) => { cookieStore.set({ name:n, value:'', ...o, maxAge:0 }) },
      },
    })

    // must be logged in
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { redirect: '/login?next=' + encodeURIComponent(`/products/${input.productId}`) }

    // fetch product
    const { data: product, error: pErr } = await supabase
      .from('products')
      .select('id,name,price_paise,primary_image_url')
      .eq('id', input.productId).single()
    if (pErr || !product) throw pErr || new Error('Product not found')

    let price = product.price_paise
    let color: string | null = null
    let size: string | null = null
    let sku: string | null = null
    let image: string | null = product.primary_image_url
    let stock: number | null = null

    if (input.variantId) {
      const { data: v, error: vErr } = await supabase
        .from('product_variants')
        .select('id,sku,color_label,size_label,price_paise,stock,image_url')
        .eq('id', input.variantId).single()
      if (vErr || !v) throw vErr || new Error('Variant not found')
      const availableStock = v.stock ?? 0
      if (input.quantity > availableStock) throw new Error('Quantity exceeds stock')
      stock = availableStock
      price = v.price_paise
      color = v.color_label
      size = v.size_label
      sku = v.sku
      image = v.image_url || image
    }

    const { data: order, error: oErr } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        status: 'draft',
        payment_status: 'unpaid',
        total_paise: price * input.quantity
      })
      .select('id')
      .single()
    if (oErr) throw oErr

    const { error: iErr } = await supabase.from('order_items').insert({
      order_id: order.id,
      product_id: product.id,
      variant_id: input.variantId,
      quantity: input.quantity,
      unit_price_paise: price,
      name_snapshot: product.name,
      color_snapshot: color,
      size_snapshot: size,
      image_snapshot: image
    })
    if (iErr) throw iErr

    return { redirect: `/checkout/${order.id}` }
  } catch (e: any) {
    console.error('[createDraftOrder] failed:', e?.message || e)
    // Surface a readable error to the client (prevents opaque 500 in dev)
    return { error: e?.message || 'Failed to create order' }
  }
}
