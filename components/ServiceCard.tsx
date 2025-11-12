// Service card component with hover effects
'use client'
import { motionTokens } from '@/lib/motion'
import { motion, useReducedMotion } from 'framer-motion'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  onClick?: () => void
}

export default function ServiceCard({ icon, title, onClick }: ServiceCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      transition={{ duration: motionTokens.duration.short }}
      onClick={onClick}
      className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-(--accent-cyan)/50 transition-colors text-left w-full"
    >
      <div className="mb-4 text-5xl">{icon}</div>
      <div className="text-xl font-semibold text-white">{title}</div>
    </motion.button>
  )
}
