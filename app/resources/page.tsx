"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function Resources() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true'
    setIsAuthenticated(authStatus)
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 min-h-screen">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
        </div>
        <div className="max-w-2xl w-full text-center relative">
          <div className="glass p-16 rounded-2xl border border-primary/20 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            {!isAuthenticated ? (
              <>
                <div className="w-24 h-24 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-serif font-bold text-white mb-6">Resources Access</h1>
                <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
                  Please sign in with your IIT Madras account to access study resources and materials
                </p>
                <Button 
                  onClick={() => router.push('/signin')}
                  className="bg-primary hover:bg-primary/90 text-black font-bold text-lg px-10 py-6 rounded-xl"
                >
                  Sign In to Access
                </Button>
              </>
            ) : (
              <>
                <div className="w-24 h-24 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h1 className="text-4xl font-serif font-bold text-white mb-6">Coming Soon</h1>
                <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
                  We're working on bringing you comprehensive study resources and materials. Stay tuned!
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
