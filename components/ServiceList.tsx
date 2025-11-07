'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Service = {
  id: number;
  slug: string;
  title: string;
  short_desc: string | null;
  image_path: string | null; // Supabase storage key or absolute URL
};

const imageFromPath = (image_path?: string | null) => {
  if (!image_path) return '/placeholder.jpg';
  // If absolute URL, just return it. Otherwise build public storage URL.
  if (image_path.startsWith('http')) return image_path;
  // change {project-ref} and bucket if different (here bucket = 'services')
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/service-images/${image_path}`;
};

const ServiceCard = ({ slug, title, short_desc, image_path }: Service) => {
  return (
    <Link
      href={`/services/${slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 h-full border border-purple-100/50"
    >
      <div className="relative aspect-square overflow-hidden bg-purple-50">
        <Image
          src={imageFromPath(image_path)}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 sm:p-5 flex flex-col min-h-[180px] sm:min_h-[200px]">
        <h3 className="text-base sm:text-lg font-semibold text-purple-900 mb-2 line-clamp-2 leading-snug">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-purple-900/60 mb-4 line-clamp-2 flex-grow leading-relaxed">
          {short_desc ?? ''}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-purple-100">
          <span className="text-xs text-purple-900/50">Service</span>
          <span className="inline-flex items-center justify-center bg-purple-800 hover:bg-purple-900 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg group-hover:bg-purple-900">
            Book now
          </span>
        </div>
      </div>
    </Link>
  );
};

const FeaturedServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // carousel refs & state
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const autoRef = useRef<any>(null);
  const resetTimeoutRef = useRef<any>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [gapPx] = useState(24); // gap-6
  const clonesCount = 3;
  const [virtualIndex, setVirtualIndex] = useState(clonesCount);
  const [currentDot, setCurrentDot] = useState(0);
  const interactionRef = useRef(false);

  // fetch services (first 12)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/featured-services'); // see route below
        if (!res.ok) throw new Error('Failed to fetch services');
        const data = await res.json();
        setServices(data.services ? data.services.slice(0, 12) : []);
      } catch {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // compute card width for 3 columns on desktop
  const computeCardWidth = () => {
    const sc = scrollRef.current;
    if (!sc) return;
    const containerWidth = sc.clientWidth;
    const cw = Math.floor((containerWidth - gapPx * 2) / 3);
    setCardWidth(cw);
  };

  useEffect(() => {
    computeCardWidth();
    const ro = new ResizeObserver(() => computeCardWidth());
    if (scrollRef.current) ro.observe(scrollRef.current);
    return () => {
      try {
        ro.disconnect();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, isMobile]);

  // Build extended list with clones
  const extended = (() => {
    if (!services || services.length === 0) return [];
    const before = services.slice(-clonesCount);
    const after = services.slice(0, clonesCount);
    return [...before, ...services, ...after];
  })();

  const scrollToVirtual = (vIndex: number, smooth = true) => {
    const sc = scrollRef.current;
    if (!sc || !cardWidth) return;
    const step = cardWidth + gapPx;
    const left = vIndex * step;
    sc.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    if (isMobile) return;
    if (!cardWidth || extended.length === 0) return;

    setVirtualIndex(clonesCount);
    scrollToVirtual(clonesCount, false);
    setCurrentDot(0);
    startAuto();
    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardWidth, extended.length, isMobile]);

  const startAuto = () => {
    stopAuto();
    if (isMobile || services.length <= 1) return;
    autoRef.current = setInterval(() => goNext(), 3500);
  };
  const stopAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = null;
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = null;
  };

  const scheduleResetIfNeeded = (vIndex: number) => {
    if (!cardWidth) return;
    const rightBoundary = clonesCount + services.length;
    if (vIndex >= rightBoundary) {
      const equivalent = clonesCount + (vIndex - rightBoundary);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = setTimeout(() => {
        scrollToVirtual(equivalent, false);
        setVirtualIndex(equivalent);
        resetTimeoutRef.current = null;
      }, 520);
    } else if (vIndex < clonesCount) {
      const offsetIntoLeft = clonesCount - vIndex;
      const equivalent = clonesCount + (services.length - offsetIntoLeft);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = setTimeout(() => {
        scrollToVirtual(equivalent, false);
        setVirtualIndex(equivalent);
        resetTimeoutRef.current = null;
      }, 520);
    }

    const realIndex =
      ((vIndex - clonesCount) % services.length + services.length) % services.length;
    setCurrentDot(realIndex);
  };

  const goNext = () => {
    setVirtualIndex((v) => {
      const next = v + 1;
      scrollToVirtual(next, true);
      scheduleResetIfNeeded(next);
      return next;
    });
  };
  const goPrev = () => {
    setVirtualIndex((v) => {
      const prev = v - 1;
      scrollToVirtual(prev, true);
      scheduleResetIfNeeded(prev);
      return prev;
    });
  };

  const userInteracted = () => {
    interactionRef.current = true;
    stopAuto();
  };

  const goToDot = (realIdx: number) => {
    userInteracted();
    const vIdx = clonesCount + realIdx;
    setVirtualIndex(vIdx);
    scrollToVirtual(vIdx, true);
    scheduleResetIfNeeded(vIdx);
  };

  const handlePrev = () => {
    userInteracted();
    goPrev();
  };
  const handleNext = () => {
    userInteracted();
    goNext();
  };

  const onMouseEnter = () => stopAuto();
  const onMouseLeave = () => {
    if (!interactionRef.current) startAuto();
  };

  // RENDERING
  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-gradient-to-b from-purple-50/40 via-white to-orange-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 tracking-tight">
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-purple-900/70">
              Loading featured services...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="py-12 sm:py-16 bg-gradient-to-b from-purple-50/40 via-white to-orange-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 tracking-tight">
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-purple-900/70">
              Holistic Therapies Designed For Your Mind, Body & Spirit.
            </p>
          </div>
          <div className="text-center py-16 bg-white/60 rounded-3xl backdrop-blur-sm border border-purple-100/50 shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-xl sm:text-2xl text-purple-900 font-semibold mb-2">
                Services are yet to be listed
              </p>
              <p className="text-sm sm:text-base text-purple-900/60">
                Check back soon for our healing therapies.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-purple-50/40 via-white to-orange-50/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl font-bold text-purple-900 mb-3 sm:mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-base sm:text-xl text-purple-900/70 font-light">
            Holistic Therapies Designed For Your Mind, Body & Spirit.
          </p>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden md:block relative mb-12">
          {services.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-purple-50 text-purple-900 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group border border-purple-100"
                aria-label="Previous services"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-purple-50 text-purple-900 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group border border-purple-100"
                aria-label="Next services"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-hidden scroll-smooth"
            style={{ padding: 0, WebkitOverflowScrolling: 'touch' }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="flex items-stretch" style={{ gap: `${gapPx}px`, padding: 0 }}>
              {extended.map((s, idx) => (
                <div
                  key={`${s.id}-${idx}`}
                  style={{
                    flex: `0 0 ${cardWidth ? `${cardWidth}px` : '280px'}`,
                    minWidth: cardWidth ? `${cardWidth}px` : '280px',
                  }}
                >
                  <ServiceCard
                    {...s}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots mapped to original indices */}
          <div className="flex justify-center gap-2.5 mt-6">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToDot(idx)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  idx === currentDot
                    ? 'w-10 bg-gradient-to-r from-purple-600 to-purple-900 shadow-lg'
                    : 'w-2.5 bg-purple-300 hover:bg-purple-400 hover:w-6'
                }`}
                aria-label={`Go to service ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden mb-10">
          <div className="grid grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.id} className="animate-fade-in">
                <ServiceCard {...s} />
              </div>
            ))}
          </div>
        </div>

        {/* Explore Button */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B18661] to-orange-400 hover:from-amber-500 hover:via-orange-500 hover:to-orange-600 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span>Explore all services</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .overflow-x-auto::-webkit-scrollbar { height: 8px; }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.08);
          border-radius: 999px;
        }
      `}</style>
    </section>
  );
};

export default FeaturedServices;
