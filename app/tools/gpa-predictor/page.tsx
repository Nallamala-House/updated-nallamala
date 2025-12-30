"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function GPAPredictor() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    if (!isAuthenticated) {
      router.push('/signin')
    }
  }, [router])

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl w-full text-center">
          {/* Background animations */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20"></div>
          </div>

          <div className="glass-dark p-12 rounded-2xl border border-primary/30">
            <Link 
              href="/tools"
              className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors mb-6"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Tools
            </Link>
            
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-serif font-bold text-white mb-4">GPA Predictor</h1>
            <p className="text-white/70 text-lg mb-8">
              Predict your future GPA and plan your academic goals
            </p>
            <div className="inline-block px-8 py-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-primary text-xl font-bold">🚀 Coming Soon!</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
