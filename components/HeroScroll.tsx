// 'use client'

// import React, { useEffect, useRef } from 'react'
// import Image from 'next/image'

// export default function ChakraHeroScroll() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const pinSectionRef = useRef<HTMLDivElement>(null)
//   const imageWrapperRef = useRef<HTMLDivElement>(null)
//   const chakraRef = useRef<HTMLDivElement>(null)
//   const phase1ContentRef = useRef<HTMLDivElement>(null)
//   const phase2ContentRef = useRef<HTMLDivElement>(null)
//   const phase3ContentRef = useRef<HTMLDivElement>(null)
//   const card1Ref = useRef<HTMLDivElement>(null)
//   const card2Ref = useRef<HTMLDivElement>(null)
//   const card3Ref = useRef<HTMLDivElement>(null)
//   const card4Ref = useRef<HTMLDivElement>(null)
//   const progressBarRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     let gsap: any
//     let ScrollTrigger: any
//     let Lenis: any
//     let lenis: any
//     let ctx: any

//     const setup = async () => {
//       const g = await import('gsap')
//       const st = await import('gsap/ScrollTrigger')
//       gsap = g.gsap || g.default
//       ScrollTrigger = st.ScrollTrigger
//       gsap.registerPlugin(ScrollTrigger)

//       const lenisModule = await import('@studio-freight/lenis')
//       Lenis = lenisModule.default

//       lenis = new Lenis({
//         duration: 1.2,
//         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         smoothWheel: true,
//         smoothTouch: false,
//       })

//       function raf(time: number) {
//         lenis.raf(time)
//         requestAnimationFrame(raf)
//       }
//       requestAnimationFrame(raf)

//       lenis.on('scroll', ScrollTrigger.update)

//       ctx = gsap.context(() => {
//         // Continuous chakra rotation
//         gsap.to(chakraRef.current, {
//           rotation: 360,
//           duration: 20,
//           ease: 'none',
//           repeat: -1,
//         })

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: pinSectionRef.current,
//             start: 'top top',
//             end: '+=4000',
//             scrub: 1,
//             pin: true,
//             anticipatePin: 1,
//             onUpdate: (self : any) => {
//               if (progressBarRef.current) {
//                 gsap.to(progressBarRef.current, {
//                   scaleY: self.progress,
//                   duration: 0.1,
//                 })
//               }
//             },
//           },
//         })

//         // Set initial states
//         gsap.set(phase2ContentRef.current, { autoAlpha: 0, x: 50 })
//         gsap.set(phase3ContentRef.current, { autoAlpha: 0, y: -30 })
//         gsap.set([card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current], {
//           autoAlpha: 0,
//           scale: 0.7,
//         })

//         // PHASE 1 → PHASE 2: Image moves to LEFT, content swaps to RIGHT
//         tl.to(imageWrapperRef.current, {
//           x: '-40vw',
//           y: 0,
//           scale: 0.75,
//           duration: 1,
//         }, 0)
//           .to(phase1ContentRef.current, {
//             autoAlpha: 0,
//             x: -50,
//             duration: 0.4,
//           }, 0.2)
//           .to(phase2ContentRef.current, {
//             autoAlpha: 1,
//             x: 0,
//             duration: 0.6,
//           }, 0.6)

//         // PHASE 2 → PHASE 3: Image moves to CENTER, content swaps to top + cards appear
//         tl.to(imageWrapperRef.current, {
//           x: 0,
//           y: '8vh',
//           scale: 0.85,
//           duration: 1.2,
//         })
//           .to(phase2ContentRef.current, {
//             autoAlpha: 0,
//             duration: 0.4,
//           }, '<')
//           .to(phase3ContentRef.current, {
//             autoAlpha: 1,
//             y: 0,
//             duration: 0.6,
//           }, '<+0.3')

//         // PHASE 3: Cards emerge and spread to corners
//         tl.to([card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current], {
//           autoAlpha: 1,
//           scale: 1,
//           duration: 0.5,
//           stagger: 0.1,
//         })
//           .to(card1Ref.current, {
//             x: -420,
//             y: -180,
//             duration: 0.8,
//           }, '<+0.2')
//           .to(card2Ref.current, {
//             x: 420,
//             y: -180,
//             duration: 0.8,
//           }, '<')
//           .to(card3Ref.current, {
//             x: -420,
//             y: 180,
//             duration: 0.8,
//           }, '<')
//           .to(card4Ref.current, {
//             x: 420,
//             y: 180,
//             duration: 0.8,
//           }, '<')

//         // Floating animations
//         gsap.to(card1Ref.current, { y: '+=12', duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
//         gsap.to(card2Ref.current, { y: '+=15', duration: 2.3, yoyo: true, repeat: -1, ease: 'sine.inOut' })
//         gsap.to(card3Ref.current, { y: '+=18', duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut' })
//         gsap.to(card4Ref.current, { y: '+=14', duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
//       }, containerRef)
//     }

//     setup()

//     return () => {
//       ctx?.revert()
//       lenis?.destroy()
//     }
//   }, [])

//   return (
//     <div ref={containerRef} className="relative">
//       {/* Progress Bar */}
//       <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
//         <div className="w-1 h-64 bg-white/20 rounded-full overflow-hidden">
//           <div
//             ref={progressBarRef}
//             className="w-full bg-gradient-to-b from-amber-200 to-purple-400 origin-top"
//             style={{ transform: 'scaleY(0)' }}
//           />
//         </div>
//       </div>

//       {/* Pinned Section */}
//       <section
//         ref={pinSectionRef}
//         className="relative min-h-screen bg-purple-900 overflow-hidden mt-20"
//       >
//         <div className="relative h-screen flex items-center justify-center px-6 lg:px-12 max-w-7xl mx-auto">
          
//           {/* PHASE 1 Content - Left Side */}
//           <div
//             ref={phase1ContentRef}
//             className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-lg text-white z-20"
//           >
//             <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 font-serif">
//               HEAL. ALIGN.
//               <br />
//               AWAKEN.
//             </h1>
//             <p className="text-lg text-white/90 mb-8 leading-relaxed">
//               Your sanctuary for peace & holistic healing.
//             </p>
//             <button className="px-8 py-4 bg-amber-200 text-purple-900 font-semibold rounded-full hover:bg-amber-300 transition-all duration-300 shadow-lg">
//               Start your journey →
//             </button>
//             <div className="mt-12 space-y-3">
//               <div className="text-xl font-bold">100k Happy Customers</div>
//               <p className="text-white/80 leading-relaxed max-w-md">
//                 Chakra healing restores harmony, clarity, and emotional strength.
//               </p>
//             </div>
//           </div>

//           {/* PHASE 2 Content - Right Side (flip-flop position) */}
//           <div
//             ref={phase2ContentRef}
//             className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-md text-white z-20"
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-serif">
//               Your Healing Journey
//             </h2>
//             <p className="text-lg text-white/90 mb-8 leading-relaxed">
//               Chakra means 'wheel of energy.' Guiding balance within mind, body, and spirit.
//             </p>
//             <div className="space-y-4">
//               <div className="flex items-start gap-3">
//                 <span className="text-amber-200 text-2xl">✓</span>
//                 <p className="text-white/90">Restore harmony and inner peace</p>
//               </div>
//               <div className="flex items-start gap-3">
//                 <span className="text-amber-200 text-2xl">✓</span>
//                 <p className="text-white/90">Release stress and negative energy</p>
//               </div>
//               <div className="flex items-start gap-3">
//                 <span className="text-amber-200 text-2xl">✓</span>
//                 <p className="text-white/90">Awaken your true potential</p>
//               </div>
//             </div>
//           </div>

