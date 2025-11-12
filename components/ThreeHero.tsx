// Client-only React Three Fiber scene with IntersectionObserver pause and useReducedMotion
'use client'
import { Html, OrbitControls, Sparkles } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { Suspense, useEffect, useRef, useState } from 'react'
import type { Mesh } from 'three'

function FloatingGlyph() {
  const ref = useRef<Mesh>(null)
  const reduce = useReducedMotion()

  useFrame((state) => {
    if (!ref.current || reduce) return
    ref.current.rotation.y += 0.003
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.06
  })

  return (
    <mesh ref={ref} rotation={[0.2, 1.2, 0]}>
      <icosahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial metalness={0.8} roughness={0.15} color="#00FFC8" />
    </mesh>
  )
}

export default function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  // Pause 3D canvas when off-screen using IntersectionObserver
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full h-[60vh] md:h-[80vh] relative">
      {isVisible && (
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 4, 4]} intensity={1} />
          <Suspense
            fallback={
              <Html center>
                <div className="w-32 h-32 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
                </div>
              </Html>
            }
          >
            <FloatingGlyph />
            <Sparkles count={40} size={6} />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      )}
    </div>
  )
}
