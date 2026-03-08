import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dynamic from "next/dynamic"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"

const VideoSection = dynamic(() => import("@/components/video-section"), { loading: () => <div className="h-96 bg-black/20 animate-pulse rounded-xl" /> })
const AboutSection = dynamic(() => import("@/components/about-section"), { loading: () => <div className="h-64 bg-black/20 animate-pulse rounded-xl" /> })
const RegionalCarousel = dynamic(() => import("@/components/regional-carousel"), { loading: () => <div className="h-48 bg-black/20 animate-pulse rounded-xl" /> })
const UpdatesSection = dynamic(() => import("@/components/updates-section"), { loading: () => <div className="h-64 bg-black/20 animate-pulse rounded-xl" /> })

export default async function Page() {
  const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect("/signin")
  // }

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <AboutSection />
      <UpdatesSection showSearch={false} />
      <RegionalCarousel />
      <Footer />
    </main>
  )
}
