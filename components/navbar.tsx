"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [councilDropdown, setCouncilDropdown] = useState(false)
  const [mobileCouncilOpen, setMobileCouncilOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollYRef = useRef(0)
 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const lastScrollY = lastScrollYRef.current
      
      // 1. Scroll Progress Bar
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        const currentProgress = (currentScrollY / totalScroll) * 100
        setScrollProgress(currentProgress)
      }
 
      // 2. Hide/Show logic with a 10px scroll threshold to avoid jittery state updates
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY - 8 || currentScrollY <= 20) {
        setIsVisible(true)
      }
      
      lastScrollYRef.current = currentScrollY
    }
 
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const router = useRouter()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"

  // ============================
  // CLICK OUTSIDE HANDLER
  // ============================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCouncilDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // ============================
  // AUTH ACTION
  // ============================
  const handleAuthAction = async () => {
    if (isAuthenticated) {
      await signOut({ redirect: false })
      window.dispatchEvent(new Event("start-navigation"))
      router.push("/")
    } else {
      window.dispatchEvent(new Event("start-navigation"))
      router.push("/signin")
    }
  }

  // ============================
  // NAV ITEMS
  // ============================
  const navItemsBefore = [
    { label: "Home", href: "/" },
    { label: "Updates", href: "/updates" },
    { label: "Events", href: "/events" },
    { label: "Blogs", href: "/blogs" },
  ]

  const navItemsAfter = [
    { label: "Communities", href: "/communities" },
    { label: "Queries", href: "/queries", protected: true },
    { label: "Tools", href: "/tools", protected: true },
    { label: "Resources", href: "/resources", protected: true },
  ]

  const councilYears = [
    { year: "Present", href: "/council?year=2025-26", external: false },
    { year: "2024-25", href: "/council?year=2024-25", external: false },
    {
      year: "2023-24",
      href: "https://sites.google.com/student.onlinedegree.iitm.ac.in/nallamala/house-council/2023-24",
      external: true,
    },
    {
      year: "2022-23",
      href: "https://sites.google.com/student.onlinedegree.iitm.ac.in/nallamala/house-council/2022-23",
      external: true,
    },
  ]

  // ============================
  // PROTECTED NAV HANDLER (FIXED)
  // ============================
  const handleProtectedNav = (href: string, protectedRoute?: boolean) => {
    if (protectedRoute && !isAuthenticated) {
      window.dispatchEvent(new Event("start-navigation"))
      router.push("/signin")
      return
    }

    if (pathname !== href) {
      window.dispatchEvent(new Event("start-navigation"))
    }
    router.push(href)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-transform duration-500 ease-in-out bg-black/15 backdrop-blur-md border-b border-primary/10 shadow-[0_4px_30px_rgba(0,0,0,0.15)] ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-100 ease-out shadow-[0_0_10px_rgba(212,175,55,0.9)]"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
 
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30">
              <img
                src="/images/loading_nallamala.jpg"
                alt="Nallamala House Logo"
                className="w-full h-full object-cover animate-[spin_18s_linear_infinite]"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItemsBefore.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 text-sm transition-all duration-300 rounded-lg relative ${
                    isActive ? "text-primary bg-white/5 font-bold" : "text-white/80 hover:text-primary hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)] animate-fade-in" />
                  )}
                </Link>
              )
            })}

            {/* Council Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCouncilDropdown(!councilDropdown)}
                className="px-4 py-2 text-sm text-white/80 hover:text-primary hover:bg-white/5 rounded-lg flex items-center gap-1"
              >
                Council & Team
                <ChevronDown
                  size={16}
                  className={`transition-transform ${councilDropdown ? "rotate-180" : ""
                    }`}
                />
              </button>

              {councilDropdown && (
                <div className="absolute top-full mt-2 w-48 bg-black border border-primary/30 rounded-lg shadow-xl">
                  {councilYears.map((item) =>
                    item.external ? (
                      <a
                        key={item.year}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-sm text-white/80 hover:text-primary hover:bg-white/5"
                      >
                        {item.year}
                      </a>
                    ) : (
                      <Link
                        key={item.year}
                        href={item.href}
                        onClick={() => setCouncilDropdown(false)}
                        className="block px-4 py-3 text-sm text-white/80 hover:text-primary hover:bg-white/5"
                      >
                        {item.year}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            {navItemsAfter.map((item) => {
              const isActive = pathname === item.href
              return (
                <button
                  key={item.label}
                  onClick={() => handleProtectedNav(item.href, item.protected)}
                  className={`px-4 py-2 text-sm transition-all duration-300 rounded-lg relative cursor-pointer ${
                    isActive ? "text-primary bg-white/5 font-bold" : "text-white/80 hover:text-primary hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)] animate-fade-in" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button
              onClick={handleAuthAction}
              className="hidden sm:flex bg-primary text-black font-semibold"
            >
              {isAuthenticated ? "Sign Out" : "Sign In"}
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-primary/20 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItemsBefore.map((item: any) => (
                <button
                  key={item.label}
                  onClick={() => {
                    handleProtectedNav(item.href, item.protected)
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-4 py-3 text-white/80 hover:text-primary hover:bg-white/5 rounded-lg text-base"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-1">
                <button
                  onClick={() => setMobileCouncilOpen(!mobileCouncilOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-white/90 hover:text-primary hover:bg-white/5 rounded-lg text-base"
                >
                  <span>Council & Team</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileCouncilOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {mobileCouncilOpen && (
                  <div className="mt-1 ml-2 pl-2 border-l border-primary/20 space-y-1">
                    {councilYears.map((item) =>
                      item.external ? (
                        <a
                          key={item.year}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-primary hover:bg-white/5 rounded-lg"
                        >
                          {item.year}
                        </a>
                      ) : (
                        <Link
                          key={item.year}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-primary hover:bg-white/5 rounded-lg"
                        >
                          {item.year}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>

              {navItemsAfter.map((item: any) => (
                <button
                  key={item.label}
                  onClick={() => {
                    handleProtectedNav(item.href, item.protected)
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-4 py-3 text-white/80 hover:text-primary hover:bg-white/5 rounded-lg text-base"
                >
                  {item.label}
                </button>
              ))}

              <Button
                onClick={() => {
                  handleAuthAction()
                  setIsOpen(false)
                }}
                className="w-full mt-6 bg-primary text-black font-semibold py-6 text-lg"
              >
                {isAuthenticated ? "Sign Out" : "Sign In"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
