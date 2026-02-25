import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import dynamic from "next/dynamic"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"

const VideoSection    = dynamic(() => import("@/components/video-section"),    { loading: () => <div className="h-96 bg-black/20 animate-pulse rounded-xl" /> })
const AboutSection    = dynamic(() => import("@/components/about-section"),    { loading: () => <div className="h-64 bg-black/20 animate-pulse rounded-xl" /> })
const RegionalCarousel = dynamic(() => import("@/components/regional-carousel"), { loading: () => <div className="h-48 bg-black/20 animate-pulse rounded-xl" /> })
const UpdatesSection  = dynamic(() => import("@/components/updates-section"),  { loading: () => <div className="h-64 bg-black/20 animate-pulse rounded-xl" /> })

export default async function Page() {
  // cookies() IS ASYNC in Next 16
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // if (!session) {
  //   redirect("/signin")
  // }

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <AboutSection />
      <UpdatesSection />
      <RegionalCarousel />
      <Footer />
    </main>
  )
}
