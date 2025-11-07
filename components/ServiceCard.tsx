'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type ServiceCardProps = {
  slug: string;
  title: string;
  short_desc?: string | null;
  image: string; // resolved public URL
};

export default function ServiceCard({ slug, title, short_desc, image }: ServiceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group h-full rounded-2xl border border-purple-900/10 bg-white shadow-sm overflow-hidden flex flex-col"
    >
      <Link href={`/services/${slug}`} className="block relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="aspect-[4/3] w-full object-cover"
        />
      </Link>

      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-center text-[15px] font-semibold text-purple-900">
          <span className="line-clamp-1" style={{display:'-webkit-box', WebkitLineClamp:1, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{title}</span>
        </h3>

        <p
          className="mt-1 text-[12px] text-center text-purple-900/70"
          style={{display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}
        >
          {short_desc || '—'}
        </p>

        <div className="mt-4">
          <Link
            href={`/services/${slug}`}
            className="inline-flex w-full justify-center rounded-xl px-4 py-2 text-sm font-medium
                       text-white bg-gradient-to-r from-purple-900 to-purple-700 hover:opacity-95
                       ring-1 ring-purple-900/10 group-hover:scale-[1.01] transition"
          >
            Book now
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
