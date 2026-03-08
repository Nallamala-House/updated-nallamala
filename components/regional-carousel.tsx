"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function RegionalCarousel() {
  const [rotation, setRotation] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const galleries = [
    {
      id: 1,
      title: "Mumbai Meetup 2024",
      region: "West",
      image: "/mumbai-meetup-event.jpg",
      date: "Dec 15, 2024",
      description:
        "A vibrant gathering of Nallamala alumni and members in Mumbai, celebrating community and innovation.",
      attendees: 125,
    },
    {
      id: 2,
      title: "Delhi Networking Event",
      region: "North",
      image: "/delhi-networking-event.jpg",
      date: "Dec 10, 2024",
      description: "Connect, collaborate, and celebrate at our flagship Delhi meetup with industry leaders.",
      attendees: 98,
    },
    {
      id: 3,
      title: "Bangalore Tech Summit",
      region: "South",
      image: "/bangalore-tech-conference.jpg",
      date: "Dec 8, 2024",
      description: "Innovation and technology at the heart of our South India chapter.",
      attendees: 156,
    },
    {
      id: 4,
      title: "Chennai Community Fest",
      region: "South",
      image: "/chennai-festival-celebration.jpg",
      date: "Dec 5, 2024",
      description: "A celebration of culture, community, and creativity in the heart of Chennai.",
      attendees: 87,
    },
    {
      id: 5,
      title: "Kolkata Cultural Night",
      region: "East",
      image: "/kolkata-cultural-event.jpg",
      date: "Nov 28, 2024",
      description: "Experience the cultural richness of East India through this memorable event.",
      attendees: 76,
    },
  ]

  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(350)
  const [translateZ, setTranslateZ] = useState(500)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Mobile dimensions
        setWidth(280)
        setHeight(260)
        setTranslateZ(320)
      } else if (window.innerWidth < 1024) {
        // Tablet dimensions
        setWidth(320)
        setHeight(300)
        setTranslateZ(400)
      } else {
        // Desktop dimensions
        setWidth(400)
        setHeight(350)
        setTranslateZ(500)
      }
    }

    // Initial check
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setRotation((prev) => prev - 72) // 360/5 = 72 degrees per item
    }, 4000)
    return () => clearInterval(interval)
  }, [autoPlay])

  const goToPrevious = () => {
    setRotation((prev) => prev + 72)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 8000)
  }

  const goToNext = () => {
    setRotation((prev) => prev - 72)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 8000)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto overflow-hidden sm:overflow-visible">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Regional Network</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Regional <span className="text-primary">Meetup Gallery</span>
          </h2>
          <p className="text-white/70 text-lg">Experience our nationwide community</p>
        </div>

        {/* 3D Carousel */}
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
          <div
            className="w-full h-full flex items-center justify-center transform scale-75 sm:scale-100"
            style={{
              perspective: "1400px",
            }}
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
                  <div
                    key={gallery.id}
                    style={{
                      position: "absolute",
                      width: `${width}px`,
                      height: `${height}px`,
                      left: "0",
                      top: "0",
                      transformStyle: "preserve-3d",
                      transform: `rotateY(${-angle}deg) translateZ(${translateZ}px)`,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        transformStyle: "preserve-3d",
                      }}
                      className="rounded-xl overflow-hidden border-2 border-primary/40 shadow-2xl bg-black flex flex-col"
                    >
                      {/* Image */}
                      <div className="flex-1 w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl sm:text-5xl font-bold text-white/20 mb-2">📸</div>
                          <p className="text-xl sm:text-2xl font-serif font-bold text-primary mb-1">Coming Soon</p>
                          <p className="text-white/50 text-xs sm:text-sm">Gallery Updates</p>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="h-[70px] bg-black border-t border-primary/30 p-4 flex flex-col justify-center">
                        <h3 className="text-white font-bold text-base mb-1">{gallery.title}</h3>
                        <p className="text-primary text-xs">{gallery.region} • {gallery.date}</p>
                      </div>
                    </div>
                  </div>
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
