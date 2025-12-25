"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      router.push("/")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-black flex flex-col">
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
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary to-primary/60 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-black font-bold text-lg font-serif">🦁</span>
                </div>
              </Link>
              <h1 className="text-3xl font-serif font-bold text-white mb-2">Join Us</h1>
              <p className="text-white/70">Create your Nallamala account today</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" size={18} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-primary/20 rounded-lg text-white placeholder:text-white/40 focus:border-primary/60 focus:bg-white/10 transition-all duration-300 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" size={18} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-primary/20 rounded-lg text-white placeholder:text-white/40 focus:border-primary/60 focus:bg-white/10 transition-all duration-300 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" size={18} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 bg-white/5 border border-primary/20 rounded-lg text-white placeholder:text-white/40 focus:border-primary/60 focus:bg-white/10 transition-all duration-300 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" size={18} />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 bg-white/5 border border-primary/20 rounded-lg text-white placeholder:text-white/40 focus:border-primary/60 focus:bg-white/10 transition-all duration-300 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary transition"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start space-x-2 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-white/10 border border-primary/30 rounded checked:bg-primary mt-1"
                  required
                />
                <span className="text-white/70">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:text-primary/80">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-white/70 text-sm mt-6">
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
