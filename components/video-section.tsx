"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react"

function useCountAnimation(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime: number | null = null
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return { count, elementRef }
}

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const members = useCountAnimation(500)
  const events = useCountAnimation(50)
  const regions = useCountAnimation(7)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  const toggleAutoplay = () => {
    if (videoRef.current) {
      if (isAutoplayPaused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
      setIsAutoplayPaused(!isAutoplayPaused)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration)
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
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
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section id="video-section" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Experience</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Life at <span className="text-primary">Nallamala</span>
          </h2>
          <p className="text-white/70 text-lg">Discover the vibrant community and unforgettable moments</p>
        </div>

        {/* Autoplay Video */}
        <div className="relative group">
          <div className="relative w-full rounded-2xl overflow-hidden border-2 border-primary/30 hover:border-primary/60 transition-all duration-300">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              onClick={toggleAutoplay}
              className="w-full aspect-video object-cover cursor-pointer"
              src="/sample.mp4"
            />
            
            {/* Video Controls Overlay - Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Progress Bar */}
              <div 
                ref={progressRef}
                onClick={handleProgressClick}
                className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-3 hover:h-2 transition-all"
              >
                <div 
                  className="h-full bg-primary rounded-full transition-all relative"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                {/* Left Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleAutoplay}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition"
                    aria-label={isAutoplayPaused ? "Play" : "Pause"}
                  >
                    {isAutoplayPaused ? <Play size={16} /> : <Pause size={16} />}
                  </button>
                  
                  <button
                    onClick={skipBackward}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition"
                    aria-label="Skip backward 10 seconds"
                  >
                    <SkipBack size={16} />
                  </button>
                  
                  <button
                    onClick={skipForward}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition"
                    aria-label="Skip forward 10 seconds"
                  >
                    <SkipForward size={16} />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  {/* Time Display */}
                  <span className="text-white text-sm ml-2">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>

            {/* Border glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