//           {/* PHASE 3 Content - Top Center */}
//           <div
//             ref={phase3ContentRef}
//             className="absolute top-28 left-1/2 -translate-x-1/2 text-center text-white z-20 max-w-3xl px-6"
//           >
//             <h2 className="text-4xl lg:text-6xl font-bold mb-4 font-serif">
//               HEAL. ALIGN. AWAKEN.
//             </h2>
//             <p className="text-lg text-white/90 mb-6">
//               Your Sanctuary For Peace & Holistic Healing
//             </p>
//             <button className="px-8 py-3 bg-white text-purple-900 font-semibold rounded-full hover:bg-amber-200 transition-all duration-300">
//               Start your journey →
//             </button>
//           </div>

//           {/* Image & Chakra Container - RIGHT SIDE FOR PHASE 1 */}
//           <div
//             ref={imageWrapperRef}
//             className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-[420px] h-[520px] lg:w-[480px] lg:h-[580px] z-10"
//           >
//             {/* Rotating Chakra Behind */}
//             <div
//               ref={chakraRef}
//               className="absolute inset-0 flex items-center justify-center -z-10"
//             >
//               <Image
//                 src="/chakra.png"
//                 alt="Chakra"
//                 width={700}
//                 height={700}
//                 className="w-full h-full object-contain opacity-90"
//                 priority
//               />
//             </div>

//             {/* Girl Image */}
//             <div className="relative w-full h-full">
//               <Image
//                 src="/hero-img.png"
//                 alt="Meditation"
//                 fill
//                 className="object-contain"
//                 priority
//               />
//             </div>
//           </div>

//           {/* Info Cards - SMALLER SIZE, PURPLE BACKGROUND */}
//           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-5">
//             {/* Card 1 - Top Left */}
//             <div
//               ref={card1Ref}
//               className="absolute w-56 p-5 bg-purple-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700"
//             >
//               <h3 className="text-base font-bold text-white mb-2">What Is Chakra?</h3>
//               <p className="text-sm text-purple-100">
//                 Chakra means 'wheel of energy,' guiding balance within mind, body, and spirit.
//               </p>
//             </div>

//             {/* Card 2 - Top Right */}
//             <div
//               ref={card2Ref}
//               className="absolute w-56 p-5 bg-purple-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700"
//             >
//               <h3 className="text-base font-bold text-white mb-2">Why Chakra Healing?</h3>
//               <p className="text-sm text-purple-100">
//                 When chakras are aligned, stress fades and inner calm awakens.
//               </p>
//             </div>

//             {/* Card 3 - Bottom Left */}
//             <div
//               ref={card3Ref}
//               className="absolute w-56 p-5 bg-purple-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700"
//             >
//               <h3 className="text-base font-bold text-white mb-2">Your Healing Journey</h3>
//               <p className="text-sm text-purple-100">
//                 Chakra healing restores harmony, clarity, and emotional strength.
//               </p>
//             </div>

//             {/* Card 4 - Bottom Right */}
//             <div
//               ref={card4Ref}
//               className="absolute w-56 p-5 bg-purple-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700"
//             >
//               <h3 className="text-base font-bold text-white mb-2">The Power Of Balance</h3>
//               <p className="text-sm text-purple-100">
//                 Each chakra carries wisdom — from stability and love to awareness and peace.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Next Section */}
//       <section className="relative bg-white py-32">
//         <div className="max-w-6xl mx-auto px-6 lg:px-12">
//           <h2 className="text-4xl lg:text-5xl font-bold text-purple-900 mb-6">
//             Continue Your Healing Journey
//           </h2>
//           <p className="text-lg text-gray-700 mb-12 max-w-2xl">
//             Explore our comprehensive chakra healing programs designed to restore balance and awaken your inner peace.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="p-8 bg-purple-50 rounded-2xl border border-purple-200">
//                 <h3 className="text-xl font-bold text-purple-900 mb-3">Practice {i}</h3>
//                 <p className="text-gray-700">
//                   Compassionate guidance that meets you where you are on your healing path.
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


// 'use client'

// import React, { useEffect, useRef } from 'react'
// import Image from 'next/image'

// export default function ChakraHeroScroll() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const pinSectionRef = useRef<HTMLDivElement>(null)
//   const imageWrapperRef = useRef<HTMLDivElement>(null)
//   const chakraRef = useRef<HTMLDivElement>(null)
//   const phase1ContentRef = useRef<HTMLDivElement>(null)
//   const phase2ContentRef = useRef<HTMLDivElement>(null)
//   const phase3ContentRef = useRef<HTMLDivElement>(null)
//   const card1Ref = useRef<HTMLDivElement>(null)
//   const card2Ref = useRef<HTMLDivElement>(null)
//   const card3Ref = useRef<HTMLDivElement>(null)
//   const card4Ref = useRef<HTMLDivElement>(null)
//   const progressBarRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     let gsap: any
//     let ScrollTrigger: any
//     let Lenis: any
//     let lenis: any
//     let ctx: any

//     const setup = async () => {
//       const g = await import('gsap')
//       const st = await import('gsap/ScrollTrigger')
//       gsap = g.gsap || g.default
//       ScrollTrigger = st.ScrollTrigger
//       gsap.registerPlugin(ScrollTrigger)

//       const lenisModule = await import('@studio-freight/lenis')
//       Lenis = lenisModule.default

//       lenis = new Lenis({
//         duration: 1.2,
//         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         smoothWheel: true,
//         smoothTouch: false,
//       })

//       function raf(time: number) {
//         lenis.raf(time)
//         requestAnimationFrame(raf)
//       }
//       requestAnimationFrame(raf)

//       lenis.on('scroll', ScrollTrigger.update)

//       ctx = gsap.context(() => {
//         // Continuous chakra rotation
//         gsap.to(chakraRef.current, {
//           rotation: 360,
//           duration: 20,
//           ease: 'none',
//           repeat: -1,
//         })

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: pinSectionRef.current,
//             start: 'top top',
//             end: '+=4000',
//             scrub: 1,
//             pin: true,
//             anticipatePin: 1,
//             onUpdate: (self: any) => {
//               if (progressBarRef.current) {
//                 gsap.to(progressBarRef.current, {
//                   scaleY: self.progress,
//                   duration: 0.12,
//                   ease: 'power1.out',
//                 })
//               }
//             },
//           },
//         })

//         // Initial states
//         gsap.set(phase2ContentRef.current, { autoAlpha: 0, x: 60 })
//         gsap.set(phase3ContentRef.current, { autoAlpha: 0, y: -30 })
//         gsap.set(
//           [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current],
//           { autoAlpha: 0, scale: 0.7 }
//         )

//         // ---- PHASE 1 -> PHASE 2 ----
//         // Image: go further left, keep SAME size as phase 1 (no scale change)
//         tl.to(
//           imageWrapperRef.current,
//           {
//             x: '-50vw',       // more left than before
//             y: 0,
//             scale: 1,         // keep original size
//             duration: 1.1,
//             ease: 'power2.inOut',
//           },
//           0
//         )
//           .to(
//             phase1ContentRef.current,
//             { autoAlpha: 0, x: -60, duration: 0.45, ease: 'power2.out' },
//             0.15
//           )
//           .to(
//             phase2ContentRef.current,
//             { autoAlpha: 1, x: 0, duration: 0.7, ease: 'power2.out' },
//             0.55
//           )

