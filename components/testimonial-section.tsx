"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    title: "Finding Balance and Love",
    content: "The Rose Quartz crystal has transformed my meditation routine. I feel more centered and loving.",
    image: "/testimonial-icon.png",
  },
  {
    id: 2,
    name: "Ananya K.",
    title: "Heart-Centered Meditation",
    content: "The chakra candles create the perfect atmosphere for my yoga practice. Highly recommend!",
    image: "/testimonial-icon.png",
  },
  {
    id: 3,
    name: "Rajesh M.",
    title: "Energy Alignment Journey",
    content:
      "The healing sessions have brought incredible peace to my daily life. My stress levels have decreased significantly.",
    image: "/testimonial-icon.png",
  },
  {
    id: 4,
    name: "Meera T.",
    title: "Spiritual Awakening",
    content: "Through the guided meditation practices, I've discovered a deeper connection with my inner self.",
    image: "/testimonial-icon.png",
  },
  {
    id: 5,
    name: "Arjun P.",
    title: "Chakra Balancing Success",
    content: "The personalized chakra healing approach has helped me overcome years of emotional blockages.",
    image: "/testimonial-icon.png",
  },
  {
    id: 6,
    name: "Kavya R.",
    title: "Mindful Living",
    content: "The meditation coaching has taught me to live more mindfully and appreciate each moment fully.",
    image: "/testimonial-icon.png",
  },
]

export function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 px-4 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-balance mb-4 text-gray-900">
            Real Stories from Aligned Souls
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto text-pretty">
            Discover How Our Products And Practices Have Helped People Balance Their Energy And Bring Positivity Into
            Their Lives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[currentTestimonial].id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <img
                src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-8 h-8 text-purple-700 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                  <h3 className="font-serif text-xl text-gray-900">{testimonials[currentTestimonial].title}</h3>
                </div>
                <p className="text-gray-600 font-medium mb-2">— {testimonials[currentTestimonial].name}</p>
                <p className="text-gray-800 leading-relaxed">{testimonials[currentTestimonial].content}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Second testimonial (next one) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[(currentTestimonial + 1) % testimonials.length].id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <img
                src={testimonials[(currentTestimonial + 1) % testimonials.length].image || "/placeholder.svg"}
                alt={testimonials[(currentTestimonial + 1) % testimonials.length].name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-8 h-8 text-purple-700 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                  <h3 className="font-serif text-xl text-gray-900">
                    {testimonials[(currentTestimonial + 1) % testimonials.length].title}
                  </h3>
                </div>
                <p className="text-gray-600 font-medium mb-2">
                  — {testimonials[(currentTestimonial + 1) % testimonials.length].name}
                </p>
                <p className="text-gray-800 leading-relaxed">
                  {testimonials[(currentTestimonial + 1) % testimonials.length].content}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105"
            onClick={() => (window.location.href = "#")}
          >
            Share Your Experience
          </Button>
        </motion.div> */}
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-purple-950"
          />
        </svg>
      </div>
    </section>
  )
}
