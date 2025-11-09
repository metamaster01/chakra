"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import { X, Pause, Play } from "lucide-react"

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Play Button
  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.log("Video play error:", err))
      setIsPlaying(true)
      setIsPaused(false)
    }
  }, [])

  //  Pause Button
  const handlePause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPaused(true)
    }
  }, [])


  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setIsPlaying(false)
    setIsPaused(false)
  }, [])

  return (
    <section className="bg-white px-4 py-16">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
        <h2 className="font-serif text-3xl md:text-4xl mb-2 text-gray-900 tracking-wide">
          Experience Our World
        </h2>
        <p className="text-gray-600 text-lg">
          A short glimpse into our serene Chakra wellness
        </p>
      </div>

      {/* Video Section */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-purple-800 via-purple-900 to-purple-950 max-w-6xl mx-auto group"
      >
        {/* Actual Video */}
        <video
          ref={videoRef}
          src="/videos/promo1.mp4"
          loop
          playsInline
          preload="metadata"
          className="w-full h-[60vw] md:h-[480px] object-cover rounded-3xl transition-all duration-700 group-hover:scale-105"
        />

        
        {!isPlaying && (
          <>
            <div className="absolute inset-0 bg-black/40 rounded-3xl transition-all duration-500 group-hover:bg-black/50" />
            <button
              className="absolute bottom-4 right-4 flex items-center gap-2 bg-purple-800 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-700 hover:scale-105 transition-all duration-300"
              onClick={handlePlay}
            >
              <Play size={16} />
              <span className="text-sm font-medium">Play Now</span>
            </button>
          </>
        )}

       
        {isPlaying && (
          <AnimatePresence>
            <motion.div
              key="controls"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 right-4 flex items-center gap-3 z-20"
            >
              {/* Pause / Play Toggle */}
              {!isPaused ? (
                <button
                  onClick={handlePause}
                  className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300"
                >
                  <Pause size={20} />
                </button>
              ) : (
                <button
                  onClick={handlePlay}
                  className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300"
                >
                  <Play size={20} />
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300"
              >
                <X size={20} />
              </button>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Glow Effect */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
          style={{
            boxShadow:
              "inset 0 0 25px rgba(255,255,255,0.2), inset 0 0 45px rgba(147,51,234,0.3)",
          }}
        />
      </motion.div>

      {/* Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `,
        }}
      />
    </section>
  )
}