//         // ---- PHASE 2 -> PHASE 3 ----
//         // Image: move to CENTER and shrink slightly
//         tl.to(imageWrapperRef.current, {
//           x: 0,
//           y: '8vh',
//           scale: 0.8,           // slightly smaller in phase 3
//           duration: 1.1,
//           ease: 'power2.inOut',
//         })
//           .to(
//             phase2ContentRef.current,
//             { autoAlpha: 0, duration: 0.45, ease: 'power2.out' },
//             '<'
//           )
//           .to(
//             phase3ContentRef.current,
//             { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power2.out' },
//             '<+0.25'
//           )

//         // ---- PHASE 3: Cards appear around centered image ----
//         tl.to(
//           [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current],
//           { autoAlpha: 1, scale: 1, duration: 0.55, stagger: 0.1, ease: 'power2.out' }
//         )
//           // positions around the centered image (tuned)
//           .to(card1Ref.current, { x: -420, y: -180, duration: 0.8, ease: 'power3.out' }, '<+0.2')
//           .to(card2Ref.current, { x:  420, y: -180, duration: 0.8, ease: 'power3.out' }, '<')
//           .to(card3Ref.current, { x: -420, y:  180, duration: 0.8, ease: 'power3.out' }, '<')
//           .to(card4Ref.current, { x:  420, y:  180, duration: 0.8, ease: 'power3.out' }, '<')

//         // Subtle float loops
//         gsap.to(card1Ref.current, { y: '+=12', duration: 2,   yoyo: true, repeat: -1, ease: 'sine.inOut' })
//         gsap.to(card2Ref.current, { y: '+=15', duration: 2.3, yoyo: true, repeat: -1, ease: 'sine.inOut' })
//         gsap.to(card3Ref.current, { y: '+=18', duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut' })
//         gsap.to(card4Ref.current, { y: '+=14', duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
//       }, containerRef)
//     }

//     setup()

//     return () => {
//       ctx?.revert()
//       lenis?.destroy()
//     }
//   }, [])

//   return (
//     <div ref={containerRef} className="relative">
//       {/* Progress Bar (kept as-is) */}
//       <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
//         <div className="w-1 h-64 bg-white/20 rounded-full overflow-hidden">
//           <div
//             ref={progressBarRef}
//             className="w-full bg-gradient-to-b from-amber-200 to-purple-400 origin-top"
//             style={{ transform: 'scaleY(0)' }}
//           />
//         </div>
//       </div>

//       {/* Pinned Purple Section */}
//       <section
//         ref={pinSectionRef}
//         className="relative min-h-screen bg-purple-900 overflow-hidden mt-0"
//       >
//         <div className="relative h-screen flex items-center justify-center px-6 lg:px-12 max-w-7xl mx-auto">

//           {/* PHASE 1 — LEFT (unchanged) */}
//           <div
//             ref={phase1ContentRef}
//             className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-lg text-white z-20"
//           >
//             <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 font-serif">
//               HEAL. ALIGN.
//               <br />
//               AWAKEN.
//             </h1>
//             <p className="text-lg text-white/90 mb-8 leading-relaxed">
//               Your sanctuary for peace & holistic healing.
//             </p>
//             <button className="px-8 py-4 bg-amber-200 text-purple-900 font-semibold rounded-full hover:bg-amber-300 transition-all duration-300 shadow-lg">
//               Start your journey →
//             </button>
//             <div className="mt-12 space-y-3">
//               <div className="text-xl font-bold">100k Happy Customers</div>
//               <p className="text-white/80 leading-relaxed max-w-md">
//                 Chakra healing restores harmony, clarity, and emotional strength.
//               </p>
//             </div>
//           </div>

//           {/* PHASE 2 — RIGHT (bigger content; image same size) */}
//           <div
//             ref={phase2ContentRef}
//             className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-xl text-white z-20"
//           >
//             <h2 className="text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight">
//               Your Healing Journey
//             </h2>
//             <p className="text-xl text-white/90 mb-8 leading-relaxed">
//               Chakra means 'wheel of energy.' Guiding balance within mind, body, and spirit.
//             </p>
//             <div className="space-y-4 text-lg">
//               <div className="flex items-start gap-3">
//                 <span className="text-amber-200 text-2xl">✓</span>
//                 <p className="text-white/90">Restore harmony and inner peace</p>
//               </div>
//               <div className="flex items-start gap-3">
//                 <span className="text-amber-200 text-2xl">✓</span>
//                 <p className="text-white/90">Release stress and negative energy</p>
//               </div>
//               <div className="flex items-start gap-3">
//                 <span className="text-amber-200 text-2xl">✓</span>
//                 <p className="text-white/90">Awaken your true potential</p>
//               </div>
//             </div>
//           </div>

//           {/* PHASE 3 — TOP CENTER (single-line title) */}
//           <div
//             ref={phase3ContentRef}
//             className="absolute top-28 left-1/2 -translate-x-1/2 text-center text-white z-20 max-w-5xl px-6"
//           >
//             <h2 className="whitespace-nowrap text-4xl lg:text-5xl xl:text-5xl font-bold leading-none tracking-tight mb-4 font-serif">
//               HEAL. ALIGN. AWAKEN.
//             </h2>
//             <p className="text-lg lg:text-xl text-white/90 mb-4">
//               Your Sanctuary For Peace & Holistic Healing
//             </p>
//             <button className="px-8 py-2 bg-white text-purple-900 font-semibold rounded-full hover:bg-amber-200 transition-all duration-300">
//               Start your journey →
//             </button>
//           </div>

//           {/* IMAGE + CHAKRA (starts on right) */}
//           <div
//             ref={imageWrapperRef}
//             className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-[420px] h-[520px] lg:w-[480px] lg:h-[580px] z-10"
//           >
//             {/* Chakra (behind) */}
//             <div ref={chakraRef} className="absolute inset-0 flex items-center justify-center -z-10">
//               <Image
//                 src="/chakra.png"
//                 alt="Chakra"
//                 width={700}
//                 height={700}
//                 className="w-full h-full object-contain opacity-90"
//                 priority
//               />
//             </div>
//             {/* Girl */}
//             <div className="relative w-full h-full">
//               <Image src="/hero-img.png" alt="Meditation" fill className="object-contain" priority />
//             </div>
//           </div>

//           {/* CARDS — appear around centered image */}
//           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-5">
//             <div
//               ref={card1Ref}
//               className="absolute w-56 p-5 bg-purple-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700"
//             >
//               <h3 className="text-base font-bold text-white mb-2">What Is Chakra?</h3>
//               <p className="text-sm text-purple-100">
//                 Chakra means 'wheel of energy,' guiding balance within mind, body, and spirit.
//               </p>
//             </div>
//             <div
//               ref={card2Ref}
//               className="absolute w-56 p-5 bg-purple-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700"
//             >
//               <h3 className="text-base font-bold text-white mb-2">Why Chakra Healing?</h3>
//               <p className="text-sm text-purple-100">
//                 When chakras are aligned, stress fades and inner calm awakens.
//               </p>
//             </div>
//             <div
//               ref={card3Ref}
//               className="absolute w-56 p-5 bg-purple-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700"
//             >
//               <h3 className="text-base font-bold text-white mb-2">Your Healing Journey</h3>
//               <p className="text-sm text-purple-100">
//                 Chakra healing restores harmony, clarity, and emotional strength.
//               </p>
//             </div>
//             <div
//               ref={card4Ref}
//               className="absolute w-56 p-5 bg-purple-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700"
//             >
//               <h3 className="text-base font-bold text-white mb-2">The Power Of Balance</h3>
//               <p className="text-sm text-purple-100">
//                 Each chakra carries wisdom — from stability and love to awareness and peace.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


// 'use client'

// import React, { useEffect, useRef } from 'react'
// import Image from 'next/image'

