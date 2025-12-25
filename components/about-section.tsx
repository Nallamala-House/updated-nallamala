"use client"

import { useState, useEffect, useRef } from "react"

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

export default function AboutSection() {
  const stats = [
    { end: 4500, label: "Active Members", suffix: "+" },
    { end: 50, label: "Distinguished Alumni", suffix: "+" },
    { end: 5, label: "Active Communities", suffix: "" },
    { end: 120, label: "Events Hosted", suffix: "+" },
    { end: 15, label: "Team Size", suffix: "+" },
    { end: 100, label: "Meetups Organized", suffix: "+" },
  ]

  const animatedStats = stats.map(stat => ({
    ...stat,
    animation: useCountAnimation(stat.end)
  }))
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">About Us</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            A Community of <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Nallamala House stands as a beacon of prestige and community at IIT Madras, fostering innovation,
            leadership, and lifelong bonds among its residents.
          </p>
        </div>

        {/* About Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-white">Our Mission</h3>
              <p className="text-white/70 leading-relaxed">
                We are committed to creating an environment where students not only pursue academic excellence but also
                develop as leaders, innovators, and responsible global citizens.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-white">Our Values</h3>
              <ul className="space-y-3">
                {[
                  "Unity & Inclusivity",
                  "Excellence in All Endeavors",
                  "Innovation & Creativity",
                  "Leadership & Impact",
                ].map((value) => (
                  <li key={value} className="flex items-center space-x-3 text-white/80">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {animatedStats.map((stat, index) => (
              <div
                key={stat.label}
                ref={stat.animation.elementRef}
                className="glass-dark p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 text-center group"
              >
                <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  {stat.animation.count}{stat.suffix}
                </div>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
