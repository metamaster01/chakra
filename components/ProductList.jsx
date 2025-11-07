// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import Link from 'next/link'
// import Image from 'next/image'

// const ProductCard = ({ slug, name, short_desc, price_paise, image }) => {
//   const formatPrice = (paise) => {
//     return `₹${(paise / 100).toFixed(0)}`
//   }

//   return (
//     <Link 
//       href={`/products/${slug}`}
//       className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 h-full border border-purple-100/50"
//     >
//       <div className="relative aspect-square overflow-hidden bg-purple-50">
//         <Image 
//           src={image || '/placeholder.jpg'} 
//           alt={name}
//           fill
//           className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
//           sizes="(max-width: 768px) 50vw, 33vw"
//         />
//       </div>
//       <div className="p-4 sm:p-5 flex flex-col min-h-[180px] sm:min-h-[200px]">
//         <h3 className="text-base sm:text-lg font-semibold text-purple-900 mb-2 line-clamp-2 leading-snug">
//           {name}
//         </h3>
//         <p className="text-xs sm:text-sm text-purple-900/60 mb-4 line-clamp-2 flex-grow leading-relaxed">
//           {short_desc}
//         </p>
//         <div className="flex items-center justify-between mt-auto pt-3 border-t border-purple-100">
//           <div>
//             <span className="text-xs text-purple-900/50 block">Price:</span>
//             <span className="text-base sm:text-lg font-bold text-purple-900">
//               {formatPrice(price_paise)}
//             </span>
//           </div>
//           <button className="bg-purple-800 hover:bg-purple-900 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg group-hover:bg-purple-900">
//             Buy now
//           </button>
//         </div>
//       </div>
//     </Link>
//   )
// }

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const autoScrollRef = useRef(null)
//   const [isMobile, setIsMobile] = useState(false)

//   // Detect mobile viewport
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }
    
//     checkMobile()
//     window.addEventListener('resize', checkMobile)
    
//     return () => window.removeEventListener('resize', checkMobile)
//   }, [])

//   useEffect(() => {
//     fetchProducts()
//   }, [])

//   const fetchProducts = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch('/api/featured-product')
      
//       if (!response.ok) throw new Error('Failed to fetch products')
      
//       const data = await response.json()
      
//       if (data.products && data.products.length > 0) {
//         setProducts(data.products.slice(0, 6))
//       } else {
//         setProducts([])
//       }
//     } catch (err) {
//       setProducts([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Auto-scroll only on desktop - scrolls through sets of 3
//   useEffect(() => {
//     if (products.length <= 3 || isMobile) return

//     const totalSlides = Math.ceil(products.length / 3)

//     const startAutoScroll = () => {
//       autoScrollRef.current = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % totalSlides)
//       }, 4000)
//     }

//     startAutoScroll()

//     return () => {
//       if (autoScrollRef.current) {
//         clearInterval(autoScrollRef.current)
//       }
//     }
//   }, [products.length, isMobile])

//   const handlePrevious = () => {
//     if (autoScrollRef.current) clearInterval(autoScrollRef.current)
//     const totalSlides = Math.ceil(products.length / 3)
//     setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
//   }

//   const handleNext = () => {
//     if (autoScrollRef.current) clearInterval(autoScrollRef.current)
//     const totalSlides = Math.ceil(products.length / 3)
//     setCurrentIndex((prev) => (prev + 1) % totalSlides)
//   }

//   // Get current 3 products to display on desktop
//   const getCurrentProducts = () => {
//     const startIdx = currentIndex * 3
//     return products.slice(startIdx, startIdx + 3)
//   }

//   const totalSlides = Math.ceil(products.length / 3)

//   if (loading) {
//     return (
//       <section className="py-12 sm:py-16 bg-gradient-to-b from-purple-50/40 via-white to-orange-50/40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 tracking-tight">Our Products</h2>
//             <p className="text-base sm:text-lg text-purple-900/70">Loading featured products...</p>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   if (products.length === 0) {
//     return (
//       <section className="py-12 sm:py-16 bg-gradient-to-b from-purple-50/40 via-white to-orange-50/40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 tracking-tight">Our Products</h2>
//             <p className="text-base sm:text-lg text-purple-900/70">Sacred Tools For Healing, Energy, And Balance.</p>
//           </div>
//           <div className="text-center py-16 bg-white/60 rounded-3xl backdrop-blur-sm border border-purple-100/50 shadow-lg">
//             <div className="max-w-md mx-auto">
//               <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                 </svg>
//               </div>
//               <p className="text-xl sm:text-2xl text-purple-900 font-semibold mb-2">
//                 Products are yet to be listed
//               </p>
//               <p className="text-sm sm:text-base text-purple-900/60">
//                 Check back soon for our collection of sacred healing tools
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="py-12 sm:py-20 bg-gradient-to-b from-purple-50/40 via-white to-orange-50/40 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-10 sm:mb-14">
//           <h2 className="text-3xl sm:text-5xl font-bold text-purple-900 mb-3 sm:mb-4 tracking-tight">
//             Our Products
//           </h2>
//           <p className="text-base sm:text-xl text-purple-900/70 font-light">
//             Sacred Tools For Healing, Energy, And Balance.
//           </p>
//         </div>

