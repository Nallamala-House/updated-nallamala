"use client"

import { useState, useEffect, useRef } from "react"
import { Play } from "lucide-react"

function useCountAnimation(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime: number | null = null
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return { count, elementRef }
}

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const members = useCountAnimation(500)
  const events = useCountAnimation(50)
  const regions = useCountAnimation(7)

  return (
    <section id="video-section" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Experience</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Life at <span className="text-primary">Nallamala</span>
          </h2>
          <p className="text-white/70 text-lg">Discover the vibrant community and unforgettable moments</p>
        </div>

        {/* Video Container */}
        <div className="relative group">
          <div className="relative w-full rounded-2xl overflow-hidden border-2 border-primary/30 hover:border-primary/60 transition-all duration-300">
            {/* Video Placeholder */}
            <div className="relative w-full bg-gradient-to-br from-black via-black/80 to-black aspect-video flex items-center justify-center">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Play button */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="relative z-20 flex items-center justify-center w-20 h-20 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 transform group-hover:scale-110"
                >
                  <Play size={32} className="text-black fill-black" />
                </button>
              )}

              {/* Placeholder content */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="text-center">
                    <p className="text-white/70 text-xl font-serif">Coming Soon</p>
                    <p className="text-primary text-sm mt-2">Your video will appear here</p>
                  </div>
                </div>
              )}

              {/* Embedded video (placeholder iframe) */}
              {isPlaying && (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Life at Nallamala"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Border glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