// export default function ChakraHeroScroll() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const pinSectionRef = useRef<HTMLDivElement>(null)
//   const imageWrapperRef = useRef<HTMLDivElement>(null)
//   const chakraRef = useRef<HTMLDivElement>(null)
//   const phase1ContentRef = useRef<HTMLDivElement>(null)
//   const phase2ContentRef = useRef<HTMLDivElement>(null)
//   const phase3ContentRef = useRef<HTMLDivElement>(null)
//   const card1Ref = useRef<HTMLDivElement>(null)
//   const card2Ref = useRef<HTMLDivElement>(null)
//   const card3Ref = useRef<HTMLDivElement>(null)
//   const card4Ref = useRef<HTMLDivElement>(null)
//   const progressBarRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     let gsap: any
//     let ScrollTrigger: any
//     let Lenis: any
//     let lenis: any
//     let ctx: any

//     const setup = async () => {
//       const g = await import('gsap')
//       const st = await import('gsap/ScrollTrigger')
//       gsap = g.gsap || g.default
//       ScrollTrigger = st.ScrollTrigger
//       gsap.registerPlugin(ScrollTrigger)

//       const lenisModule = await import('@studio-freight/lenis')
//       Lenis = lenisModule.default

//       lenis = new Lenis({
//         duration: 1.2,
//         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         smoothWheel: true,
//         smoothTouch: false,
//       })

//       const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
//       requestAnimationFrame(raf)
//       lenis.on('scroll', ScrollTrigger.update)

//       ctx = gsap.context(() => {
//         // Chakra rotation
//         gsap.to(chakraRef.current, { rotation: 360, duration: 20, ease: 'none', repeat: -1 })

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: pinSectionRef.current,
//             start: 'top top',
//             end: '+=4000',
//             scrub: 1,
//             pin: true,
//             anticipatePin: 1,
//             onUpdate: (self: any) => {
//               if (progressBarRef.current) {
//                 gsap.to(progressBarRef.current, {
//                   scaleY: self.progress,
//                   duration: 0.12,
//                   ease: 'power1.out',
//                 })
//               }
//             },
//           },
//         })

//         // Initial states
//         gsap.set(phase2ContentRef.current, { autoAlpha: 0, x: 60 })
//         gsap.set(phase3ContentRef.current, { autoAlpha: 0, y: -30 })
//         gsap.set([card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current],
//           { autoAlpha: 0, scale: 0.7 })

//         // PHASE 1 -> PHASE 2 (unchanged – phase 2 is perfect)
//         tl.to(imageWrapperRef.current, {
//           x: '-50vw', // further left
//           y: 0,
//           scale: 1,   // keep same size as phase 1
//           duration: 1.1,
//           ease: 'power2.inOut',
//         }, 0)
//           .to(phase1ContentRef.current, { autoAlpha: 0, x: -60, duration: 0.45, ease: 'power2.out' }, 0.15)
//           .to(phase2ContentRef.current, { autoAlpha: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 0.55)

//         // —— PHASE 2 -> PHASE 3 (center the image under the CTA) ——
//         // Re-anchor from "right: 0" to "left: 50%" ONLY for phase 3 so we can truly center it.
//         tl.set(imageWrapperRef.current, { right: 'auto', left: '50%', xPercent: -50 }, '>')
//           .to(imageWrapperRef.current, {
//             x: 0,            // now measured from the 50% center anchor
//             y: '8vh',
//             scale: 0.8,      // slightly smaller
//             duration: 1.1,
//             ease: 'power2.inOut',
//           }, '<')
//           .to(phase2ContentRef.current, { autoAlpha: 0, duration: 0.45, ease: 'power2.out' }, '<')
//           .to(phase3ContentRef.current, { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '<+0.25')

//         // Cards appear around the centered image
//         tl.to([card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current],
//           { autoAlpha: 1, scale: 1, duration: 0.55, stagger: 0.1, ease: 'power2.out' })
//           .to(card1Ref.current, { x: -420, y: -180, duration: 0.8, ease: 'power3.out' }, '<+0.2')
//           .to(card2Ref.current, { x:  420, y: -180, duration: 0.8, ease: 'power3.out' }, '<')
//           .to(card3Ref.current, { x: -420, y:  180, duration: 0.8, ease: 'power3.out' }, '<')
//           .to(card4Ref.current, { x:  420, y:  180, duration: 0.8, ease: 'power3.out' }, '<')

//         // subtle float
//         gsap.to(card1Ref.current, { y: '+=12', duration: 2.0, yoyo: true, repeat: -1, ease: 'sine.inOut' })
//         gsap.to(card2Ref.current, { y: '+=15', duration: 2.3, yoyo: true, repeat: -1, ease: 'sine.inOut' })
//         gsap.to(card3Ref.current, { y: '+=18', duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut' })
//         gsap.to(card4Ref.current, { y: '+=14', duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
//       }, containerRef)
//     }

//     setup()
//     return () => { ctx?.revert(); lenis?.destroy() }
//   }, [])

//   return (
//     <div ref={containerRef} className="relative">
//       {/* Progress Bar */}
//       <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
//         <div className="w-1 h-64 bg-white/20 rounded-full overflow-hidden">
//           <div
//             ref={progressBarRef}
//             className="w-full bg-gradient-to-b from-amber-200 to-purple-400 origin-top"
//             style={{ transform: 'scaleY(0)' }}
//           />
//         </div>
//       </div>

//       {/* Pinned Purple Section */}
//       <section
//         ref={pinSectionRef}
//         className="relative min-h-screen bg-purple-900 overflow-hidden mt-10"  
//       >
//         <div className="relative h-screen flex items-center justify-center px-6 lg:px-12 max-w-7xl mx-auto">

//           {/* PHASE 1 (unchanged) */}
//           <div
//             ref={phase1ContentRef}
//             className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-lg text-white z-20"
//           >
//             <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 font-serif">
//               HEAL. ALIGN.
//               <br />
//               AWAKEN.
//             </h1>
//             <p className="text-lg text-white/90 mb-8 leading-relaxed">
//               Your sanctuary for peace & holistic healing.
//             </p>
//             <button className="px-8 py-4 bg-amber-200 text-purple-900 font-semibold rounded-full hover:bg-amber-300 transition-all duration-300 shadow-lg">
//               Start your journey →
//             </button>
//             <div className="mt-12 space-y-3">
//               <div className="text-xl font-bold">100k Happy Customers</div>
//               <p className="text-white/80 leading-relaxed max-w-md">
//                 Chakra healing restores harmony, clarity, and emotional strength.
//               </p>
//             </div>
//           </div>

//           {/* PHASE 2 (bigger content, kept as you liked) */}
//           <div
//             ref={phase2ContentRef}
//             className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-xl text-white z-20"
//           >
//             <h2 className="text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight">
//               Your Healing Journey
//             </h2>
//             <p className="text-xl text-white/90 mb-8 leading-relaxed">
//               Chakra means 'wheel of energy.' Guiding balance within mind, body, and spirit.
//             </p>
//             <div className="space-y-4 text-lg">
//               <div className="flex items-start gap-3"><span className="text-amber-200 text-2xl">✓</span><p className="text-white/90">Restore harmony and inner peace</p></div>
//               <div className="flex items-start gap-3"><span className="text-amber-200 text-2xl">✓</span><p className="text-white/90">Release stress and negative energy</p></div>
//               <div className="flex items-start gap-3"><span className="text-amber-200 text-2xl">✓</span><p className="text-white/90">Awaken your true potential</p></div>
//             </div>
//           </div>

