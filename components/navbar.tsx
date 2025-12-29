"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [councilDropdown, setCouncilDropdown] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true'
    setIsAuthenticated(authStatus)

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCouncilDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAuthAction = () => {
    if (isAuthenticated) {
      // Sign out
      localStorage.removeItem('isAuthenticated')
      setIsAuthenticated(false)
      router.push('/')
    } else {
      // Sign in
      router.push('/signin')
    }
  }

  const navItemsBefore = [
    { label: "Home", href: "/" },
    { label: "Updates", href: "/updates" },
    { label: "Events", href: "/events" },
    { label: "Blogs", href: "/blogs" },
  ]

  const navItemsAfter = [
    { label: "Communities", href: "/communities" },
    { label: "Queries", href: "/queries" },
    { label: "Tools", href: "/tools" },
    { label: "Resources", href: "/resources" },
  ]

  const councilYears = [
    { year: "Present", href: "/council?year=2025-26", external: false },
    { year: "2024-25", href: "/council?year=2024-25", external: false },
    { year: "2023-24", href: "https://sites.google.com/student.onlinedegree.iitm.ac.in/nallamala/house-council/2023-24", external: true },
    { year: "2022-23", href: "https://sites.google.com/student.onlinedegree.iitm.ac.in/nallamala/house-council/2022-23", external: true },
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
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItemsBefore.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-white/80 hover:text-primary transition rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Council Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCouncilDropdown(!councilDropdown)}
                className="px-4 py-2 text-sm text-white/80 hover:text-primary transition rounded-lg hover:bg-white/5 flex items-center gap-1"
              >
                Council & Team
                <ChevronDown size={16} className={`transition-transform ${councilDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {councilDropdown && (
                <div className="absolute top-full mt-2 w-48 glass-dark rounded-lg border border-primary/30 overflow-hidden shadow-xl">
                  {councilYears.map((item) => (
                    item.external ? (
                      <a
                        key={item.year}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setCouncilDropdown(false)}
                        className="block px-4 py-3 text-sm text-white/80 hover:text-primary hover:bg-white/5 transition border-b border-white/5 last:border-b-0"
                      >
                        {item.year}
                      </a>
                    ) : (
                      <Link
                        key={item.year}
                        href={item.href}
                        onClick={() => setCouncilDropdown(false)}
                        className="block px-4 py-3 text-sm text-white/80 hover:text-primary hover:bg-white/5 transition border-b border-white/5 last:border-b-0"
                      >
                        {item.year}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>

            {navItemsAfter.map((item) => (
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
            <Button 
              onClick={handleAuthAction}
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-black font-semibold"
            >
              {isAuthenticated ? 'Sign Out' : 'Sign In'}
            </Button>

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
              
              {/* Council Mobile Submenu */}
              <div className="pt-2 border-t border-white/10">
                <p className="px-3 py-2 text-white/60 text-xs uppercase tracking-wider">Council & Team</p>
                {councilYears.map((item) => (
                  item.external ? (
                    <a
                      key={item.year}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 pl-6 text-white/80 hover:text-primary hover:bg-white/5 rounded-lg transition text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.year}
                    </a>
                  ) : (
                    <Link
                      key={item.year}
                      href={item.href}
                      className="block px-3 py-2 pl-6 text-white/80 hover:text-primary hover:bg-white/5 rounded-lg transition text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.year}
                    </Link>
                  )
                ))}
              </div>

              {navItemsAfter.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-white/80 hover:text-primary hover:bg-white/5 rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Button 
                onClick={() => {
                  handleAuthAction()
                  setIsOpen(false)
                }} 
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-black font-semibold"
              >
                {isAuthenticated ? 'Sign Out' : 'Sign In'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
