"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
      <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Sanskrit Motto */}
        <div
          className={`mb-6 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-primary text-lg font-serif italic tracking-wide">वसुधैव कुटुम्बकम् - The World is One Family</p>
        </div>

        {/* Main Title */}
        <h1
          className={`text-6xl md:text-7xl font-serif font-bold text-white mb-6 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Nallamala{" "}
          <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
            House
          </span>
        </h1>

        {/* Tagline */}
        <p
          className={`text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-400 leading-relaxed ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          In this house, we don't just belong. We create, we inspire, and we lead.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button className="bg-primary hover:bg-primary/90 text-black px-8 py-6 text-lg font-semibold rounded-lg">
            Explore House
          </Button>
          <Button
            variant="outline"
            className="border-primary/50 hover:border-primary text-white px-8 py-6 text-lg font-semibold rounded-lg flex items-center space-x-2 bg-transparent"
          >
            <Play size={20} />
            <span>Watch Video</span>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-primary text-sm">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary/60 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