//           {/* PHASE 3 — Top Center; single-line title; image sits directly beneath CTA */}
//           <div
//             ref={phase3ContentRef}
//             className="absolute top-20 left-1/2 -translate-x-1/2 text-center text-white z-20 max-w-5xl px-6"
//           >
//             <h2 className="whitespace-nowrap text-5xl lg:text-6xl xl:text-7xl font-bold leading-none tracking-tight mb-4 font-serif">
//               HEAL. ALIGN. AWAKEN.
//             </h2>
//             <p className="text-lg lg:text-xl text-white/90 mb-6">
//               Your Sanctuary For Peace & Holistic Healing
//             </p>
//             <button className="px-8 py-3 bg-white text-purple-900 font-semibold rounded-full hover:bg-amber-200 transition-all duration-300">
//               Start your journey →
//             </button>
//           </div>

//           {/* IMAGE + CHAKRA (starts on right; re-anchored to center in phase 3) */}
//           <div
//             ref={imageWrapperRef}
//             className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-[420px] h-[520px] lg:w-[480px] lg:h-[580px] z-10"
//           >
//             <div ref={chakraRef} className="absolute inset-0 flex items-center justify-center -z-10">
//               <Image src="/chakra.png" alt="Chakra" width={700} height={700} className="w-full h-full object-contain opacity-90" priority />
//             </div>
//             <div className="relative w-full h-full">
//               <Image src="/hero-img.png" alt="Meditation" fill className="object-contain" priority />
//             </div>
//           </div>

//           {/* CARDS (unchanged) */}
//           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-5">
//             <div ref={card1Ref} className="absolute w-56 p-5 bg-purple-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700">
//               <h3 className="text-base font-bold text-white mb-2">What Is Chakra?</h3>
//               <p className="text-sm text-purple-100">Chakra means 'wheel of energy,' guiding balance within mind, body, and spirit.</p>
//             </div>
//             <div ref={card2Ref} className="absolute w-56 p-5 bg-purple-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700">
//               <h3 className="text-base font-bold text-white mb-2">Why Chakra Healing?</h3>
//               <p className="text-sm text-purple-100">When chakras are aligned, stress fades and inner calm awakens.</p>
//             </div>
//             <div ref={card3Ref} className="absolute w-56 p-5 bg-purple-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700">
//               <h3 className="text-base font-bold text-white mb-2">Your Healing Journey</h3>
//               <p className="text-sm text-purple-100">Chakra healing restores harmony, clarity, and emotional strength.</p>
//             </div>
//             <div ref={card4Ref} className="absolute w-56 p-5 bg-purple-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700">
//               <h3 className="text-base font-bold text-white mb-2">The Power Of Balance</h3>
//               <p className="text-sm text-purple-100">Each chakra carries wisdom — from stability and love to awareness and peace.</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


// 'use client'

// import React, { useEffect, useRef } from 'react'
// import Image from 'next/image'

// export default function ChakraHeroScroll() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const pinSectionRef = useRef<HTMLDivElement>(null)
//   const imageWrapperRef = useRef<HTMLDivElement>(null)
//   const chakraRef = useRef<HTMLDivElement>(null)
//   const phase1ContentRef = useRef<HTMLDivElement>(null)
//   const phase2ContentRef = useRef<HTMLDivElement>(null)
//   const phase3ContentRef = useRef<HTMLDivElement>(null)
//   const card1Ref = useRef<HTMLDivElement>(null)
//   const card2Ref = useRef<HTMLDivElement>(null)
//   const card3Ref = useRef<HTMLDivElement>(null)
//   const card4Ref = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     let gsap: any
//     let ScrollTrigger: any
//     let Lenis: any
//     let lenis: any
//     let ctx: any

//     const setup = async () => {
//       const g = await import('gsap')
//       const st = await import('gsap/ScrollTrigger')
//       gsap = g.gsap || g.default
//       ScrollTrigger = st.ScrollTrigger
//       gsap.registerPlugin(ScrollTrigger)

//       const lenisModule = await import('@studio-freight/lenis')
//       Lenis = lenisModule.default

//       lenis = new Lenis({
//         duration: 1.2,
//         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         smoothWheel: true,
//         smoothTouch: false,
//       })

//       function raf(time: number) {
//         lenis.raf(time)
//         requestAnimationFrame(raf)
//       }
//       requestAnimationFrame(raf)

//       lenis.on('scroll', ScrollTrigger.update)

//       ctx = gsap.context(() => {
//         // Continuous chakra rotation - smooth and mesmerizing
//         gsap.to(chakraRef.current, {
//           rotation: 360,
//           duration: 20,
//           ease: 'none',
//           repeat: -1,
//         })

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: pinSectionRef.current,
//             start: 'top top',
//             end: '+=4000',
//             scrub: 1,
//             pin: true,
//             anticipatePin: 1,
//             onUpdate: (self: any) => {
//               // Update phase dots dynamically
//               const dots = document.querySelectorAll('[data-phase]')
//               const progress = self.progress
              
//               if (progress < 0.33) {
//                 // Phase 1
//                 dots.forEach((dot, i) => {
//                   if (i === 0) {
//                     dot.classList.add('!bg-amber-300', '!w-4', '!h-4', '!shadow-lg', '!shadow-amber-300/50')
//                     dot.classList.remove('!bg-white/30')
//                   } else {
//                     dot.classList.remove('!bg-amber-300', '!w-4', '!h-4', '!shadow-lg', '!shadow-amber-300/50')
//                     dot.classList.add('!bg-white/30')
//                   }
//                 })
//               } else if (progress < 0.66) {
//                 // Phase 2
//                 dots.forEach((dot, i) => {
//                   if (i === 1) {
//                     dot.classList.add('!bg-amber-300', '!w-4', '!h-4', '!shadow-lg', '!shadow-amber-300/50')
//                     dot.classList.remove('!bg-white/30')
//                   } else {
//                     dot.classList.remove('!bg-amber-300', '!w-4', '!h-4', '!shadow-lg', '!shadow-amber-300/50')
//                     dot.classList.add('!bg-white/30')
//                   }
//                 })
//               } else {
//                 // Phase 3
//                 dots.forEach((dot, i) => {
//                   if (i === 2) {
//                     dot.classList.add('!bg-amber-300', '!w-4', '!h-4', '!shadow-lg', '!shadow-amber-300/50')
//                     dot.classList.remove('!bg-white/30')
//                   } else {
//                     dot.classList.remove('!bg-amber-300', '!w-4', '!h-4', '!shadow-lg', '!shadow-amber-300/50')
//                     dot.classList.add('!bg-white/30')
//                   }
//                 })
//               }
              
//               // Hide dots after section ends
//               const dotsContainer = document.querySelector('[data-phase-container]')
//               if (dotsContainer) {
//                 if (progress >= 0.98) {
//                   gsap.to(dotsContainer, { autoAlpha: 0, duration: 0.3 })
//                 } else {
//                   gsap.to(dotsContainer, { autoAlpha: 1, duration: 0.3 })
//                 }
//               }
//             },
//           },
//         })

//         // Initial states - everything hidden except phase 1
//         gsap.set(phase2ContentRef.current, { autoAlpha: 0, x: 60 })
//         gsap.set(phase3ContentRef.current, { autoAlpha: 0, y: -30 })
        
//         // Set cards at their final positions from the start
//         gsap.set(card1Ref.current, { autoAlpha: 0, scale: 1, x: -580, y: -240 })
//         gsap.set(card2Ref.current, { autoAlpha: 0, scale: 1, x: 580, y: -240 })
//         gsap.set(card3Ref.current, { autoAlpha: 0, scale: 1, x: -580, y: 280 })
//         gsap.set(card4Ref.current, { autoAlpha: 0, scale: 1, x: 580, y: 280 })

