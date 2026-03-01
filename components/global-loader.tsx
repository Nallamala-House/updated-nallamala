"use client"

import { useEffect, useState, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { LoadingCube } from "./loading-cube"

export function RouteTransitionLoader() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isNavigating, setIsNavigating] = useState(false)

    // Listen for custom navigation events (like from Navbar buttons)
    useEffect(() => {
        const handleStartNavigation = () => setIsNavigating(true)
        window.addEventListener("start-navigation", handleStartNavigation)
        return () => window.removeEventListener("start-navigation", handleStartNavigation)
    }, [])

    // Every time the URL changes, we stop the loading animation.
    useEffect(() => {
        setIsNavigating(false)
    }, [pathname, searchParams])

    // Listen for clicks on internal links to trigger the loading animation
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Find the closest anchor tag
            const target = (e.target as Element).closest('a')

            // If no valid target or target doesn't have an href, skip
            if (!target || !target.href) return

            const href = target.getAttribute('href')

            // Skip off-site links, anchors (#), or new tabs
            if (
                target.target === '_blank' ||
                target.hasAttribute('download') ||
                (href && href.startsWith('#')) ||
                (href && href.startsWith('mailto:')) ||
                (href && href.startsWith('tel:'))
            ) {
                return
            }

            // Check if it's an internal link
            try {
                const url = new URL(target.href)
                // Check if destination is the same origin, but a different URL
                if (
                    url.origin === window.location.origin &&
                    url.pathname !== window.location.pathname
                ) {
                    setIsNavigating(true)
                }
            } catch (err) {
                // Fallback for relative simple hrefs that didn't parse
                if (href && href.startsWith('/') && href !== pathname) {
                    setIsNavigating(true)
                }
            }
        }

        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [pathname])

    if (!isNavigating) return null

    // Just the cube animation, no text
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[100]">
            <LoadingCube />
        </div>
    )
}

export function GlobalLoader() {
    return (
        <Suspense fallback={null}>
            <RouteTransitionLoader />
        </Suspense>
    )
}
