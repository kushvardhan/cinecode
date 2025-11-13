'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useEffect, useRef, useState } from 'react'

const SpotlightScene = dynamic(() => import('./SpotlightScene'), {
  ssr: false,
  loading: () => null,
})

export default function HeroCinematic() {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let observer: IntersectionObserver
    if (ref.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setMounted(true)
              observer.disconnect()
            }
          })
        },
        { root: null, threshold: 0.15 }
      )
      observer.observe(ref.current)
    }

    return () => observer && observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[640px] md:min-h-[720px] lg:min-h-[760px] overflow-hidden"
    >
      {/* Static fallback for mobile / low-end */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-fallback.jpg"
          alt="Cinematic Hero"
          fill
          className="object-cover object-center blur-sm md:blur-0"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-black/20 to-black/60 opacity-60" />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-14 relative z-20 flex items-center h-full">
        <div className="w-full lg:w-2/3">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
            className="text-[clamp(28px,6vw,64px)] leading-tight font-black text-white drop-shadow-lg"
          >
            We craft digital experiences that feel like cinema.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-2xl text-lg text-gray-200/90"
          >
            Web development, App development, UI/UX design, Video editing, Digital marketing, SEO &
            GMB — end-to-end creative production for brands that want to stand out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-8 flex items-center gap-4"
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#ffb347] to-[#00ffcc] text-black font-semibold hover:opacity-95 transition"
            >
              Start a Project
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 text-white/90 hover:bg-white/5 transition"
            >
              Our Work
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Lazy-load 3D scene */}
      <div className="absolute inset-0 -z-20">
        <Suspense fallback={null}>{mounted ? <SpotlightScene /> : null}</Suspense>
      </div>
    </section>
  )
}
