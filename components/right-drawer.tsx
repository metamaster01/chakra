"use client"

import { motion, AnimatePresence } from "framer-motion"
import * as React from "react"
import { IconClose } from "./ui/icons"

type DrawerProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  logo?: React.ReactNode
}

export function RightDrawer({ open, onClose, children, title, logo }: DrawerProps) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            role="presentation"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 h-dvh w-[86vw] max-w-sm bg-background text-foreground shadow-xl outline-none"
            role="dialog"
            aria-modal="true"
            aria-label={title || "Menu"}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                {logo}
                {title ? <span className="text-sm font-medium">{title}</span> : null}
              </div>
              <button aria-label="Close menu" onClick={onClose} className="rounded-md p-2 hover:bg-muted">
                <IconClose className="size-5" />
              </button>
            </div>
            <div className="p-4">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
