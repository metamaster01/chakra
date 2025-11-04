'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'

export default function LikeButton({ productId }: { productId: number }) {
  const supabase = createClient()
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const [{ data: { user } }, { data: likesCount }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from('product_likes').select('product_id', { count: 'exact', head: true }).eq('product_id', productId)
      ])
      if (!mounted) return
      setCount(likesCount?.length ?? 0)
      if (user) {
        const { data } = await supabase.from('product_likes')
          .select('product_id').eq('product_id', productId).eq('user_id', user.id).maybeSingle()
        setLiked(!!data)
      }
    })()
    return () => { mounted = false }
  }, [productId, supabase])

  async function toggle() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }
    if (liked) {
      await supabase.from('product_likes').delete().eq('product_id', productId).eq('user_id', user.id)
      setLiked(false); setCount(c => Math.max(0, c-1))
    } else {
      await supabase.from('product_likes').insert({ product_id: productId, user_id: user.id })
      setLiked(true); setCount(c => c+1)
    }
  }

  return (
    <button onClick={toggle}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm
                  ${liked ? 'bg-amber-200 text-purple-900' : 'bg-purple-900/5 text-purple-900'}`}>
      <span>❤</span>
      <span className="min-w-[2ch] text-center">{count}</span>
    </button>
  )
}
