"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CallToActionSection() {
  return (
    <section className="relative py-20  px-4 bg-purple-950 text-white ">
      <div className="max-w-4xl mx-auto text-center relative z-10 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-balance mb-6 text-white">
            Reserve Your Chakra Healing
            <br />
            Session Today
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto text-pretty">
            Personalized Guidance, Meditation Coaching, And Energy Alignment — Tailored Just For You.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button
              className="bg-amber-100 hover:bg-amber-200 text-gray-900 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={() => (window.location.href = "#")}
            >
              Book Now
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-[#C9A882]"
          />
        </svg>
      </div>
    </section>
  )
}
