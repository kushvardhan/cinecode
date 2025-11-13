// Client-only wrapper that dynamically imports ThreeHero with HeroLite fallback
'use client'
import { useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import HeroLite from './HeroLite'

// Dynamic import of HeroCinematic (client-only)
const HeroCinematic = dynamic(() => import('./hero/HeroCinematic'), {
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

  return <HeroCinematic />
}
