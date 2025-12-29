"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { signInWithGoogle } from "@/lib/auth"

export default function Resources() {
  const { authenticated, loading } = useAuth()

  if (loading) return null

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center pt-20 px-4">
        {!authenticated ? (
          <div className="glass-dark p-16 rounded-2xl border border-primary/30 text-center">
            <h1 className="text-4xl font-serif font-bold text-white mb-6">
              Resources Access
            </h1>

            <p className="text-white/70 mb-10">
              Please sign in with your IIT Madras account to access study resources
            </p>

            <Button
              onClick={() => signInWithGoogle("/resources")}
              className="bg-primary text-black font-bold px-10 py-6 rounded-xl"
            >
              Sign In to Access
            </Button>
          </div>
        ) : (
          <div className="text-white text-2xl font-bold">
            ✅ Resources unlocked (Coming Soon)
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
