"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import VideoSection from "@/components/video-section"
import AboutSection from "@/components/about-section"
import RegionalCarousel from "@/components/regional-carousel"
import UpdatesSection from "@/components/updates-section"
import Footer from "@/components/footer"

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll(".scroll-animate")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <div className="scroll-animate">
        <VideoSection />
      </div>
      <div className="scroll-animate">
        <AboutSection />
      </div>
      <div className="scroll-animate">
        <UpdatesSection />
      </div>
      <div className="scroll-animate">
        <RegionalCarousel />
      </div>
      <Footer />
    </main>
  )
}