//         {/* Desktop View - Single Row with 3 Columns + Auto Scroll */}
//         <div className="hidden md:block relative mb-12">
//           <div className="relative px-12">
//             {/* Navigation Buttons */}
//             {products.length > 3 && (
//               <>
//                 <button
//                   onClick={handlePrevious}
//                   className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-purple-50 text-purple-900 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group border border-purple-100"
//                   aria-label="Previous products"
//                 >
//                   <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-purple-50 text-purple-900 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group border border-purple-100"
//                   aria-label="Next products"
//                 >
//                   <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
//                 </button>
//               </>
//             )}

//             {/* Cards Container with Smooth Transition */}
//             <div className="overflow-hidden">
//               <div 
//                 className="grid grid-cols-3 gap-6 transition-all duration-700 ease-in-out"
//                 style={{
//                   transform: `translateX(0)`,
//                 }}
//               >
//                 {getCurrentProducts().map((product) => (
//                   <div key={product.id} className="animate-fade-in">
//                     <ProductCard
//                       slug={product.slug}
//                       name={product.name}
//                       short_desc={product.short_desc}
//                       price_paise={product.price_paise}
//                       image={product.primary_image_url}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Pagination Dots */}
//           {products.length > 3 && (
//             <div className="flex justify-center gap-2.5 mt-10">
//               {Array.from({ length: totalSlides }).map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => {
//                     if (autoScrollRef.current) clearInterval(autoScrollRef.current)
//                     setCurrentIndex(idx)
//                   }}
//                   className={`h-2.5 rounded-full transition-all duration-500 ${
//                     idx === currentIndex 
//                       ? 'w-10 bg-gradient-to-r from-purple-600 to-purple-900 shadow-lg' 
//                       : 'w-2.5 bg-purple-300 hover:bg-purple-400 hover:w-6'
//                   }`}
//                   aria-label={`Go to slide ${idx + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Mobile View - Static Grid 2 columns */}
//         <div className="md:hidden mb-10">
//           <div className="grid grid-cols-2 gap-4">
//             {products.map((product) => (
//               <div key={product.id} className="animate-fade-in">
//                 <ProductCard
//                   slug={product.slug}
//                   name={product.name}
//                   short_desc={product.short_desc}
//                   price_paise={product.price_paise}
//                   image={product.primary_image_url}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Explore Button */}
//         <div className="text-center">
//           <Link
//             href="/products"
//             className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B18661] to-orange-400 hover:from-amber-500 hover:via-orange-500 hover:to-orange-600 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
//           >
//             <span>Explore our full collection</span>
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </Link>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.8s ease-out forwards;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </section>
//   )
// }

// export default FeaturedProducts

