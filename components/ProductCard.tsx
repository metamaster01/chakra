'use client'
import Link from 'next/link'
import { inr } from '@/lib/money'
import { motion } from 'framer-motion'

type ProductCardProps = {
  slug: string
  name: string
  short_desc?: string | null
  price_paise: number
  image: string
}

export default function ProductCard({ slug, name, short_desc, price_paise, image }: ProductCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group h-full rounded-2xl border border-purple-900/10 bg-white shadow-sm overflow-hidden flex flex-col"
    >
      <Link href={`/products/${slug}`} className="block relative">
        {/* consistent image sizing */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="aspect-[4/3] w-full object-cover"
        />
      </Link>

      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-center text-[15px] font-semibold text-purple-900">
          <span className="line-clamp-1" style={{display:'-webkit-box', WebkitLineClamp:1, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{name}</span>
        </h3>
        <p className="mt-1 text-[12px] text-center text-purple-900/70"
           style={{display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>
          {short_desc || '—'}
        </p>

        <div className="mt-3 text-center text-[13px] text-purple-900">
          <span className="font-medium">Price:</span> {inr(price_paise)}
        </div>

        <div className="mt-4">
          <Link
            href={`/products/${slug}`}
            className="inline-flex w-full justify-center rounded-xl px-4 py-2 text-sm font-medium
                       text-white bg-gradient-to-r from-purple-900 to-purple-700 hover:opacity-95
                       ring-1 ring-purple-900/10 group-hover:scale-[1.01] transition"
          >
            Buy now
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
