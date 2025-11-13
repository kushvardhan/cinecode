'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function Spotlight({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const light = useRef<THREE.SpotLight | null>(null)
  const [target, setTarget] = useState<THREE.Object3D | null>(null)

  useEffect(() => {
    const t = new THREE.Object3D()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTarget(t)
    if (light.current) {
      light.current.intensity = 2.2
      light.current.penumbra = 0.6
      light.current.angle = Math.PI / 6
      light.current.distance = 20
      light.current.target = t
    }
  }, [])

  useFrame(() => {
    if (!light.current || !target) return
    const [mx, my] = mouse.current
    const x = THREE.MathUtils.lerp(light.current.position.x, mx * 6, 0.08)
    const y = THREE.MathUtils.lerp(light.current.position.y, my * 3 + 2, 0.08)
    light.current.position.set(x, y, 6)
    target.position.lerp(new THREE.Vector3(0, 0, 0), 0.06)
    target.updateMatrixWorld()
  })

  return (
    <>
      <spotLight
        ref={light}
        position={[0, 4, 6]}
        color={new THREE.Color('#fff6e6')}
        intensity={2.2}
        penumbra={0.6}
        angle={Math.PI / 6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {target && <primitive object={target} />}
    </>
  )
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color={new THREE.Color('#080808')} metalness={0.2} roughness={0.6} />
    </mesh>
  )
}

export default function SpotlightScene({ className }: { className?: string }) {
  const mouse = useRef<[number, number]>([0, 0])
  const [dustPositions] = useState<[number, number, number][]>(
    () =>
      Array.from({ length: 30 }, (_, i) => [
        Math.sin(i) * (Math.random() * 3),
        Math.random() * 2,
        Math.cos(i) * (Math.random() * 3),
      ])
  )

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      const x = (e.clientX / w) * 2 - 1
      const y = -(e.clientY / h) * 2 + 1
      mouse.current = [x, y]
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)}
        camera={{ position: [0, 1.5, 8], fov: 40 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.2} />
        <Spotlight mouse={mouse} />
        <Ground />

        <group position={[0, 0.5, 0]}>
          {dustPositions.map((pos, i) => (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[0.02, 6, 6]} />
              <meshStandardMaterial color={new THREE.Color('#ffffff')} transparent opacity={0.06} />
            </mesh>
          ))}
        </group>
      </Canvas>
    </div>
  )
}
