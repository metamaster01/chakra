import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { amount_paise, order_id } = await req.json()
  const rzp = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! })
  const ro = await rzp.orders.create({ amount: amount_paise, currency: 'INR', receipt: `order_${order_id}` })
  return NextResponse.json({ razorpay_order_id: ro.id, key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID })
}
