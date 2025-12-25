"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Regional Network</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Regional <span className="text-primary">Meetup Gallery</span>
          </h2>
          <p className="text-white/70 text-lg">Experience our nationwide community</p>
        </div>

        {/* 3D Carousel */}
        <div className="relative w-full h-[500px] flex items-center justify-center">
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ 
              perspective: "1400px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "400px",
                height: "350px",
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
                      width: "400px",
                      height: "350px",
                      left: "0",
                      top: "0",
                      transformStyle: "preserve-3d",
                      transform: `rotateY(${-angle}deg) translateZ(500px)`,
                    }}
                  >
                    <Link href={`/gallery/${gallery.id}`}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          transformStyle: "preserve-3d",
                        }}
                        className="rounded-xl overflow-hidden border-2 border-primary/40 hover:border-primary shadow-2xl bg-black cursor-pointer transition-all hover:scale-105"
                      >
                      {/* Image */}
                      <div className="h-[280px] w-full bg-gray-900">
                        <img
                          src={gallery.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"}
                          alt={gallery.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
                          }}
                        />
                      </div>
                      
                      {/* Info */}
                      <div className="h-[70px] bg-black border-t border-primary/30 p-4 flex flex-col justify-center">
                        <h3 className="text-white font-bold text-base mb-1">{gallery.title}</h3>
                        <p className="text-primary text-xs">{gallery.region} • {gallery.date}</p>
                      </div>
                      </div>
                    </Link>
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
