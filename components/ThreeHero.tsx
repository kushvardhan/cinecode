// components/ThreeHero.tsx
'use client'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Sparkles } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'

function FloatingGlyph() {
  const ref = useRef<unknown>()
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

export default function ThreeHero({ fallback = '/hero-poster.jpg' }: { fallback?: string }) {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={1} />
        <Suspense fallback={<Html><img src={fallback} alt="hero poster" /></Html>}>
          <FloatingGlyph />
          <Sparkles count={40} size={6} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
