"use client"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import VideoSection from "@/components/video-section"
import AboutSection from "@/components/about-section"
import RegionalCarousel from "@/components/regional-carousel"
import CommunitiesSection from "@/components/communities-section"
import UpdatesSection from "@/components/updates-section"
import EventsSection from "@/components/events-section"
import BlogsSection from "@/components/blogs-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <AboutSection />
      <RegionalCarousel />
      <CommunitiesSection />
      <UpdatesSection />
      <EventsSection />
      <BlogsSection />
      <Footer />
    </main>
  )
}
