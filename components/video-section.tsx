"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react"

export default function VideoSection() {
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentVideoUrl, setCurrentVideoUrl] = useState("")
  const [hasVideoError, setHasVideoError] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  useEffect(() => {
    const loadVideoUrl = async () => {
      try {
        const res = await fetch('/api/video-url', { cache: 'no-store' })
        if (!res.ok) throw new Error(`Unable to fetch video URL (${res.status})`)

        const json = await res.json()
        if (json?.url) {
          setCurrentVideoUrl(json.url)
          setHasVideoError(false)
          return
        }
      } catch (error) {
        console.warn('Falling back to static video URL:', error)
      }

      setCurrentVideoUrl('https://zoamjyrqlfze4djm.public.blob.vercel-storage.com/Landing_Video.mp4')
      setHasVideoError(false)
    }

    loadVideoUrl()
  }, [])

  const handleVideoError = () => {
    console.warn("Video failed to load")
    setHasVideoError(true)
  }

  const toggleAutoplay = () => {
    if (!videoRef.current) return

    if (isAutoplayPaused) {
      videoRef.current.play().catch(e => console.warn("Play failed:", e))
    } else {
      videoRef.current.pause()
    }

    setIsAutoplayPaused(!isAutoplayPaused)
  }

  const toggleMute = () => {
    if (!videoRef.current) return

    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        duration
      )
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 10,
        0
      )
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width

    videoRef.current.currentTime = percentage * duration
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progressPercentage =
    duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section id="video-section" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4 border border-primary/20">
            Immersive Experience
          </span>

          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
            Life at <span className="text-primary italic">Nallamala</span>
          </h2>

          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover the vibrant community, sacred traditions, and unforgettable moments that define our spirit.
          </p>
        </div>

        <div className="relative group max-w-5xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-transparent backdrop-blur-sm shadow-2xl transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-primary/5">

            {currentVideoUrl && !hasVideoError ? (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                onError={handleVideoError}
                onClick={toggleAutoplay}
                className="w-full aspect-video object-cover cursor-pointer"
                src={currentVideoUrl}
              />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center bg-transparent">
                <p className="text-white/70 text-sm">Video is currently unavailable.</p>
              </div>
            )}

            {/* Premium Controls Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">

              {/* Progress Bar Container */}
              <div
                ref={progressRef}
                onClick={handleProgressClick}
                className="w-full h-1 bg-white/20 rounded-full cursor-pointer mb-6 group/progress relative"
              >
                <div
                  className="h-full bg-primary rounded-full transition-all duration-150 relative"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow-lg shadow-primary/50"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-6">
                  <button
                    onClick={toggleAutoplay}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary hover:text-black hover:scale-110 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300"
                    aria-label={isAutoplayPaused ? "Play" : "Pause"}
                  >
                    {isAutoplayPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={skipBackward}
                      className="p-2 text-white/70 hover:text-white transition-colors"
                      title="Rewind 10s"
                    >
                      <SkipBack size={20} />
                    </button>

                    <button
                      onClick={skipForward}
                      className="p-2 text-white/70 hover:text-white transition-colors"
                      title="Forward 10s"
                    >
                      <SkipForward size={20} />
                    </button>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="p-2 text-white/70 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>

                  <div className="hidden md:block h-4 w-px bg-white/20 mx-2"></div>

                  <span className="text-white/90 text-sm font-medium tabular-nums">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="hidden sm:block" />
              </div>
            </div>

            {/* Center Play Button (appear when paused) */}
            {isAutoplayPaused && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center animate-ping absolute"></div>
                <div className="w-20 h-20 rounded-full bg-primary text-black flex items-center justify-center relative">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}