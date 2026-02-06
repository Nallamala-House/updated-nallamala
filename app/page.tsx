import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import VideoSection from "@/components/video-section"
import AboutSection from "@/components/about-section"
import RegionalCarousel from "@/components/regional-carousel"
import UpdatesSection from "@/components/updates-section"
import Footer from "@/components/footer"

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