//         // =======================================
//         // PHASE 1 -> PHASE 2 TRANSITION
//         // =======================================
//         // Image moves left and maintains original size
//         tl.to(
//           imageWrapperRef.current,
//           {
//             x: '-48vw',
//             y: 0,
//             scale: 1,
//             duration: 1.2,
//             ease: 'power2.inOut',
//           },
//           0
//         )
//           .to(
//             phase1ContentRef.current,
//             { autoAlpha: 0, x: -60, duration: 0.5, ease: 'power2.out' },
//             0.15
//           )
//           .to(
//             phase2ContentRef.current,
//             { autoAlpha: 1, x: 0, duration: 0.75, ease: 'power2.out' },
//             0.6
//           )

//         // =======================================
//         // PHASE 2 -> PHASE 3 TRANSITION
//         // =======================================
//         // Image moves from LEFT to CENTER-BOTTOM smoothly
//         tl.to(imageWrapperRef.current, {
//           x: '0vw',           // Center horizontally
//           y: '25vh',          // Position in lower center area
//           scale: 0.68,        // Slightly smaller for phase 3
//           duration: 1.2,
//           ease: 'power2.inOut',
//         })
//           .to(
//             phase2ContentRef.current,
//             { autoAlpha: 0, x: 60, duration: 0.5, ease: 'power2.out' },
//             '<'
//           )
//           .to(
//             phase3ContentRef.current,
//             { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
//             '<+0.3'
//           )

//         // =======================================
//         // PHASE 3: CARDS FADE IN AT POSITIONS (NO EMERGE/FLOAT)
//         // =======================================
//         // Cards fade in directly at their corner positions
//         tl.to(
//           [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current],
//           { 
//             autoAlpha: 1, 
//             scale: 1, 
//             duration: 0.8, 
//             stagger: 0.12, 
//             ease: 'power2.out' 
//           },
//           '>'
//         )

//         // Floating animation for cards - subtle and elegant
//         gsap.to(card1Ref.current, { 
//           y: '+=15', 
//           duration: 2.5, 
//           yoyo: true, 
//           repeat: -1, 
//           ease: 'sine.inOut',
//           delay: 0 
//         })
//         gsap.to(card2Ref.current, { 
//           y: '+=18', 
//           duration: 2.8, 
//           yoyo: true, 
//           repeat: -1, 
//           ease: 'sine.inOut',
//           delay: 0.2 
//         })
//         gsap.to(card3Ref.current, { 
//           y: '+=20', 
//           duration: 3.1, 
//           yoyo: true, 
//           repeat: -1, 
//           ease: 'sine.inOut',
//           delay: 0.4 
//         })
//         gsap.to(card4Ref.current, { 
//           y: '+=16', 
//           duration: 2.6, 
//           yoyo: true, 
//           repeat: -1, 
//           ease: 'sine.inOut',
//           delay: 0.6 
//         })
//       }, containerRef)
//     }

//     setup()

//     return () => {
//       ctx?.revert()
//       lenis?.destroy()
//     }
//   }, [])

//   return (
//     <div ref={containerRef} className="relative">
//       {/* Phase Indicator - 3 Elegant Dots */}
//       <div 
//         data-phase-container
//         className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-5"
//       >
//         <div 
//           data-phase="1" 
//           className="w-3 h-3 rounded-full bg-white/30 transition-all duration-500 ease-out"
//         />
//         <div 
//           data-phase="2" 
//           className="w-3 h-3 rounded-full bg-white/30 transition-all duration-500 ease-out"
//         />
//         <div 
//           data-phase="3" 
//           className="w-3 h-3 rounded-full bg-white/30 transition-all duration-500 ease-out"
//         />
//       </div>

//       {/* Pinned Purple Section */}
//       <section
//         ref={pinSectionRef}
//         className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 overflow-hidden"
//       >
//         <div className="relative h-screen flex items-center justify-center px-6 lg:px-12 max-w-7xl mx-auto">

//           {/* =======================================
//               PHASE 1 — LEFT CONTENT
//           ======================================= */}
//           <div
//             ref={phase1ContentRef}
//             className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-lg text-white z-20"
//           >
//             <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 font-serif bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
//               HEAL. ALIGN.
//               <br />
//               AWAKEN.
//             </h1>
//             <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
//               Your sanctuary for peace & holistic healing.
//             </p>
//             <button className="px-8 py-4 bg-gradient-to-r from-amber-200 to-amber-300 text-purple-900 font-semibold rounded-full hover:from-amber-300 hover:to-amber-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-300/30 transform hover:scale-105">
//               Start your journey →
//             </button>
//             <div className="mt-12 space-y-3">
//               <div className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
//                 100k Happy Customers
//               </div>
//               <p className="text-white/80 leading-relaxed max-w-md text-base">
//                 Chakra healing restores harmony, clarity, and emotional strength.
//               </p>
//             </div>
//           </div>

//           {/* =======================================
//               PHASE 2 — RIGHT CONTENT
//           ======================================= */}
//           <div
//             ref={phase2ContentRef}
//             className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-xl text-white z-20"
//           >
//             <h2 className="text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
//               Your Healing Journey
//             </h2>
//             <p className="text-xl text-white/90 mb-8 leading-relaxed">
//               Chakra means 'wheel of energy.' Guiding balance within mind, body, and spirit.
//             </p>
//             <div className="space-y-5 text-lg">
//               <div className="flex items-start gap-4 group">
//                 <span className="text-amber-300 text-2xl transform group-hover:scale-110 transition-transform duration-300">✓</span>
//                 <p className="text-white/90">Restore harmony and inner peace</p>
//               </div>
//               <div className="flex items-start gap-4 group">
//                 <span className="text-amber-300 text-2xl transform group-hover:scale-110 transition-transform duration-300">✓</span>
//                 <p className="text-white/90">Release stress and negative energy</p>
//               </div>
//               <div className="flex items-start gap-4 group">
//                 <span className="text-amber-300 text-2xl transform group-hover:scale-110 transition-transform duration-300">✓</span>
//                 <p className="text-white/90">Awaken your true potential</p>
//               </div>
//             </div>
//           </div>

//           {/* =======================================
//               PHASE 3 — TOP CENTER CONTENT
//           ======================================= */}
//           <div
//             ref={phase3ContentRef}
//             className="absolute top-24 lg:top-28 left-1/2 -translate-x-1/2 text-center text-white z-20 max-w-6xl px-6"
//           >
//             <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-none tracking-tight mb-3 font-serif bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent whitespace-nowrap">
//               HEAL. ALIGN. AWAKEN.
//             </h2>
//             <p className="text-base lg:text-xl text-white/90 mb-5">
//               Your Sanctuary For Peace & Holistic Healing
//             </p>
//             <button className="px-10 py-3 bg-gradient-to-r from-white to-amber-100 text-purple-900 font-bold rounded-full hover:from-amber-200 hover:to-amber-300 transition-all duration-300 shadow-2xl hover:shadow-amber-300/40 transform hover:scale-105">
//               Start your journey →
//             </button>
//           </div>

//           {/* =======================================
//               IMAGE + CHAKRA (Dynamic Positioning)
//           ======================================= */}
//           <div
//             ref={imageWrapperRef}
//             className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-[360px] h-[450px] lg:w-[400px] lg:h-[500px] z-10"
//           >
//             {/* Rotating Chakra Background */}
//             <div ref={chakraRef} className="absolute inset-0 flex items-center justify-center -z-10">
//               <Image
//                 src="/chakra.png"
//                 alt="Chakra"
//                 width={750}
//                 height={750}
//                 className="w-full h-full object-contain opacity-80"
//                 priority
//               />
//             </div>
//             {/* Meditation Girl Image */}
//             <div className="relative w-full h-full">
//               <Image 
//                 src="/hero-img.png" 
//                 alt="Meditation" 
//                 fill 
//                 className="object-contain drop-shadow-2xl" 
//                 priority 
//               />
//             </div>
//           </div>

