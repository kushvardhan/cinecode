// Client-only wrapper that dynamically imports ThreeHero with HeroLite fallback
'use client'
import { fadeIn, fadeInUp, motionTokens } from '@/lib/motion'
import { motion, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import HeroLite from './HeroLite'

// Dynamic import of ThreeHero with ssr:false (client-only)
const ThreeHero = dynamic(() => import('./ThreeHero'), {
  ssr: false,
  loading: () => <div className="h-[60vh] md:h-[80vh] bg-black animate-pulse" />,
})

interface HeroWrapperProps {
  use3D?: boolean
  title?: string
  subtitle?: string
  ctaPrimary?: { text: string; href: string }
  ctaSecondary?: { text: string; href: string }
}

export default function HeroWrapper({
  use3D = true,
  title = 'CineCode',
  subtitle = 'Crafting Digital Experiences Like Cinema',
  ctaPrimary = { text: 'Explore Services', href: '#services' },
  ctaSecondary = { text: 'Get in Touch', href: '#contact' },
}: HeroWrapperProps) {
  const prefersReducedMotion = useReducedMotion()

  // Use HeroLite if 3D is disabled or reduced motion is preferred
  if (!use3D || prefersReducedMotion) {
    return <HeroLite title={title} subtitle={subtitle} />
  }

  return (
    <section className="relative">
      {/* 3D Background */}
      <ThreeHero />

      {/* Overlay Content */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={fadeInUp.hidden}
          animate={fadeInUp.visible}
          transition={{
            duration: motionTokens.duration.long,
            ease: 'easeInOut',
          }}
          className="pointer-events-auto"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 bg-linear-to-r from-(--accent-gold) via-(--accent-cyan) to-(--accent-purple) bg-clip-text text-transparent">
            {title}
          </h1>
        </motion.div>

        <motion.p
          initial={fadeIn.hidden}
          animate={fadeIn.visible}
          transition={{
            duration: motionTokens.duration.medium,
            ease: 'easeInOut',
            delay: 0.2,
          }}
          className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mb-8 pointer-events-auto"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionTokens.duration.medium,
            ease: 'easeInOut',
            delay: 0.4,
          }}
          className="flex gap-4 flex-wrap justify-center pointer-events-auto"
        >
          <a
            href={ctaPrimary.href}
            className="px-8 py-3 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300"
          >
            {ctaPrimary.text}
          </a>
          <a
            href={ctaSecondary.href}
            className="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            {ctaSecondary.text}
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: motionTokens.duration.medium,
          ease: 'easeInOut',
          delay: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