'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const ProductCard = ({ slug, name, short_desc, price_paise, image }) => {
  const formatPrice = (paise) => {
    return `₹${(paise / 100).toFixed(0)}`
  }

  return (
    <Link
      href={`/products/${slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 h-full border border-purple-100/50"
    >
      <div className="relative aspect-square overflow-hidden bg-purple-50">
        <Image
          src={image || '/placeholder.jpg'}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 sm:p-5 flex flex-col min-h-[180px] sm:min-h-[200px]">
        <h3 className="text-base sm:text-lg font-semibold text-purple-900 mb-2 line-clamp-2 leading-snug">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-purple-900/60 mb-4 line-clamp-2 flex-grow leading-relaxed">
          {short_desc}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-purple-100">
          <div>
            <span className="text-xs text-purple-900/50 block">Price:</span>
            <span className="text-base sm:text-lg font-bold text-purple-900">
              {formatPrice(price_paise)}
            </span>
          </div>
          <button className="bg-purple-800 hover:bg-purple-900 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg group-hover:bg-purple-900">
            Buy now
          </button>
        </div>
      </div>
    </Link>
  )
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // carousel refs & state
  const scrollRef = useRef(null)
  const cardRef = useRef(null)
  const autoRef = useRef(null)
  const resetTimeoutRef = useRef(null)
  const [cardWidth, setCardWidth] = useState(0)
  const [gapPx] = useState(24) // gap-6 -> 1.5rem = 24px
  const clonesCount = 3 // clones before and after to make infinite feel smooth
  const [virtualIndex, setVirtualIndex] = useState(clonesCount) // index in extended array
  const [currentDot, setCurrentDot] = useState(0)
  const interactionRef = useRef(false)

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/featured-product')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setProducts(data.products ? data.products.slice(0, 12) : [])
      } catch (e) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // compute card width for 3 columns on desktop (unchanged mobile)
  const computeCardWidth = () => {
    const sc = scrollRef.current
    if (!sc) return
    const containerWidth = sc.clientWidth
    // cardWidth = (containerWidth - 2*gap - maybe extra padding)/3
    const cw = Math.floor((containerWidth - gapPx * 2) / 3)
    setCardWidth(cw)
  }

  useEffect(() => {
    computeCardWidth()
    const ro = new ResizeObserver(() => computeCardWidth())
    if (scrollRef.current) ro.observe(scrollRef.current)
    return () => {
      try { ro.disconnect() } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, isMobile])

  // Build extended list with clones for infinite effect (desktop only)
  const extended = (() => {
    if (!products || products.length === 0) return []
    const before = products.slice(-clonesCount)
    const after = products.slice(0, clonesCount)
    return [...before, ...products, ...after]
  })()

  // helper: scroll to virtual index position
  const scrollToVirtual = (vIndex, smooth = true) => {
    const sc = scrollRef.current
    if (!sc || !cardWidth) return
    const step = cardWidth + gapPx
    const left = vIndex * step
    sc.scrollTo({
      left,
      behavior: smooth ? 'smooth' : 'auto',
    })
  }

  // initialize scroll position once sizes computed
  useEffect(() => {
    if (isMobile) return
    if (!cardWidth || extended.length === 0) return

    // start at clonesCount (the first real item)
    setVirtualIndex(clonesCount)
    // set scroll left without animation
    scrollToVirtual(clonesCount, false)
    // set dot index
    setCurrentDot(0)

    // start auto
    startAuto()

    return () => stopAuto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardWidth, extended.length, isMobile])

  // auto-scroll control
  const startAuto = () => {
    stopAuto()
    if (isMobile || products.length <= 1) return
    autoRef.current = setInterval(() => {
      goNext()
    }, 3500)
  }
  const stopAuto = () => {
    if (autoRef.current) {
      clearInterval(autoRef.current)
      autoRef.current = null
    }
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }
  }

  // go to next/prev in virtual indices
  const goNext = () => {
    interactionRef.current = false
    setVirtualIndex((v) => {
      const next = v + 1
      // scroll smoothly
      scrollToVirtual(next, true)
      // schedule possible reset after animation (allow 520ms)
      scheduleResetIfNeeded(next)
      return next
    })
  }
  const goPrev = () => {
    interactionRef.current = false
    setVirtualIndex((v) => {
      const prev = v - 1
      scrollToVirtual(prev, true)
      scheduleResetIfNeeded(prev)
      return prev
    })
  }

  // when user interacts, stop auto and don't restart until they leave (mouse leave handled)
  const userInteracted = () => {
    interactionRef.current = true
    stopAuto()
  }

  // when virtual index reaches cloned boundaries, reset to equivalent real position instantly
  const scheduleResetIfNeeded = (vIndex) => {
    if (!cardWidth) return
    // if vIndex >= clonesCount + products.length -> we've moved into the after-clone zone at right
    const rightBoundary = clonesCount + products.length
    const leftBoundary = 0
    if (vIndex >= rightBoundary) {
      // compute equivalent real index
      const equivalent = clonesCount + (vIndex - rightBoundary)
      // reset after animation completes
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = setTimeout(() => {
        // set scroll without smooth
        scrollToVirtual(equivalent, false)
        setVirtualIndex(equivalent)
        resetTimeoutRef.current = null
      }, 520)
    } else if (vIndex < clonesCount - clonesCount) {
      // (this branch probably never triggers because we allow negative, but keep for completeness)
      const equivalent = clonesCount + ((vIndex - clonesCount) % products.length)
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = setTimeout(() => {
        scrollToVirtual(equivalent, false)
        setVirtualIndex(equivalent)
        resetTimeoutRef.current = null
      }, 520)
    } else if (vIndex < clonesCount) {
      // moved into the left-clone zone (e.g., vIndex = 2 while clonesCount=3)
      // map to equivalent real index near the end
      const offsetIntoLeft = clonesCount - vIndex
      const equivalent = clonesCount + (products.length - offsetIntoLeft)
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = setTimeout(() => {
        scrollToVirtual(equivalent, false)
        setVirtualIndex(equivalent)
        resetTimeoutRef.current = null
      }, 520)
    }

    // update dot (map virtual to real)
    const realIndex = ((vIndex - clonesCount) % products.length + products.length) % products.length
    setCurrentDot(realIndex)
  }

  // clicking a dot jumps to that product (first visible of the 3); stops auto
  const goToDot = (realIdx) => {
    userInteracted()
    // place it so that the realIdx corresponds to the center-left of the three? We want each card to scroll one-by-one,
    // so we map dot to the *realIdx* card (it will be visible as one of the three).
    const vIdx = clonesCount + realIdx
    setVirtualIndex(vIdx)
    scrollToVirtual(vIdx, true)
    scheduleResetIfNeeded(vIdx)
  }

  // respond to manual prev/next buttons
  const handlePrev = () => {
    userInteracted()
    goPrev()
  }
  const handleNext = () => {
    userInteracted()
    goNext()
  }

  // on mouse enter stop auto; resume on leave (if user hasn't explicitly interacted)
  const onMouseEnter = () => {
    stopAuto()
  }
  const onMouseLeave = () => {
    if (!interactionRef.current) startAuto()
  }

  // cleanup on unmount
  useEffect(() => {
    return () => {
      stopAuto()
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)
    }
  }, [])

  // RENDERING
  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-gradient-to-b from-purple-50/40 via-white to-orange-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 tracking-tight">Our Products</h2>
            <p className="text-base sm:text-lg text-purple-900/70">Loading featured products...</p>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="py-12 sm:py-16 bg-gradient-to-b from-purple-50/40 via-white to-orange-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 tracking-tight">Our Products</h2>
            <p className="text-base sm:text-lg text-purple-900/70">Sacred Tools For Healing, Energy, And Balance.</p>
          </div>
          <div className="text-center py-16 bg-white/60 rounded-3xl backdrop-blur-sm border border-purple-100/50 shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-xl sm:text-2xl text-purple-900 font-semibold mb-2">
                Products are yet to be listed
              </p>
              <p className="text-sm sm:text-base text-purple-900/60">
                Check back soon for our collection of sacred healing tools
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-purple-50/40 via-white to-orange-50/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl font-bold text-purple-900 mb-3 sm:mb-4 tracking-tight">
            Our Products
          </h2>
          <p className="text-base sm:text-xl text-purple-900/70 font-light">
            Sacred Tools For Healing, Energy, And Balance.
          </p>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden md:block relative mb-12">
          {/* Nav */}
          {products.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-purple-50 text-purple-900 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group border border-purple-100"
                aria-label="Previous products"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-purple-50 text-purple-900 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group border border-purple-100"
                aria-label="Next products"
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
              {extended.map((p, idx) => (
                <div
                  key={`${p.id}-${idx}`}
                  ref={idx === 0 ? cardRef : null}
                  style={{
                    flex: `0 0 ${cardWidth ? `${cardWidth}px` : '280px'}`,
                    minWidth: cardWidth ? `${cardWidth}px` : '280px',
                  }}
                >
                  <ProductCard
                    slug={p.slug}
                    name={p.name}
                    short_desc={p.short_desc}
                    price_paise={p.price_paise}
                    image={p.primary_image_url}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots mapped to original product indices */}
          <div className="flex justify-center gap-2.5 mt-6">
            {products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToDot(idx)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  idx === currentDot
                    ? 'w-10 bg-gradient-to-r from-purple-600 to-purple-900 shadow-lg'
                    : 'w-2.5 bg-purple-300 hover:bg-purple-400 hover:w-6'
                }`}
                aria-label={`Go to product ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Grid unchanged */}
        <div className="md:hidden mb-10">
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="animate-fade-in">
                <ProductCard
                  slug={product.slug}
                  name={product.name}
                  short_desc={product.short_desc}
                  price_paise={product.price_paise}
                  image={product.primary_image_url}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Explore Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B18661] to-orange-400 hover:from-amber-500 hover:via-orange-500 hover:to-orange-600 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span>Explore our full collection</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* scrollbar styling */
        .overflow-x-auto::-webkit-scrollbar {
          height: 8px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.08);
          border-radius: 999px;
        }
      `}</style>
    </section>
  )
}

export default FeaturedProducts