//           {/* =======================================
//               PHASE 3 CARDS - EMERGE FROM CENTER
//           ======================================= */}
//           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-5">
//             {/* Card 1 - Top Left */}
//             <div
//               ref={card1Ref}
//               className="absolute w-72 p-6 bg-gradient-to-br from-purple-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-600/40 hover:border-amber-300/60 hover:shadow-amber-300/20 transition-all duration-300 hover:scale-105"
//             >
//               <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
//                 What Is Chakra?
//               </h3>
//               <p className="text-sm text-purple-100 leading-relaxed">
//                 Chakra means 'wheel of energy,' guiding balance within mind, body, and spirit.
//               </p>
//             </div>

//             {/* Card 2 - Top Right */}
//             <div
//               ref={card2Ref}
//               className="absolute w-72 p-6 bg-gradient-to-br from-purple-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-600/40 hover:border-amber-300/60 hover:shadow-amber-300/20 transition-all duration-300 hover:scale-105"
//             >
//               <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
//                 Why Chakra Healing?
//               </h3>
//               <p className="text-sm text-purple-100 leading-relaxed">
//                 When chakras are aligned, stress fades and inner calm awakens.
//               </p>
//             </div>

//             {/* Card 3 - Bottom Left */}
//             <div
//               ref={card3Ref}
//               className="absolute w-72 p-6 bg-gradient-to-br from-purple-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-600/40 hover:border-amber-300/60 hover:shadow-amber-300/20 transition-all duration-300 hover:scale-105"
//             >
//               <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
//                 Your Healing Journey
//               </h3>
//               <p className="text-sm text-purple-100 leading-relaxed">
//                 Chakra healing restores harmony, clarity, and emotional strength.
//               </p>
//             </div>

//             {/* Card 4 - Bottom Right */}
//             <div
//               ref={card4Ref}
//               className="absolute w-72 p-6 bg-gradient-to-br from-purple-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-600/40 hover:border-amber-300/60 hover:shadow-amber-300/20 transition-all duration-300 hover:scale-105"
//             >
//               <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
//                 The Power Of Balance
//               </h3>
//               <p className="text-sm text-purple-100 leading-relaxed">
//                 Each chakra carries wisdom — from stability and love to awareness and peace.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }



//same code but with some updates,fixed some allignments,fix the phase 3 floating cards, images.



