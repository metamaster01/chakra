// 'use client'
// import { useState } from 'react'

// export default function ProductOptions({
//   colors = [],
//   sizes = [],
// }: { colors?: string[]; sizes?: string[] }) {
//   const [selected, setSelected] = useState<{ color?: string; size?: string }>({})

//   return (
//     <div className="space-y-5">
//       {!!colors?.length && (
//         <div>
//           <div className="text-sm text-purple-900/70 mb-2">Choose a Color</div>
//           <div className="flex gap-3">
//             {colors.map((c) => {
//               const active = selected.color === c
//               return (
//                 <button
//                   key={c}
//                   onClick={() => setSelected((s) => ({ ...s, color: c }))}
//                   className={`h-9 w-9 rounded-full ring-2 transition ${
//                     active ? 'ring-amber-300' : 'ring-purple-900/10'
//                   }`}
//                   style={{ backgroundColor: c }}
//                   aria-label={`color ${c}`}
//                 />
//               )
//             })}
//           </div>
//         </div>
//       )}

//       {!!sizes?.length && (
//         <div>
//           <div className="text-sm text-purple-900/70 mb-2">Choose a Size</div>
//           <div className="flex flex-wrap gap-2">
//             {sizes.map((s) => {
//               const active = selected.size === s
//               return (
//                 <button
//                   key={s}
//                   onClick={() => setSelected((st) => ({ ...st, size: s }))}
//                   className={`px-3 py-1.5 rounded-full text-sm border transition ${
//                     active
//                       ? 'bg-amber-200 text-purple-900 border-amber-300'
//                       : 'bg-white text-purple-900 border-purple-900/20 hover:border-purple-900/40'
//                   }`}
//                 >
//                   {s}
//                 </button>
//               )
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

'use client'
import { useEffect, useMemo, useState } from 'react'

type Variant = {
  id: number
  sku: string | null
  color_label: string | null
  color_value: string | null
  size_label: string | null
  price_paise: number
  mrp_paise: number | null
  stock: number | null
  image_url: string | null
}

export default function ProductOptions({
  variants,
  onChange,
}: {
  variants: Variant[]
  onChange?: (v: Variant | null) => void
}) {
  // derive unique colors & sizes
  const colors = useMemo(() => {
    const map = new Map<string, { label: string | null; value: string | null }>()
    variants.forEach(v => {
      const key = (v.color_label || v.color_value || '') as string
      if (key) map.set(key, { label: v.color_label, value: v.color_value })
    })
    return Array.from(map.values())
  }, [variants])

  const sizes = useMemo(() => {
    const set = new Set<string>()
    variants.forEach(v => v.size_label && set.add(v.size_label))
    return Array.from(set)
  }, [variants])

  const [selColor, setSelColor] = useState<string | null>(null)
  const [selSize, setSelSize]   = useState<string | null>(null)

  // pick a variant that matches selection
  const selected = useMemo(() => {
    const cand = variants.filter(v =>
      (selColor ? (v.color_label === selColor || v.color_value === selColor) : true) &&
      (selSize ? v.size_label === selSize : true)
    )
    return cand[0] || null
  }, [variants, selColor, selSize])

  useEffect(() => { onChange?.(selected) }, [selected, onChange])

  // if only one attribute exists, select it by default
  useEffect(() => {
    if (!selColor && colors.length === 1) setSelColor(colors[0].label || colors[0].value || null)
    if (!selSize  && sizes.length  === 1) setSelSize(sizes[0] || null)
  }, [colors, sizes, selColor, selSize])

  return (
    <div className="space-y-5">
      {!!colors.length && (
        <div>
          <div className="text-sm text-purple-900/70 mb-2">Choose a Color</div>
          <div className="flex gap-3">
            {colors.map((c) => {
              const token = c.label || c.value || ''
              const active = selColor === token
              return (
                <button
                  key={token}
                  onClick={() => setSelColor(token)}
                  className={`h-9 w-9 rounded-full ring-2 transition ${
                    active ? 'ring-amber-300' : 'ring-purple-900/10'
                  }`}
                  style={{ background: c.value || token }}
                  aria-label={`color ${token}`}
                  title={c.label || c.value || ''}
                />
              )
            })}
          </div>
        </div>
      )}

      {!!sizes.length && (
        <div>
          <div className="text-sm text-purple-900/70 mb-2">Choose a Size</div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => {
              const active = selSize === s
              return (
                <button
                  key={s}
                  onClick={() => setSelSize(s)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    active
                      ? 'bg-amber-200 text-purple-900 border-amber-300'
                      : 'bg-white text-purple-900 border-purple-900/20 hover:border-purple-900/40'
                  }`}
                >
                  {s}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Show a small variant summary if matched */}
      {selected && (
        <div className="text-xs text-purple-900/70">
          {selected.sku && <span className="mr-3">SKU: <b>{selected.sku}</b></span>}
          {typeof selected.stock === 'number' && <span>Stock: <b>{selected.stock}</b></span>}
        </div>
      )}
    </div>
  )
}
