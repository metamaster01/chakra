"use client"
import { motion } from "framer-motion"

const promoVideos = [
  { src: "/videos/promo1.mp4", title: "Rejuvenate with Ayurveda" },
  { src: "/videos/promo1.mp4", title: "Peaceful Energy Healing" },
  { src: "/videos/promo1.mp4", title: "Discover Serenity at Chakra" },
]

export function VideoSection() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="max-w-6xl mx-auto text-center mb-12 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
        <h2 className="font-serif text-3xl md:text-4xl mb-2 text-gray-900 tracking-wide">
          Experience Our World
        </h2>
        <p className="text-gray-600 text-lg">Short glimpses of our holistic wellness</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {promoVideos.map((v, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-purple-800 via-purple-900 to-purple-950 group"
          >
            <video
              src={v.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-64 object-cover rounded-2xl transition-all duration-700 group-hover:scale-110"
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <h3 className="text-white font-serif text-lg md:text-xl drop-shadow-lg px-4">{v.title}</h3>
            </div>

            {/* Glow border effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
              style={{ boxShadow: "inset 0 0 20px rgba(255,255,255,0.2), inset 0 0 40px rgba(147,51,234,0.3)" }}
            />
          </motion.div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  )
}
