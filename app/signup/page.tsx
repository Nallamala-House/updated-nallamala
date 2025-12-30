"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SignUp() {
  const router = useRouter()

  const handleGoogleSignUp = () => {
    // Add your Google OAuth logic here
    console.log("IIT Madras Sign Up clicked")
    // For testing: set a flag in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', 'true')
      router.push("/")
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="w-full max-w-md">
          {/* Background animations */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-20"></div>
          </div>

          {/* Form Container */}
          <div className="glass-dark p-8 rounded-2xl border border-primary/30 hover:border-primary/60 transition-all duration-300">
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center mx-auto">
                  <img 
                    src="/images/nallamala_house_iit_madras_logo.jpg" 
                    alt="Nallamala House Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <h1 className="text-3xl font-serif font-bold text-white mb-2">Join Us</h1>
              <p className="text-white/70">Create your Nallamala account</p>
            </div>

            {/* IIT Madras Sign Up Button */}
            <div className="space-y-6">
              <Button
                onClick={handleGoogleSignUp}
                type="button"
                className="w-full bg-white hover:bg-gray-100 text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with IIT Madras
              </Button>
              <p className="text-center text-white/50 text-xs">Use your study.iitm.ac.in account</p>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-primary/20"></div>
              <span className="text-white/40 text-sm">or continue with email</span>
              <div className="flex-1 h-px bg-primary/20"></div>
            </div>

            {/* Footer */}
            <p className="text-center text-white/70 text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:text-primary/80 transition font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
