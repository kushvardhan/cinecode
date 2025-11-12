// Motion tokens with proper TypeScript types and prefers-reduced-motion utilities
import type { Transition, Variant } from 'framer-motion'

export const motionTokens = {
  ease: {
    cinematic: [0.22, 1, 0.36, 1] as [number, number, number, number],
    soft: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
    spring: [0.4, 0.02, 0.23, 0.97] as [number, number, number, number],
  },
  duration: { short: 0.18, medium: 0.6, long: 1.2 },
  stagger: { small: 0.06, medium: 0.12, large: 0.18 },
}

// Utility to get transition respecting reduced motion
export const getTransition = (
  duration: number = motionTokens.duration.medium,
  easeName: 'easeInOut' | 'easeIn' | 'easeOut' | 'linear' = 'easeInOut',
  prefersReducedMotion: boolean = false
): Transition => {
  if (prefersReducedMotion) {
    return { duration: 0.01 }
  }
  return { duration, ease: easeName }
}

// Common animation variants
export const fadeInUp: { hidden: Variant; visible: Variant } = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: { hidden: Variant; visible: Variant } = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const scaleIn: { hidden: Variant; visible: Variant } = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

export const slideInLeft: { hidden: Variant; visible: Variant } = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

export const slideInRight: { hidden: Variant; visible: Variant } = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
}
