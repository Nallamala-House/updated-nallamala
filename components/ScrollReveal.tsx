"use client"
 
import { useEffect, useRef, useState, ReactNode } from "react"
 
interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number // animation delay in ms
  threshold?: number // trigger threshold
  variant?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-up'
  duration?: number // animation duration in ms
}
 
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.05,
  variant = "slide-up",
  duration = 1000,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(false)
 
  useEffect(() => {
    const element = elementRef.current
    if (!element) {
      setMounted(true)
      setIsIntersecting(true)
      return
    }
 
    // Synchronous viewport check to batch updates and eliminate hydration-to-mount flicker
    const rect = element.getBoundingClientRect()
    const inViewport = rect.top < (window.innerHeight || 800) && rect.bottom > 0
 
    setMounted(true)
    if (inViewport) {
      setIsIntersecting(true)
    }
 
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.unobserve(element)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px", // Trigger slightly before entering viewport
      }
    )
 
    // Only register intersection observer if it's not already visible in current viewport
    if (!inViewport) {
      observer.observe(element)
    }
 
    return () => {
      observer.disconnect()
    }
  }, [threshold])
 
  // If not mounted yet (server-side & initial client paint), keep it fully visible for SEO & JS-disabled users
  if (!mounted) {
    return <div className={className}>{children}</div>
  }
 
  return (
    <div
      ref={elementRef}
      className={`scroll-reveal-container variant-${variant} ${isIntersecting ? "animate-in" : ""} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}
