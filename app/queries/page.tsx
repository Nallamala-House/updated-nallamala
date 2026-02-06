"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"

export default function Queries() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
      setLoading(false)

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session)
      })

      return () => subscription.unsubscribe()
    }

    checkAuth()
  }, [])

  // Prevent UI flickering while checking session
  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 min-h-screen">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="max-w-2xl w-full text-center relative z-10">
          <div className="glass p-16 rounded-2xl border border-primary/20 shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-black/40 backdrop-blur-md">
            {!isAuthenticated ? (
              <>
                <div className="w-24 h-24 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-serif font-bold text-white mb-6">Queries Access</h1>
                <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
                  Please sign in with your IIT Madras account to access queries and get your questions answered
                </p>
                <Button 
                  onClick={() => router.push('/signin')}
                  className="bg-primary hover:bg-primary/90 text-black font-bold text-lg px-10 py-6 rounded-xl transition-all active:scale-95"
                >
                  Sign In to Access
                </Button>
              </>
            ) : (
              <>
                <div className="w-24 h-24 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-serif font-bold text-white mb-6">Coming Soon</h1>
                <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
                  We're working on bringing you a comprehensive Q&A platform. Stay tuned for updates!
                </p>
                <Button 
                  onClick={() => router.push('/tools')}
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10 font-bold px-8 py-4 rounded-xl"
                >
                  Explore Other Tools
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}