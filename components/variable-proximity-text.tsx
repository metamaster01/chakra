"use client"

import { useEffect, useRef, useState } from "react"
import type { JSX as JSXNS } from "react"

type VariableProximityTextProps = {
  text: string
  as?: keyof JSXNS.IntrinsicElements
  className?: string
  intensity?: number // pixels influence radius
  maxLift?: number // px translateY at closest point
}

export default function VariableProximityText({
  text,
  as = "p",
  className = "",
  intensity = 180,
  maxLift = 10,
}: VariableProximityTextProps) {
  const Tag = as as any
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [rects, setRects] = useState<DOMRect[]>([])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-ch]"))
    setRects(spans.map((s) => s.getBoundingClientRect()))

    const handleResize = () => {
      setRects(spans.map((s) => s.getBoundingClientRect()))
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [text])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-ch]"))
      spans.forEach((s, i) => {
        const r = rects[i]
        if (!r) return
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const clamped = Math.max(0, 1 - dist / intensity)
        const lift = -maxLift * clamped
        const scale = 1 + clamped * 0.03
        s.style.transform = `translateY(${lift}px) scale(${scale})`
      })
    }

    const handleLeave = () => {
      const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-ch]"))
      spans.forEach((s) => {
        s.style.transform = "translateY(0) scale(1)"
      })
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseleave", handleLeave)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseleave", handleLeave)
    }
  }, [rects, intensity, maxLift])

  return (
    <Tag className={className}>
      <span ref={containerRef} className="inline-block will-change-transform">
        {Array.from(text).map((ch, idx) => (
          <span
            key={idx}
            data-ch
            className="inline-block transition-transform duration-150 ease-out"
            aria-hidden="true"
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
        <span className="sr-only">{text}</span>
      </span>
    </Tag>
  )
}


// "use client";

// import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
// import type { JSX as JSXNS } from "react";

// type VariableProximityTextProps = {
//   text: string;
//   as?: keyof JSXNS.IntrinsicElements;
//   className?: string;
//   intensity?: number; // pixels influence radius
//   maxLift?: number; // px translateY at closest point
// };

// export default function VariableProximityText({
//   text,
//   as = "p",
//   className = "",
//   intensity = 180,
//   maxLift = 10,
// }: VariableProximityTextProps) {
//   const Tag = as as any;
//   const containerRef = useRef<HTMLSpanElement | null>(null);
//   const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
//   const rectsRef = useRef<Array<DOMRect | undefined>>([]);
//   const pointerRef = useRef<{ x: number; y: number } | null>(null);
//   const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
//   const rafRef = useRef<number | null>(null);

//   const letters = Array.from(text).map((ch) => (ch === " " ? "\u00A0" : ch));

//   const computeRects = useCallback(() => {
//     rectsRef.current = letterRefs.current.map((el) => (el ? el.getBoundingClientRect() : undefined));
//   }, []);

//   // compute rects on layout, on font load, and observe resize
//   useLayoutEffect(() => {
//     computeRects();
//     const el = containerRef.current;
//     let ro: ResizeObserver | null = null;
//     try {
//       if (el) {
//         ro = new ResizeObserver(() => computeRects());
//         ro.observe(el);
//       }
//     } catch (e) {
//       // ResizeObserver might not exist in older envs; fallback is window resize
//       window.addEventListener("resize", computeRects);
//     }

//     if ((document as any).fonts?.ready) {
//       (document as any).fonts.ready.then(() => {
//         // recompute after fonts load (webfonts)
//         computeRects();
//       }).catch(() => {});
//     }

//     return () => {
//       if (ro) ro.disconnect();
//       else window.removeEventListener("resize", computeRects);
//     };
//   }, [computeRects, text]);

//   // pointer/mouse/touch handlers (store last pointer coords)
//   useEffect(() => {
//     const handleMouse = (e: MouseEvent) => {
//       pointerRef.current = { x: e.clientX, y: e.clientY };
//     };
//     const handleTouch = (e: TouchEvent) => {
//       const t = e.touches[0];
//       if (t) pointerRef.current = { x: t.clientX, y: t.clientY };
//     };
//     const handleLeave = () => {
//       pointerRef.current = null;
//     };

//     window.addEventListener("mousemove", handleMouse);
//     window.addEventListener("touchmove", handleTouch, { passive: true });
//     window.addEventListener("mouseleave", handleLeave);
//     window.addEventListener("pointercancel", handleLeave);

//     return () => {
//       window.removeEventListener("mousemove", handleMouse);
//       window.removeEventListener("touchmove", handleTouch);
//       window.removeEventListener("mouseleave", handleLeave);
//       window.removeEventListener("pointercancel", handleLeave);
//     };
//   }, []);

//   // RAF loop — update only when pointer changes
//   useEffect(() => {
//     const loop = () => {
//       rafRef.current = requestAnimationFrame(loop);
//       const p = pointerRef.current;
//       const last = lastPointerRef.current;

//       // no change -> skip
//       if (
//         (!p && !last) ||
//         (p && last && p.x === last.x && p.y === last.y)
//       ) {
//         return;
//       }
//       lastPointerRef.current = p ? { ...p } : null;

//       const rects = rectsRef.current;
//       const els = letterRefs.current;

//       if (!p) {
//         // pointer left -> reset transforms
//         for (let i = 0; i < els.length; i++) {
//           const el = els[i];
//           if (!el) continue;
//           el.style.transition = "transform 160ms cubic-bezier(.2,.8,.2,1)";
//           el.style.transform = "translateY(0px) scale(1)";
//         }
//         return;
//       }

//       // pointer present -> update each letter
//       for (let i = 0; i < els.length; i++) {
//         const el = els[i];
//         const r = rects[i];
//         if (!el || !r) continue;
//         const cx = r.left + r.width / 2;
//         const cy = r.top + r.height / 2;
//         const dx = p.x - cx;
//         const dy = p.y - cy;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         const clamped = Math.max(0, 1 - dist / intensity);
//         const lift = -maxLift * clamped;
//         const scale = 1 + clamped * 0.03;
//         // immediate transform for responsiveness
//         el.style.transition = "transform 60ms linear";
//         el.style.transform = `translate3d(0, ${lift}px, 0) scale(${scale})`;
//         el.style.willChange = "transform";
//       }
//     };

//     rafRef.current = requestAnimationFrame(loop);
//     return () => {
//       if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
//       rafRef.current = null;
//     };
//   }, [intensity, maxLift]);

//   // ensure refs reset & rects recomputed when text changes
//   useEffect(() => {
//     letterRefs.current = [];
//     rectsRef.current = [];
//     // compute after next paint so DOM nodes exist
//     requestAnimationFrame(() => computeRects());
//   }, [text, computeRects]);

//   const setLetterRef = (el: HTMLSpanElement | null, idx: number) => {
//     letterRefs.current[idx] = el;
//     if (el) {
//       el.style.willChange = "transform";
//       // initial transform to avoid layout jump
//       el.style.transform = "translate3d(0,0,0) scale(1)";
//     }
//   };

//   return (
//     <Tag className={className}>
//       <span ref={containerRef} className="inline-block will-change-transform">
//         {letters.map((ch, i) => (
//           <span
//             key={i}
//             data-ch
//             ref={(el) => setLetterRef(el, i)}
//             className="inline-block transition-transform duration-150 ease-out"
//             aria-hidden="true"
//           >
//             {ch}
//           </span>
//         ))}
//         <span className="sr-only">{text}</span>
//       </span>
//     </Tag>
//   );
// }

