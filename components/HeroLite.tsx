// Non-3D fallback hero with poster image and framer-motion animations
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { motionTokens, fadeInUp, fadeIn } from '@/lib/motion'

interface HeroLiteProps {
  poster?: string
  title?: string
  subtitle?: string
  showThemeToggle?: boolean
}

export default function HeroLite({
  poster = '/hero-poster.jpg',
  title = 'CineCode',
  subtitle = 'Crafting Digital Experiences Like Cinema',
  showThemeToggle = true,
}: HeroLiteProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const prefersReducedMotion = useReducedMotion()

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={poster}
          alt="Hero background"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : fadeInUp.hidden}
          animate={prefersReducedMotion ? false : fadeInUp.visible}
          transition={{
            duration: motionTokens.duration.long,
            ease: 'easeInOut',
          }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--accent-cyan)] to-[var(--accent-purple)] bg-clip-text text-transparent">
            {title}
          </h1>
        </motion.div>

        <motion.p
          initial={prefersReducedMotion ? false : fadeIn.hidden}
          animate={prefersReducedMotion ? false : fadeIn.visible}
          transition={{
            duration: motionTokens.duration.medium,
            ease: 'easeInOut',
            delay: 0.2,
          }}
          className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mb-8"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
          transition={{
            duration: motionTokens.duration.medium,
            ease: 'easeInOut',
            delay: 0.4,
          }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <a
            href="#services"
            className="px-8 py-3 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-cyan)] text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300"
          >
            Explore Services
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Theme Toggle */}
      {showThemeToggle && (
        <motion.button
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? false : { opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={toggleTheme}
          className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </motion.button>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
        animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
        transition={{
          duration: motionTokens.duration.medium,
          ease: 'easeInOut',
          delay: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

