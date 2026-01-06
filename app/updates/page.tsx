"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import UpdatesSection from "@/components/updates-section"

export default function Updates() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <UpdatesSection />
      </div>
      <Footer />
    </main>
  )
}
