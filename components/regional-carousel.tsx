"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RegionalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
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

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleries.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [autoPlay, galleries.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleries.length) % galleries.length)
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleries.length)
    setAutoPlay(false)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setAutoPlay(false)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Regional Network</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Regional <span className="text-primary">Meetup Gallery</span>
          </h2>
          <p className="text-white/70 text-lg">Click on any image to see the complete story</p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Main carousel */}
          <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300">
            {galleries.map((gallery, index) => (
              <div
                key={gallery.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={gallery.image || "/placeholder.svg"}
                  alt={gallery.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-primary text-sm uppercase tracking-widest mb-2">{gallery.region}</p>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">{gallery.title}</h3>
                      <p className="text-white/80 text-sm mb-4">{gallery.date}</p>
                    </div>
                    <Link href={`/gallery/${gallery.id}`} className="flex-shrink-0">
                      <Button className="bg-primary hover:bg-primary/90 text-black font-semibold">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-primary/80 hover:bg-primary text-black p-2 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-primary/80 hover:bg-primary text-black p-2 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {galleries.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex ? "w-8 h-3 bg-primary" : "w-3 h-3 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
