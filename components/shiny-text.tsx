"use client"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function ShinyText({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("shiny-text inline-block", className)}>{children}</span>
}
