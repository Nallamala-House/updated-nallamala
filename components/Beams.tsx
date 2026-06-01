"use client"

import { useEffect, useRef } from "react"

interface BeamsProps {
  beamWidth?: number
  beamHeight?: number
  beamNumber?: number
  lightColor?: string
  speed?: number
  noiseIntensity?: number
  scale?: number
  rotation?: number
}

export default function Beams({
  beamWidth = 3.3,
  beamHeight = 30,
  beamNumber = 16,
  lightColor = "#ffd700",
  speed = 1.8,
  noiseIntensity = 1.5,
  scale = 0.2,
  rotation = 30,
}: BeamsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    // 1. Forest light rays (Gold & Emerald canopy sunbeams)
    const beams: Array<{
      x: number
      y: number
      w: number
      h: number
      opacity: number
      speedY: number
      phase: number
      phaseSpeed: number
      angle: number
      color: "gold" | "emerald"
    }> = []

    for (let i = 0; i < beamNumber; i++) {
      beams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        w: (Math.random() * 24 + 8) * beamWidth,
        h: (Math.random() * 160 + 120) * beamHeight * scale,
        opacity: Math.random() * 0.22 + 0.08,
        speedY: (Math.random() * 0.25 + 0.1) * speed,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.008 + 0.003,
        angle: (rotation * Math.PI) / 180 + (Math.random() * 0.08 - 0.04),
        color: Math.random() > 0.55 ? "emerald" : "gold",
      })
    }

    // 2. Glowing Forest Fireflies (Amber-Emerald organic pulses)
    const fireflies: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      phase: number
      phaseSpeed: number
      baseOpacity: number
      color: string
    }> = []

    const fireflyCount = Math.min(Math.floor(width / 35), 45)
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1.2,
        speedX: (Math.random() * 0.4 - 0.2) * speed,
        speedY: (Math.random() * 0.4 - 0.2) * speed,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.02 + 0.01,
        baseOpacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "rgba(212, 175, 55, " : "rgba(52, 211, 153, ", // Gold or Emerald green
      })
    }

    // 3. Falling Leaves (Elegant organic drifting shapes)
    const leaves: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      angle: number
      spinSpeed: number
      opacity: number
      swayRange: number
      swaySpeed: number
      color: "gold" | "emerald"
    }> = []

    const leafCount = Math.min(Math.floor(width / 75), 18)
    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * -height, // Start above screen
        size: Math.random() * 7 + 4,
        speedX: (Math.random() * 0.3 + 0.1) * speed, // Drift to the right
        speedY: (Math.random() * 0.5 + 0.35) * speed, // Fall downwards
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() * 0.015 - 0.0075) * speed,
        opacity: Math.random() * 0.35 + 0.15,
        swayRange: Math.random() * 30 + 15,
        swaySpeed: Math.random() * 0.008 + 0.004,
        color: Math.random() > 0.6 ? "gold" : "emerald",
      })
    }

    // Draw stylized leaf helper
    const drawLeaf = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      opacity: number,
      color: "gold" | "emerald"
    ) => {
      c.save()
      c.translate(x, y)
      c.rotate(angle)
      
      const gradient = c.createRadialGradient(0, 0, 0, 0, 0, size)
      if (color === "gold") {
        gradient.addColorStop(0, `rgba(212, 175, 55, ${opacity})`)
        gradient.addColorStop(1, `rgba(184, 134, 11, ${opacity * 0.3})`)
      } else {
        gradient.addColorStop(0, `rgba(16, 185, 129, ${opacity})`)
        gradient.addColorStop(1, `rgba(4, 120, 87, ${opacity * 0.3})`)
      }
      
      c.fillStyle = gradient
      c.beginPath()
      // Draw simple curved organic leaf shape
      c.moveTo(0, -size)
      c.quadraticCurveTo(size * 0.7, -size * 0.2, size * 0.1, size)
      c.quadraticCurveTo(-size * 0.7, -size * 0.2, 0, -size)
      c.closePath()
      c.fill()
      
      c.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // --- 1. Render Forest Rays ---
      beams.forEach((beam) => {
        // Update beam parameters
        beam.y -= beam.speedY
        beam.phase += beam.phaseSpeed * noiseIntensity

        // Wrap around vertically
        if (beam.y + beam.h < 0) {
          beam.y = height + beam.h
          beam.x = Math.random() * width
        }

        ctx.save()
        ctx.translate(beam.x, beam.y)
        ctx.rotate(beam.angle)

        const gradient = ctx.createLinearGradient(0, 0, 0, beam.h)
        const alpha = (Math.sin(beam.phase) * 0.45 + 0.55) * beam.opacity

        if (beam.color === "emerald") {
          // Emerald Green Ray
          gradient.addColorStop(0, "rgba(6, 95, 70, 0)")
          gradient.addColorStop(0.35, `rgba(16, 185, 129, ${alpha * 0.6})`)
          gradient.addColorStop(0.65, `rgba(52, 211, 153, ${alpha})`)
          gradient.addColorStop(1, "rgba(4, 120, 87, 0)")
          ctx.shadowColor = "#34d399"
        } else {
          // Luxury Gold Ray
          gradient.addColorStop(0, "rgba(212, 175, 55, 0)")
          gradient.addColorStop(0.35, `rgba(212, 175, 55, ${alpha * 0.85})`)
          gradient.addColorStop(0.65, `rgba(255, 215, 0, ${alpha})`)
          gradient.addColorStop(1, "rgba(212, 175, 55, 0)")
          ctx.shadowColor = lightColor
        }

        ctx.fillStyle = gradient
        ctx.shadowBlur = 45
        ctx.fillRect(-beam.w / 2, 0, beam.w, beam.h)
        ctx.restore()
      })

      // --- 2. Render Forest Fireflies ---
      fireflies.forEach((firefly) => {
        firefly.x += firefly.speedX
        firefly.y += firefly.speedY
        firefly.phase += firefly.phaseSpeed

        // Wrap around borders gracefully
        if (firefly.x < -10) firefly.x = width + 10
        if (firefly.x > width + 10) firefly.x = -10
        if (firefly.y < -10) firefly.y = height + 10
        if (firefly.y > height + 10) firefly.y = -10

        const alpha = (Math.sin(firefly.phase) * 0.4 + 0.6) * firefly.baseOpacity
        
        ctx.save()
        ctx.beginPath()
        const radGrad = ctx.createRadialGradient(
          firefly.x, firefly.y, 0,
          firefly.x, firefly.y, firefly.size * 3.5
        )
        radGrad.addColorStop(0, `${firefly.color}${alpha})`)
        radGrad.addColorStop(0.4, `${firefly.color}${alpha * 0.35})`)
        radGrad.addColorStop(1, `${firefly.color}0)`)
        
        ctx.fillStyle = radGrad
        ctx.arc(firefly.x, firefly.y, firefly.size * 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // --- 3. Render Drifting Leaves ---
      leaves.forEach((leaf) => {
        // Fall down, drift, and sway
        leaf.y += leaf.speedY
        leaf.angle += leaf.spinSpeed
        
        // Horizontal sway calculation
        const sway = Math.sin(leaf.y * leaf.swaySpeed) * leaf.swayRange
        const currentX = leaf.x + sway

        // Reset if leaf drifts off screen
        if (leaf.y > height + 20 || currentX > width + 20 || currentX < -20) {
          leaf.y = -40
          leaf.x = Math.random() * width
          leaf.angle = Math.random() * Math.PI * 2
          leaf.opacity = Math.random() * 0.35 + 0.15
        }

        drawLeaf(ctx, currentX, leaf.y, leaf.size, leaf.angle, leaf.opacity, leaf.color)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [beamWidth, beamHeight, beamNumber, lightColor, speed, noiseIntensity, scale, rotation])

  return <canvas ref={canvasRef} className="w-full h-full block" />
}
