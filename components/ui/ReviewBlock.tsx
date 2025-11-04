'use client'
import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'

type Review = {
  id: number; rating: number; title: string | null; body: string | null; created_at: string;
  profiles?: { full_name: string | null, avatar_url: string | null } | null
}

export default function ReviewsBlock({ productId }: { productId: number }) {
  const supabase = createClient()
  const [items, setItems] = useState<Review[]>([])
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [busy, setBusy] = useState(false)

  const avg = useMemo(() => {
    if (!items.length) return 0
    return items.reduce((s,r)=>s+r.rating,0) / items.length
  }, [items])

  useEffect(() => {
    let alive = true
    ;(async () => {
      const { data } = await supabase
        .from('product_reviews')
        .select('id, rating, title, body, created_at, profiles!inner(full_name, avatar_url)')
        .eq('product_id', productId)
        .order('created_at', { ascending: false })
      if (!alive) return
      setItems(
        (data || []).map((r: any) => ({
          ...r,
          profiles: Array.isArray(r.profiles) ? r.profiles[0] : r.profiles
        }))
      )
    })()
    return () => { alive = false }
  }, [productId, supabase])

  async function submit() {
    setBusy(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }
    const { error, data } = await supabase
      .from('product_reviews')
      .insert({ product_id: productId, user_id: user.id, rating, title, body, status: 'approved' })
      .select('id, rating, title, body, created_at, profiles!inner(full_name, avatar_url)')
      .single()
    setBusy(false)
    if (error) { alert(error.message); return }
    setItems(prev => [data as any, ...prev])
    setTitle(''); setBody(''); setRating(5)
  }

  return (
    <div className="grid md:grid-cols-[1fr_1fr] gap-8">
      <div>
        <div className="rounded-2xl border border-purple-900/10 bg-white p-5">
          <div className="text-3xl font-bold text-purple-900">{avg.toFixed(1)}</div>
          <div className="text-amber-600 mt-1">{'★'.repeat(Math.round(avg))}{'☆'.repeat(5-Math.round(avg))}</div>
          <div className="text-sm text-purple-900/60 mt-1">{items.length} reviews</div>
        </div>

        <ul className="mt-4 space-y-4">
          {items.map(r => (
            <li key={r.id} className="rounded-2xl border border-purple-900/10 bg-white p-4">
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.profiles?.avatar_url || '/avatar-placeholder.svg'} className="w-9 h-9 rounded-full object-cover" alt="" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-purple-900">{r.profiles?.full_name || 'User'}</div>
                    <div className="text-xs text-purple-900/50">{new Date(r.created_at).toLocaleDateString()}</div>
                  </div>
                  <div className="text-amber-600 text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                  {r.title && <div className="mt-1 font-medium text-purple-900">{r.title}</div>}
                  {r.body && <p className="text-sm text-purple-900/80 mt-1">{r.body}</p>}
                </div>
              </div>
            </li>
          ))}
          {!items.length && <li className="text-purple-900/60">No reviews yet.</li>}
        </ul>
      </div>

      <div className="rounded-2xl border border-purple-900/10 bg-white p-5 h-fit">
        <div className="font-semibold text-purple-900">Write a review</div>
        <div className="mt-3 text-sm text-purple-900/80">What is it like to Product?</div>

        <div className="mt-3">
          <label className="text-sm text-purple-900">Rating</label>
          <div className="mt-1 flex gap-1 text-xl text-amber-600">
            {[1,2,3,4,5].map(st => (
              <button key={st} onClick={()=>setRating(st)} className={st<=rating?'':'opacity-40'}>★</button>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <label className="text-sm text-purple-900">Review Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)}
                 className="mt-1 w-full rounded-xl border border-purple-900/20 px-3 py-2" placeholder="Great Product" />
        </div>

        <div className="mt-3">
          <label className="text-sm text-purple-900">Review Content</label>
          <textarea value={body} onChange={e=>setBody(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-purple-900/20 px-3 py-2 min-h-[120px]" placeholder="type here..." />
        </div>

        <button onClick={submit} disabled={busy}
                className="mt-4 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-900 to-purple-700 hover:opacity-95">
          {busy ? 'Submitting…' : 'Submit Review'}
        </button>
      </div>
    </div>
  )
}
