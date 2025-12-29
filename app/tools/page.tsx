"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function Tools() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true'
    setIsAuthenticated(authStatus)
  }, [])

  const tools = [
    {
      title: "GPA Calculator",
      description: "Calculate course grades and semester GPA with ease.",
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      link: "/tools/gpa-calculator"
    },
    {
      title: "GPA Predictor",
      description: "Quickly predict your grades and plan ahead.",
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: "/tools/gpa-predictor"
    }
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20"></div>
      </div>

      {!isAuthenticated ? (
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 min-h-screen">
          <div className="max-w-2xl w-full text-center">
            <div className="glass-dark p-16 rounded-2xl border border-primary/30">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl font-serif font-bold text-white mb-6">Tools Access</h1>
              <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
                Please sign in with your IIT Madras account to access academic tools and calculators
              </p>
              <Button 
                onClick={() => router.push('/signin')}
                className="bg-primary hover:bg-primary/90 text-black font-bold text-lg px-10 py-6 rounded-xl"
              >
                Sign In to Access
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-widest mb-4">Academic Tools</p>
            <h1 className="text-5xl font-serif font-bold text-white mb-4">
              Student <span className="text-primary">Tools</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Essential tools to help you manage and predict your academic performance
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tools.map((tool, index) => (
              <Link 
                key={index}
                href={tool.link}
                className="group"
              >
                <div className="glass-dark p-10 rounded-2xl border-2 border-primary/20 hover:border-primary/60 transition-all duration-300 h-full flex flex-col items-center text-center hover:-translate-y-2">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-white/70 text-base leading-relaxed mb-6 flex-1">
                    {tool.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <span>Open Now</span>
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
