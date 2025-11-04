'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'

export default function StatsLive({
  productId,
  initialAvg,
  initialCount,
}: { productId: number; initialAvg?: number | null; initialCount?: number | null }) {
  const supabase = createClient()
  const [avg, setAvg] = useState<number>(initialAvg ?? 0)
  const [count, setCount] = useState<number>(initialCount ?? 0)

  useEffect(() => {
    let alive = true

    async function refresh() {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('rating', { head: false, count: 'exact' })
        .eq('product_id', productId)
        .eq('status', 'approved') // only approved count
      if (!alive || error) return
      const arr = (data as any[]) || []
      const a = arr.reduce((s, r) => s + (r.rating ?? 0), 0)
      setCount(arr.length)
      setAvg(arr.length ? a / arr.length : 0)
    }

    refresh()

    // realtime (inserts/updates/deletes)
    const ch = supabase
      .channel(`reviews:${productId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'product_reviews', filter: `product_id=eq.${productId}` },
        () => refresh()
      )
      .subscribe()

    return () => {
      alive = false
      supabase.removeChannel(ch)
    }
  }, [productId, supabase])

  const stars = Math.round(avg || 0)
  return (
    <div className="text-sm text-amber-600">
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
      <span className="ml-2 text-purple-900/60">({count} Reviews)</span>
    </div>
  )
}
