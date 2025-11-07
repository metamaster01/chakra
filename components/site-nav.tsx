"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from '@/lib/supabase-browser'
import { useEffect, useState } from 'react'


// Icons (inline SVG for simplicity)
function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function IconSparkles({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function IconShoppingBag({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  )
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function IconDocument({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function DefaultAvatar({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="8" r="4" fill="white"/>
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="white"/>
    </svg>
  )
}

// Sparkle animation component
function Sparkle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-amber-200 rounded-full"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1.5, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    />
  )
}

function UserMenu() {
  const supabase = createClient()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user
      setUser(u || null)
      setAvatar(
        (u?.user_metadata?.avatar_url as string) ??
        null
      )
    })
  }, [])

  if (!user) {
    // show Login like before
    return (
      <Link
        href="/login"
        className="px-6 py-2.5 bg-gradient-to-r from-purple-100 to-purple-300 font-semibold rounded-full transition-all duration-300"
      >
        Login
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20"
        aria-label="User menu"
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="profile" className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <DefaultAvatar />
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-52 rounded-xl bg-white text-slate-800 shadow-xl overflow-hidden z-50"
          onMouseLeave={() => setOpen(false)}
        >
          <Link href="/account" className="block px-4 py-3 hover:bg-slate-100">My Account</Link>
          <Link href="/account#orders" className="block px-4 py-3 hover:bg-slate-100">My Orders</Link>
          <Link href="/account#services" className="block px-4 py-3 hover:bg-slate-100">My Bookings</Link>
          <Link href="/account#reviews" className="block px-4 py-3 hover:bg-slate-100">My Reviews</Link>
          {/* Wishlist later */}
          <button
            onClick={async () => { await supabase.auth.signOut(); location.href = '/' }}
            className="w-full text-left px-4 py-3 hover:bg-slate-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export function SiteNav() {
  const [open, setOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isFirstVisit, setIsFirstVisit] = React.useState(true)
  const [searchFocused, setSearchFocused] = React.useState(false)

  // Handle scroll for sticky effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // First visit animation
  React.useEffect(() => {
    const timer = setTimeout(() => setIsFirstVisit(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-[#3b255f]/95 backdrop-blur-md shadow-lg shadow-purple-900/20" 
            : "bg-[#3b255f]"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Decorative top border with gradient */}
        <motion.div 
          className="h-1 bg-gradient-to-r from-purple-400 via-amber-200 to-purple-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-4 md:py-5">
          {/* Background sparkles for first visit */}
          {isFirstVisit && (
            <>
              <Sparkle delay={0} />
              <Sparkle delay={0.5} />
              <Sparkle delay={1} />
            </>
          )}

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                className="relative"
                whileHover={{ 
                  scale: 1.15, 
                  rotate: [0, -15, 15, -10, 10, 0],
                }}
                transition={{ 
                  scale: { duration: 0.3 },
                  rotate: { duration: 0.6, ease: "easeInOut" }
                }}
              >
                <div className="absolute inset-0 bg-amber-200/20 rounded-full blur-md group-hover:blur-lg transition-all" />
                <Image 
                  src="/logo.png" 
                  alt="Chakra Healing Center" 
                  className="w-14 h-14 md:w-16 md:h-16 relative z-10" 
                  width={64} 
                  height={64}
                />
              </motion.div>
              <motion.span 
                className="hidden sm:block text-white font-serif text-lg md:text-xl tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Chakra Healing
              </motion.span>
            </Link>
          </motion.div>

          {/* Search - Desktop */}
          <motion.div 
            className="hidden md:flex items-center flex-1 max-w-md mx-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div 
              className={`flex w-full items-center gap-3 rounded-full px-5 py-2.5 transition-all duration-300 ${
                searchFocused 
                  ? "bg-white/20 ring-2 ring-amber-200/50" 
                  : "bg-white/10 hover:bg-white/15"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <IconSearch className="w-5 h-5 text-amber-200" />
              <input
                aria-label="Search"
                placeholder="Search healing services..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/60"
              />
            </motion.div>
          </motion.div>

          {/* Right side actions */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Book Now button - Desktop */}
            <motion.div
              // className="hidden lg:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* <Link 
                href="/login"
                className="px-6 py-2.5 bg-gradient-to-r from-purple-100 to-purple-300 text-white-900 
                         font-semibold rounded-full hover:shadow-lg hover:shadow-amber-200/50 
                         transition-all duration-300"
              >
                Login
              </Link> */}
              <UserMenu />
            </motion.div>
            {/* <motion.div
              className="hidden lg:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-200 to-amber-300 text-purple-900 
                         font-semibold rounded-full hover:shadow-lg hover:shadow-amber-200/50 
                         transition-all duration-300"
              >
                Book Now
              </Link>
            </motion.div> */}

            {/* Menu Button */}
            <motion.button
              aria-label="Open menu"
              className="relative p-2.5 rounded-full hover:bg-white/10 transition-colors group"
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="absolute inset-0 bg-amber-200/0 group-hover:bg-amber-200/20 rounded-full blur transition-all" />
              <IconMenu className="w-7 h-7 md:w-8 md:h-8 text-white relative z-10" />
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[73px] md:h-[85px]" />

      {/* Enhanced Drawer */}
      <RightDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}

// Enhanced Right Drawer
function RightDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  const menuItems = [
    { href: "/", label: "Home", icon: IconHome },
    { href: "/about", label: "About", icon: IconSparkles },
    { href: "/services", label: "Services", icon: IconUsers },
    { href: "/products", label: "Products", icon: IconShoppingBag },
    { href: "/contact", label: "Contact", icon: IconPhone },
    { href: "/blogs", label: "Blogs", icon: IconDocument },
  ]

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-[85vw] max-w-sm bg-gradient-to-b from-[#3b255f] to-[#2a1a4a] 
                     text-white shadow-2xl overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between p-6 border-b border-white/10">
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-10 h-10" />
                <span className="font-serif text-lg">Menu</span>
              </motion.div>
              
              <motion.button
                aria-label="Close menu"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                <IconClose className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Search - Mobile */}
            <motion.div 
              className="p-6 pb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 border border-white/20">
                <IconSearch className="w-5 h-5 text-amber-200" />
                <input
                  aria-label="Search"
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/60"
                />
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="px-4 pb-6">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/10 
                               transition-all duration-300 group mb-2"
                    >
                      <IconComponent className="w-6 h-6 text-amber-200 group-hover:scale-125 transition-transform" />
                      <span className="text-lg font-medium group-hover:translate-x-2 transition-transform">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Book Now CTA in Drawer */}
            <motion.div 
              className="px-6 pb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/booking"
                onClick={onClose}
                className="block w-full py-4 px-6 bg-gradient-to-r from-amber-200 to-amber-300 
                         text-purple-900 text-center font-bold rounded-full shadow-lg 
                         hover:shadow-amber-200/50 hover:scale-105 transition-all duration-300"
              >
                Book Your Session
              </Link>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/50 to-transparent pointer-events-none" />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}