'use client'
import { useState } from 'react'

export function Tabs({ items, children }: { items: { id: string; label: string }[]; children: React.ReactNode }) {
  const [active, setActive] = useState(items[0]?.id)
  return (
    <div className="rounded-2xl border border-purple-900/10 bg-white">
      <div className="flex gap-6 px-5 pt-4">
        {items.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`pb-3 text-sm font-medium ${
              active === t.id ? 'text-purple-900' : 'text-purple-900/60'
            }`}
          >
            {t.label}
            <span
              className={`block h-0.5 mt-2 rounded bg-amber-300 transition-all ${
                active === t.id ? 'w-full' : 'w-0'
              }`}
            />
          </button>
        ))}
      </div>
      <div className="border-t border-purple-900/10" />
      {/* Panels */}
      <div className="px-5 md:px-6 py-6">
        {Array.isArray(children)
          ? children.filter((p: any) => p?.props?.id === active)
          : (children as any)?.props?.id === active && children}
      </div>
    </div>
  )
}

export function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  return <div id={id}>{children}</div>
}
