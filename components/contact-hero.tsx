"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Hero() {
  const socialIcons = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="w-full bg-purple-900 py-32 md:py-40 overflow-hidden">
      <motion.div
        className="flex flex-col items-center justify-center text-center px-4 md:px-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Breadcrumb Label */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-white/70 tracking-widest uppercase mb-6 font-medium"
        >
          Get Started
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-12 leading-tight text-balance"
        >
          GET IN TOUCH WITH US. WE&apos;RE HERE TO ASSIST YOU.
        </motion.h1>

        {/* Social Icons */}
        <motion.div variants={itemVariants} className="flex gap-6 md:gap-8 justify-center">
          {socialIcons.map((social, index) => {
            const Icon = social.icon
            return (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/40 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
