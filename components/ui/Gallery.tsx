'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

type Img = { id: number; url: string }
export default function Gallery({ primary, images, name }: { primary: string; images: Img[]; name: string }) {
  const sources = [primary, ...images?.map(i => i.url).filter(u => u !== primary)]
  const [current, setCurrent] = useState(0)

  return (
    <div className="w-full">
      <motion.div
        key={sources[current]}
        initial={{ opacity: 0, scale: .98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .25 }}
        className="rounded-2xl overflow-hidden border border-purple-900/10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sources[current]} alt={name} className="w-full aspect-square object-cover" />
      </motion.div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {sources.map((src, i) => (
          <button
            key={src+i}
            onClick={() => setCurrent(i)}
            className={`rounded-xl overflow-hidden border ${i===current ? 'border-purple-900' : 'border-purple-900/10'} hover:opacity-90`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="w-full aspect-[4/3] object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
