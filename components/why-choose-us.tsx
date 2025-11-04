// "use client"
// import { useRef } from "react"
// import { cn } from "@/lib/utils"

// const cards = [
//   { title: "Holistic Healing", desc: "We nurture mind, body, and spirit to restore true balance and peace." },
//   { title: "Excellence in Care", desc: "Every therapy is delivered with precision, warmth, and professionalism." },
//   { title: "Empathy & Personalization", desc: "We listen deeply and create solutions tailored to your needs." },
//   {
//     title: "Global Therapies, Local Comfort",
//     desc: "Experience Ayurvedic, Thai, Shiatsu, and energy healing in Gurgaon.",
//   },
//   { title: "Calming Environment", desc: "Soft music, soothing aromas, and warm ambience to relax instantly." },
// ]

// function LeafIcon({ className }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" className={cn("w-6 h-6 text-amber-200", className)} fill="currentColor">
//       <path d="M20 3c-7 2-11 6-12 12-3-2-5-5-6-8 1 8 6 13 13 14 3-1 5-3 6-6C21 10 21 6 20 3z" />
//     </svg>
//   )
// }

// function TiltCard({ title, desc }: { title: string; desc: string }) {
//   return (
//     <div className="group [perspective:900px]">
//       <div
//         className="rounded-2xl bg-purple-800 text-white p-6 h-full
//                    shadow-lg transition-transform duration-300
//                    group-hover:[transform:rotateX(6deg)_rotateY(-6deg)_translateZ(10px)]"
//       >
//         <LeafIcon className="mb-4" />
//         <h4 className="font-serif text-xl mb-2">{title}</h4>
//         <p className="text-purple-100/90 leading-relaxed">{desc}</p>
//       </div>
//     </div>
//   )
// }

// export function WhyChooseUsSection() {
//   const marqueeRef = useRef<HTMLDivElement>(null)
//   return (
//     <section className="bg-white px-4 py-16">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8">
//           <h2 className="font-serif text-3xl md:text-4xl mb-2 text-gray-900">Why choose us?</h2>
//           <p className="text-gray-600">Designed for your peace of mind</p>
//         </div>

//         {/* Desktop: grid with tilt on hover */}
//         <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-5">
//           {cards.map((c, i) => (
//             <TiltCard key={i} title={c.title} desc={c.desc} />
//           ))}
//         </div>

//         {/* Mobile: continuous left-to-right marquee */}
//         <div className="md:hidden relative overflow-hidden">
//           <div ref={marqueeRef} className="marquee-row flex gap-4" aria-label="Why choose us cards marquee">
//             {[...cards, ...cards].map((c, i) => (
//               <div key={i} className="min-w-[260px] rounded-2xl bg-purple-800 text-white p-5 shadow-md">
//                 <LeafIcon className="mb-3" />
//                 <h4 className="font-serif text-lg mb-1">{c.title}</h4>
//                 <p className="text-purple-100/90 text-sm leading-relaxed">{c.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const cards = [
  { title: "Holistic Healing", desc: "We nurture mind, body, and spirit to restore true balance and peace." },
  { title: "Excellence in Care", desc: "Every therapy is delivered with precision, warmth, and professionalism." },
  { title: "Empathy & Personalization", desc: "We listen deeply and create solutions tailored to your needs." },
  {
    title: "Global Therapies, Local Comfort",
    desc: "Experience Ayurvedic, Thai, Shiatsu, and energy healing in Gurgaon.",
  },
  { title: "Calming Environment", desc: "Soft music, soothing aromas, and warm ambience to relax instantly." },
]

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-6 h-6 text-amber-200", className)} fill="currentColor">
      <path d="M20 3c-7 2-11 6-12 12-3-2-5-5-6-8 1 8 6 13 13 14 3-1 5-3 6-6C21 10 21 6 20 3z" />
    </svg>
  )
}

function TiltCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100)
    return () => clearTimeout(timer)
  }, [index])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0.5, y: 0.5 })
  }

  const rotateX = isHovered ? (mousePosition.y - 0.5) * -25 : 0
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 25 : 0
  const glareX = mousePosition.x * 100
  const glareY = mousePosition.y * 100
  const glareAngle = Math.atan2(mousePosition.y - 0.5, mousePosition.x - 0.5) * (180 / Math.PI) + 90

  return (
    <div 
      className={cn(
        "group h-full transition-all duration-600",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{
        perspective: '1200px',
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl bg-gradient-to-br from-purple-800 via-purple-900 to-purple-950 
                   text-white p-6 h-full cursor-pointer overflow-hidden
                   shadow-xl transition-all duration-300 ease-out"
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.05 : 1})`,
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(147, 51, 234, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Shine overlay effect */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35) 0%, transparent 60%)`,
          }}
        />

        {/* Glare reflection */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            opacity: isHovered ? 0.4 : 0,
            background: `linear-gradient(${glareAngle}deg, 
              rgba(255,255,255,0.1) 0%, 
              rgba(255,255,255,0.3) 45%, 
              rgba(255,255,255,0.5) 50%, 
              rgba(255,255,255,0.3) 55%, 
              rgba(255,255,255,0.1) 100%)`,
            transform: `translate(${(mousePosition.x - 0.5) * 30}%, ${(mousePosition.y - 0.5) * 30}%)`,
          }}
        />

        {/* Animated border glow */}
        <div 
          className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: 'inset 0 0 20px rgba(255,255,255,0.2), inset 0 0 40px rgba(147,51,234,0.3)',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className={cn(
            "mb-4 transition-all duration-500",
            isHovered && "scale-110 rotate-12"
          )}>
            <LeafIcon className="drop-shadow-lg" />
          </div>
          <h4 className={cn(
            "font-serif text-xl mb-2 transition-all duration-300",
            isHovered && "translate-x-1"
          )}>
            {title}
          </h4>
          <p className={cn(
            "leading-relaxed transition-all duration-300",
            isHovered ? "text-purple-50" : "text-purple-100/90"
          )}>
            {desc}
          </p>
        </div>

        {/* Sparkle effects */}
        {isHovered && (
          <>
            <span 
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ 
                top: '20%', 
                left: '30%',
                animation: 'sparkle 1.5s ease-in-out infinite',
              }} 
            />
            <span 
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ 
                top: '60%', 
                left: '70%',
                animation: 'sparkle 1.5s ease-in-out infinite 0.2s',
              }} 
            />
            <span 
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ 
                top: '80%', 
                left: '20%',
                animation: 'sparkle 1.5s ease-in-out infinite 0.4s',
              }} 
            />
          </>
        )}
      </div>
    </div>
  )
}

export function WhyChooseUsSection() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
          <h2 className="font-serif text-3xl md:text-4xl mb-2 text-gray-900 tracking-wide">
            Why choose us?
          </h2>
          <p className="text-gray-600 text-lg">Designed for your peace of mind</p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-6">
          {cards.map((c, i) => (
            <TiltCard key={i} title={c.title} desc={c.desc} index={i} />
          ))}
        </div>

        {/* Mobile Marquee */}
        <div className="md:hidden relative overflow-hidden">
          <div 
            className="flex gap-4"
            style={{
              animation: 'marquee 25s linear infinite',
            }}
          >
            {[...cards, ...cards, ...cards].map((c, i) => (
              <div 
                key={i} 
                className="min-w-[280px] rounded-2xl bg-gradient-to-br from-purple-800 via-purple-900 to-purple-950 
                           text-white p-6 shadow-xl flex-shrink-0
                           hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
              >
                <LeafIcon className="mb-4" />
                <h4 className="font-serif text-lg mb-2">{c.title}</h4>
                <p className="text-purple-100/90 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}} />
    </section>
  )
}