"use client"

import { useRef, Suspense, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

// 1. Separate presentation component for the rotated cube
function RotatingTexturedCube({ textureUrl }: { textureUrl: string }) {
    const meshRef = useRef<THREE.Mesh>(null!)

    // Drei's useTexture handles loading via Suspense properly
    const texture = useTexture(textureUrl)

    // Apply texture orientation fixes after load
    useEffect(() => {
        texture.colorSpace = THREE.SRGBColorSpace
        texture.flipY = true
        texture.needsUpdate = true
    }, [texture])

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Smooth continuous rotation on multiple axes
            meshRef.current.rotation.x += delta * 0.4
            meshRef.current.rotation.y += delta * 0.6
        }
    })

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            {/* 
        Single material maps to all 6 sides by default on a BoxGeometry.
        We add physical properties to make it look nicer with lights.
      */}
            <meshStandardMaterial
                map={texture}
                roughness={0.4}
                metalness={0.2}
            />
        </mesh>
    )
}

// 2. Production level container with proper Suspense boundaries and lighting
export function LoadingCube() {
    return (
        <div className="w-48 h-48 sm:w-64 sm:h-64 relative cursor-default">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 2]} // Support high-DPI displays safely
                gl={{ antialias: true }}
            >
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 10, 5]} intensity={2.5} />
                <pointLight position={[-5, -5, -5]} intensity={1.5} />

                {/* Suspense is required when using useTexture or useLoader to avoid unhandled promise rejections */}
                <Suspense fallback={null}>
                    <RotatingTexturedCube textureUrl="/images/loading_nallamala.jpg" />
                </Suspense>
            </Canvas>
        </div>
    )
}
