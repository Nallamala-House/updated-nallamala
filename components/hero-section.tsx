"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-85 brightness-150"
        >
          <source src="https://cdn.pixabay.com/video/2024/03/03/202844-919000222_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Sanskrit Motto */}
        <div
          className={`mb-6 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-primary text-lg font-serif italic tracking-wide">वसुधैव कुटुम्बकम् - The World is One Family</p>
        </div>

        {/* Main Title with Animated Underline */}
        <div
          className={`mb-6 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-white inline-block relative">
            Nallamala{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
              House
            </span>
            {/* Animated Yellow Line */}
            <div className="absolute -bottom-2 left-0 w-full h-1 overflow-hidden">
              <div className="h-full bg-primary animate-underline-slide"></div>
            </div>
          </h1>
        </div>

        {/* Tagline */}
        <p
          className={`text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-400 leading-relaxed ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          In this house, we don't just belong. We create, we inspire, and we lead.
        </p>

        {/* CTA Button */}
        <div
          className={`flex justify-center items-center transition-all duration-1000 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button 
            onClick={() => {
              const videoSection = document.getElementById('video-section')
              videoSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bg-primary hover:bg-primary/90 text-black px-8 py-6 text-lg font-semibold rounded-lg"
          >
            Explore House
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes underline-slide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-underline-slide {
          animation: underline-slide 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
