"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { regions } from "@/data/regions"

export default function RegionalCarousel() {
  const [rotation, setRotation] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const galleries = regions
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(350)
  const [translateZ, setTranslateZ] = useState(500)

  // Responsive carousel sizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setWidth(280)
        setHeight(260)
        setTranslateZ(320)
      } else if (window.innerWidth < 1024) {
        setWidth(320)
        setHeight(300)
        setTranslateZ(400)
      } else {
        setWidth(400)
        setHeight(350)
        setTranslateZ(500)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setRotation(prev => prev - 360 / galleries.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [autoPlay, galleries.length])

  const goToPrevious = () => {
    setRotation(prev => prev + 360 / galleries.length)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 8000)
  }

  const goToNext = () => {
    setRotation(prev => prev - 360 / galleries.length)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 8000)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto overflow-hidden sm:overflow-visible">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">
            Regional Network
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Regional <span className="text-primary">Meetup Gallery</span>
          </h2>
          <p className="text-white/70 text-lg">Experience our nationwide community</p>
        </div>

        {/* 3D Carousel */}
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
          <div
            className="w-full h-full flex items-center justify-center transform scale-75 sm:scale-100"
            style={{ perspective: "1400px" }}
          >
            <div
              style={{
                position: "relative",
                width: `${width}px`,
                height: `${height}px`,
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotation}deg)`,
                transition: "transform 1s ease-in-out",
              }}
            >
              {galleries.map((gallery, index) => {
                const angle = (360 / galleries.length) * index
                return (
                  <Link
                    key={gallery.id}
                    href={`/region/${gallery.id}`}
                    className="absolute w-full h-full"
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                      left: 0,
                      top: 0,
                      transformStyle: "preserve-3d",
                      transform: `rotateY(${-angle}deg) translateZ(${translateZ}px)`,
                    }}
                  >
                    <div className="rounded-xl overflow-hidden border-2 border-primary/40 shadow-2xl bg-black flex flex-col cursor-pointer w-full h-full">
                      {/* Image */}
                      <div className="flex-1 w-full overflow-hidden">
                        <img
                          src={gallery.image}
                          alt={gallery.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="h-[70px] bg-black border-t border-primary/30 p-4 flex flex-col justify-center">
                        <h3 className="text-white font-bold text-base mb-1">{gallery.title}</h3>
                        <p className="text-primary text-xs">{gallery.region}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-primary hover:bg-primary/90 text-black p-3 rounded-full transition-all shadow-lg"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={goToNext}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-primary hover:bg-primary/90 text-black p-3 rounded-full transition-all shadow-lg"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </section>
  )
}