'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function ChakraHeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinSectionRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const chakraRef = useRef<HTMLDivElement>(null)
  const phase1ContentRef = useRef<HTMLDivElement>(null)
  const phase2ContentRef = useRef<HTMLDivElement>(null)
  const phase3ContentRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const card4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let gsap: any
    let ScrollTrigger: any
    let Lenis: any
    let lenis: any
    let ctx: any

    const setup = async () => {
      const g = await import('gsap')
      const st = await import('gsap/ScrollTrigger')
      gsap = g.gsap || g.default
      ScrollTrigger = st.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      const lenisModule = await import('@studio-freight/lenis')
      Lenis = lenisModule.default

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      lenis.on('scroll', ScrollTrigger.update)

      ctx = gsap.context(() => {
        // Continuous chakra rotation - smooth and mesmerizing
        gsap.to(chakraRef.current, {
          rotation: 360,
          duration: 20,
          ease: 'none',
          repeat: -1,
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: 'top top',
            end: '+=4000',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self: any) => {
              // Update phase dots dynamically
              const dots = document.querySelectorAll('[data-phase]')
              const progress = self.progress
              
              if (progress < 0.33) {
                // Phase 1
                dots.forEach((dot, i) => {
                  if (i === 0) {
                    dot.classList.add('!bg-amber-300', '!w-4', '!h-4', '!shadow-lg', '!shadow-amber-300/50')
                    dot.classList.remove('!bg-white/30')
                  } else {
                    dot.classList.remove('!bg-amber-300', '!w-4', '!h-4', '!shadow-lg', '!shadow-amber-300/50')
                    dot.classList.add('!bg-white/30')
                  }
                })
              } else if (progress < 0.66) {
                // Phase 2
                dots.forEach((dot, i) => {
                  if (i === 1) {
                    dot.classList.add('!bg-amber-300', '!w-4', '!h-4', '!shadow-lg', '!shadow-amber-300/50')
                    dot.classList.remove('!bg-white/30')
                  } else {
                    dot.classList.remove('!bg-amber-300', '!w-4', '!h-4', '!shadow-lg', '!shadow-amber-300/50')
                    dot.classList.add('!bg-white/30')
                  }
                })
              } else {
                // Phase 3
                dots.forEach((dot, i) => {
                  if (i === 2) {
                    dot.classList.add('!bg-amber-300', '!w-4', '!h-4', '!shadow-lg', '!shadow-amber-300/50')
                    dot.classList.remove('!bg-white/30')
                  } else {
                    dot.classList.remove('!bg-amber-300', '!w-4', '!h-4', '!shadow-lg', '!shadow-amber-300/50')
                    dot.classList.add('!bg-white/30')
                  }
                })
              }
              
              // Hide dots after section ends
              const dotsContainer = document.querySelector('[data-phase-container]')
              if (dotsContainer) {
                if (progress >= 0.98) {
                  gsap.to(dotsContainer, { autoAlpha: 0, duration: 0.3 })
                } else {
                  gsap.to(dotsContainer, { autoAlpha: 1, duration: 0.3 })
                }
              }
            },
          },
        })

        // Initial states - everything hidden except phase 1
        gsap.set(phase2ContentRef.current, { autoAlpha: 0, x: 60 })
        gsap.set(phase3ContentRef.current, { autoAlpha: 0, y: -30 })
        
        // Set cards at their final positions from the start
        gsap.set(card1Ref.current, { autoAlpha: 0, scale: 1, x: -580, y: -240 })
        gsap.set(card2Ref.current, { autoAlpha: 0, scale: 1, x: 240, y: -240 })
        gsap.set(card3Ref.current, { autoAlpha: 0, scale: 1, x: -580, y: 280 })
        gsap.set(card4Ref.current, { autoAlpha: 0, scale: 1, x: 240, y: 280 })

        // =======================================
        // PHASE 1 -> PHASE 2 TRANSITION
        // =======================================
        // Image moves left and maintains original size
        tl.to(
          imageWrapperRef.current,
          {
            x: '-48vw',
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power2.inOut',
          },
          0
        )
          .to(
            phase1ContentRef.current,
            { autoAlpha: 0, x: -60, duration: 0.5, ease: 'power2.out' },
            0.15
          )
          .to(
            phase2ContentRef.current,
            { autoAlpha: 1, x: 0, duration: 0.75, ease: 'power2.out' },
            0.6
          )

        // =======================================
        // PHASE 2 -> PHASE 3 TRANSITION
        // =======================================
        // Image moves from LEFT to CENTER-BOTTOM smoothly
        tl.to(imageWrapperRef.current, {
          x: '-26vw',           // Center horizontally
          y: '12vh',          // Position in lower center area
          scale: 0.68,        // Slightly smaller for phase 3
          duration: 1.2,
          ease: 'power2.inOut',
        })
          .to(
            phase2ContentRef.current,
            { autoAlpha: 0, x: 60, duration: 0.5, ease: 'power2.out' },
            '<'
          )
          .to(
            phase3ContentRef.current,
            { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
            '<-0.3'
          )

        // =======================================
        // PHASE 3: CARDS FADE IN AT POSITIONS (NO EMERGE/FLOAT)
        // =======================================
        // Cards fade in directly at their corner positions
        tl.to(
          [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current],
          { 
            autoAlpha: 1, 
            scale: 1, 
            duration: 0.8, 
            stagger: 0.12, 
            ease: 'power2.out' 
          },
          '>'
        )

        // Floating animation for cards - subtle and elegant
        gsap.to(card1Ref.current, { 
          y: '-90', 

          duration: 2.5, 
          yoyo: true, 
          repeat: -1, 
          ease: 'sine.inOut',
          delay: 0.2
        })
        gsap.to(card2Ref.current, { 
          y: '-90', 
          duration: 2.5, 
          yoyo: true, 
          // x:'200',
          repeat: -1, 
          ease: 'sine.inOut',
          delay: 0.4 
        })
        gsap.to(card3Ref.current, { 
          y: '150', 
          duration: 2.5, 
          yoyo: true, 
          repeat: -1, 
          ease: 'sine.inOut',
          delay: 0.6 
        })
        gsap.to(card4Ref.current, { 
          y: '130', 
          // x:'200',
          duration: 2.5, 
          yoyo: true, 
          repeat: -1, 
          ease: 'sine.inOut',
          delay: 0.8 
        })
      }, containerRef)
    }

    setup()

    return () => {
      ctx?.revert()
      lenis?.destroy()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Phase Indicator - 3 Elegant Dots */}
      <div 
        data-phase-container
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-5"
      >
        <div 
          data-phase="1" 
          className="w-3 h-3 rounded-full bg-white/30 transition-all duration-500 ease-out"
        />
        <div 
          data-phase="2" 
          className="w-3 h-3 rounded-full bg-white/30 transition-all duration-500 ease-out"
        />
        <div 
          data-phase="3" 
          className="w-3 h-3 rounded-full bg-white/30 transition-all duration-500 ease-out"
        />
      </div>

      {/* Pinned Purple Section */}
      <section
        ref={pinSectionRef}
        className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 overflow-hidden"
      >
        <div className="relative h-screen flex items-center justify-center px-6 lg:px-12 max-w-7xl mx-auto">

          {/* =======================================
              PHASE 1 — LEFT CONTENT
          ======================================= */}
          <div
            ref={phase1ContentRef}
            className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-lg text-white z-20"
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 font-serif bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
              HEAL. ALIGN.
              <br />
              AWAKEN.
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
              Your sanctuary for peace & holistic healing.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-amber-200 to-amber-300 text-purple-900 font-semibold rounded-full hover:from-amber-300 hover:to-amber-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-300/30 transform hover:scale-105">
              Start your journey →
            </button>
            <div className="mt-12 space-y-3">
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                100k Happy Customers
              </div>
              <p className="text-white/80 leading-relaxed max-w-md text-base">
                Chakra healing restores harmony, clarity, and emotional strength.
              </p>
            </div>
          </div>

          {/* =======================================
              PHASE 2 — RIGHT CONTENT
          ======================================= */}
          <div
            ref={phase2ContentRef}
            className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-xl text-white z-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
              Your Healing Journey
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Chakra means 'wheel of energy.' Guiding balance within mind, body, and spirit.
            </p>
            <div className="space-y-5 text-lg">
              <div className="flex items-start gap-4 group">
                <span className="text-amber-300 text-2xl transform group-hover:scale-110 transition-transform duration-300">✓</span>
                <p className="text-white/90">Restore harmony and inner peace</p>
              </div>
              <div className="flex items-start gap-4 group">
                <span className="text-amber-300 text-2xl transform group-hover:scale-110 transition-transform duration-300">✓</span>
                <p className="text-white/90">Release stress and negative energy</p>
              </div>
              <div className="flex items-start gap-4 group">
                <span className="text-amber-300 text-2xl transform group-hover:scale-110 transition-transform duration-300">✓</span>
                <p className="text-white/90">Awaken your true potential</p>
              </div>
            </div>
          </div>

          {/* =======================================
              PHASE 3 — TOP CENTER CONTENT
          ======================================= */}
          <div
            ref={phase3ContentRef}
            className="absolute top-24 lg:top-28 left-1/2 -translate-x-1/2 text-center text-white z-20 max-w-6xl px-6"
          >
            <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-none tracking-tight mb-3 font-serif bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent whitespace-nowrap">
              HEAL. ALIGN. AWAKEN.
            </h2>
            <p className="text-base lg:text-xl text-white/90 mb-5">
              Your Sanctuary For Peace & Holistic Healing
            </p>
            <button className="px-10 py-3 bg-gradient-to-r from-white to-amber-100 text-purple-900 font-bold rounded-full hover:from-amber-200 hover:to-amber-300 transition-all duration-300 shadow-2xl hover:shadow-amber-300/40 transform hover:scale-105">
              Start your journey →
            </button>
          </div>

          {/* =======================================
              IMAGE + CHAKRA (Dynamic Positioning)
          ======================================= */}
          
          <div
            ref={imageWrapperRef}
            className="absolute right-0 lg:right-10 top-1/2   -translate-y-1/2 w-[360px] h-[450px] lg:w-[400px] lg:h-[500px] z-10"
          >
            {/* Rotating Chakra Background */}
            <div ref={chakraRef} className="absolute inset-0 flex items-center justify-center -z-10">
              <Image
                src="/chakra.png"
                alt="Chakra"
                width={750}
                height={750}
                className="w-full h-full object-contain opacity-80"
                priority
              />
            </div>
            {/* Meditation Girl Image */}
            <div className="relative w-full h-full">
              <Image 
                src="/hero-img.png" 
                alt="Meditation" 
                fill 
                className="object-contain drop-shadow-2xl" 
                priority 
              />
            </div>
          </div>

          {/* =======================================
              PHASE 3 CARDS - EMERGE FROM CENTER
          ======================================= */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-5">
            {/* Card 1 - Top Left */}
            <div
              ref={card1Ref}
              className="absolute w-72 p-6 bg-gradient-to-br from-purple-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-600/40 hover:border-amber-300/60 hover:shadow-amber-300/20 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                What Is Chakra?
              </h3>
              <p className="text-sm text-purple-100 leading-relaxed">
                Chakra means 'wheel of energy,' guiding balance within mind, body, and spirit.
              </p>
            </div>

            {/* Card 2 - Top Right */}
            <div
              ref={card2Ref}
              className="absolute w-72 p-6 bg-gradient-to-br from-purple-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-600/40 hover:border-amber-300/60 hover:shadow-amber-300/20 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Why Chakra Healing?
              </h3>
              <p className="text-sm text-purple-100 leading-relaxed">
                When chakras are aligned, stress fades and inner calm awakens.
              </p>
            </div>

            {/* Card 3 - Bottom Left */}
            <div
              ref={card3Ref}
              className="absolute w-72 p-6 bg-gradient-to-br from-purple-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-600/40 hover:border-amber-300/60 hover:shadow-amber-300/20 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Your Healing Journey
              </h3>
              <p className="text-sm text-purple-100 leading-relaxed">
                Chakra healing restores harmony, clarity, and emotional strength.
              </p>
            </div>

            {/* Card 4 - Bottom Right */}
            <div
              ref={card4Ref}
              className="absolute w-72 p-6 bg-gradient-to-br from-purple-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-600/40 hover:border-amber-300/60 hover:shadow-amber-300/20 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                The Power Of Balance
              </h3>
              <p className="text-sm text-purple-100 leading-relaxed">
                Each chakra carries wisdom — from stability and love to awareness and peace.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}