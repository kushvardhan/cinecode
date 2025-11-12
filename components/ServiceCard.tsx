'use client'
import { motion } from 'framer-motion'
import { motionTokens } from '@/lib/motion'

export default function ServiceCard({ icon, title, onClick }: { icon: React.ReactNode; title: string; onClick?: ()=>void }) {
  return (
    <motion.button whileHover={{ scale: 1.02 }} transition={{ duration: motionTokens.duration.short }} onClick={onClick} className="bg-[rgba(255,255,255,0.03)] p-6 rounded-2xl backdrop-blur-sm">
      <div className="mb-4">{icon}</div>
      <div className="text-lg font-semibold">{title}</div>
    </motion.button>
  )
}
