"use client"
import { motion } from "framer-motion"
import Image from "next/image"

const galleryImages = [
  { src: "/gallery/gallery1.jpg", alt: "Healing Space" },
  { src: "/gallery/gallery2.jpg", alt: "Massage Therapy" },
  { src: "/gallery/gallery3.jpg", alt: "Meditation Area" },
  { src: "/gallery/gallery4.jpg", alt: "Spa Ambience" },
  { src: "/gallery/gallery5.jpg", alt: "Essential Oils" },
  { src: "/gallery/gallery6.jpg", alt: "Yoga & Wellness" },
]

export function GallerySection() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="max-w-6xl mx-auto text-center mb-12 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
        <h2 className="font-serif text-3xl md:text-4xl mb-2 text-gray-900 tracking-wide">
          Our Healing Gallery
        </h2>
        <p className="text-gray-600 text-lg">A glimpse into our calming world</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={400}
              className="object-cover w-full h-64 transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-800/40 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <p className="text-white font-serif text-lg">{img.alt}</p>
            </div>
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

