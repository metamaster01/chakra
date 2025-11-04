"use client"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

type Props = { children: ReactNode; delay?: number; className?: string }

export function ScrollReveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
