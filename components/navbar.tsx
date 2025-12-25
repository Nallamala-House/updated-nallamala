"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Updates", href: "/updates" },
    { label: "Events", href: "/events" },
    { label: "Blogs", href: "/blogs" },
    { label: "Communities", href: "/communities" },
    { label: "Council & Team", href: "/council" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-lg border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src="/images/nallamala_house_iit_madras_logo.jpg" 
                alt="Nallamala House Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden sm:inline text-white font-serif font-bold">Nallamala House</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-white/80 hover:text-primary transition rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Link href="/signin">
              <Button className="hidden sm:flex bg-primary hover:bg-primary/90 text-black font-semibold">
                Sign In
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white hover:text-primary transition">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-black/50 backdrop-blur-lg border-t border-primary/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-white/80 hover:text-primary hover:bg-white/5 rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/signin" onClick={() => setIsOpen(false)} className="block">
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-black font-semibold">Sign In</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
