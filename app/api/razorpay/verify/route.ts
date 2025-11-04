import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()
  const text = `${razorpay_order_id}|${razorpay_payment_id}`
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!).update(text).digest('hex')
  const ok = expected === razorpay_signature
  return NextResponse.json({ ok })
}
