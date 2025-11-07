'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  service: {
    id: number;
    slug: string;
    title: string;
    short_desc: string;
    long_desc: string;
    image_path: string | null;
  };
  benefits: string[];
};

const toPublicUrl = (image_path?: string | null) => {
  if (!image_path) return '/placeholder.jpg';
  if (image_path.startsWith('http')) return image_path;
  // storage bucket assumed "services"
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/service-images/${image_path}`;
};

// Animations
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } },
});
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut', delay } },
});
const listParent = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};
const listItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ServiceDetailClient({ service, benefits }: Props) {
  const heroUrl = toPublicUrl(service.image_path);

  return (
    <div className="min-h-screen bg-white">
      {/* Header bar */}
      <section className="bg-[#3D2472] text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 lg:py-36 md:py-16">
          <motion.p
            
            className="uppercase tracking-[0.18em] text-xs md:text-sm/none opacity-80"
          >
            Home<span className="opacity-60">/</span>Services
          </motion.p>
          <motion.h1

            className="mt-4 text-3xl md:text-6xl font-semibold tracking-tight"
          >
            {service.title}
          </motion.h1>
        </div>
      </section>

      {/* Hero image with **fixed heights** per breakpoint */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 -mt-10 md:-mt-14">
        <motion.div
          
          className="relative w-full overflow-hidden rounded-2xl border border-purple-900/10 bg-white shadow-sm"
        >
          {/* fixed height that adapts with breakpoints */}
          <div className="relative w-full h-56 sm:h-72 md:h-[420px] lg:h-[520px]">
            <Image
              src={heroUrl}
              alt={service.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </motion.div>
      </section>

      {/* Body */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12">
          {/* Left: Description + CTA */}
          <div className="md:col-span-3">
            {service.short_desc && (
              <motion.h2
                
                className="text-xl md:text-2xl font-semibold text-[#3D2472]"
              >
                {service.short_desc}
              </motion.h2>
            )}

            {service.long_desc && (
              <motion.p
                
                className="mt-4 text-[15px] md:text-base leading-7 text-purple-900/80"
              >
                {service.long_desc}
              </motion.p>
            )}

            <motion.p
              
              className="mt-5 text-[14px] text-purple-900/70"
            >
              ✨ Feel lighter. Move easier. Breathe deeper.
            </motion.p>

            <motion.div  className="mt-6">
              <Link
                href={`/booking?service=${encodeURIComponent(service.slug)}`}
                className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold
                           text-white bg-[#B18661] hover:opacity-95 transition will-change-transform
                           hover:scale-[1.01]"
              >
                Book now
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right: Benefits with lined items */}
          <aside className="md:col-span-2">
            <motion.h3
              
              className="text-2xl font-semibold text-purple-900"
            >
              Benefits Of {service.title}
            </motion.h3>

            <motion.ul
              variants={listParent}
              initial="initial"
              animate="animate"
              className="mt-5 space-y-3"
            >
              {benefits.length ? (
                benefits.map((label, i) => (
                  <motion.li key={`${i}-${label}`} variants={listItem}>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-[#3BAE69] shrink-0">
                        {/* tiny check icon */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-[13.5px] md:text-sm text-purple-900/90">
                          {label}
                        </div>
                        <div className="h-px mt-3 bg-purple-900/10" />
                      </div>
                    </div>
                  </motion.li>
                ))
              ) : (
                <motion.li variants={listItem} className="text-sm text-purple-900/50">
                  Benefits will appear here.
                </motion.li>
              )}
            </motion.ul>
          </aside>
        </div>

        {/* What to Expect */}
        <section className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12">
          <motion.div  className="md:col-span-2">
            <h3 className="text-3xl font-semibold text-purple-900">What To Expect</h3>
          </motion.div>

          <motion.div  className="md:col-span-3">
            <p className="text-[15px] md:text-base leading-7 text-purple-900/80">
              Your session begins with a short consultation to understand your areas of concern.
              Using a blend of aromatherapy oils and targeted massage techniques, we’ll focus on
              releasing knots and deep-seated tension — leaving you feeling lighter, grounded,
              and recharged.
            </p>
            <p className="mt-3 text-[14px] text-purple-900/70">
              💡 Pressure can be adjusted according to your comfort level.
            </p>
          </motion.div>
        </section>

        {/* Bottom CTA */}
        <motion.div  className="mt-10 md:mt-14">
          <Link
            href={`/booking?service=${encodeURIComponent(service.slug)}`}
            className="inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold
                       text-white bg-gradient-to-r from-purple-900 to-purple-700 hover:opacity-95
                       transition will-change-transform hover:scale-[1.01]"
          >
            Book this therapy
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </main>

      
    </div>
  );
}
