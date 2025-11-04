"use client"

import { motion } from "framer-motion"
import { Mail, Phone, Clock } from "lucide-react"

export function ContactInfo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8},
    },
  }

  const contactItems = [
    {
      icon: Mail,
      title: "Email Address",
      content: "chakra@gmail.com",
      hours: "Assistance hours:\nMonday - Saturday 6 am to 8 pm EST",
    },
    {
      icon: Phone,
      title: "Number",
      content: "+91 98765 43210",
      hours: "Assistance hours:\nMonday - Saturday 6 am to 8 pm EST",
    },
  ]

  return (
    <motion.div
      className="space-y-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Section Header */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-foreground/60 uppercase tracking-widest mb-4">Contact Info</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
          We are always happy to assist you
        </h2>
      </motion.div>

      {/* Contact Items */}
      <motion.div className="space-y-8" variants={containerVariants}>
        {contactItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex gap-4 md:gap-6">
                {/* Icon */}
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <h4 className="font-bold text-foreground text-lg">{item.title}</h4>
                  <p className="text-primary text-base md:text-lg font-semibold">{item.content}</p>
                  <p className="text-foreground/60 text-sm whitespace-pre-line leading-relaxed">{item.hours}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Additional Info Box */}
      <motion.div
        variants={itemVariants}
        className="p-6 md:p-8 bg-secondary/5 border border-primary/10 rounded-xl"
        whileHover={{ borderColor: "var(--color-primary)" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex gap-3 items-start">
          <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-foreground mb-1">Response Time</p>
            <p className="text-foreground/70 text-sm">We typically respond within 24 hours during business hours</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
