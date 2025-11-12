import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { motionTokens } from '@/lib/motion'
const ThreeHero = dynamic(() => import('@/components/ThreeHero'), { ssr: false, loading: () => <div className="h-[60vh] bg-black" /> })

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="relative">
        <ThreeHero />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { duration: motionTokens.duration.long, ease: motionTokens.ease.cinematic } }}>
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#FFD700] to-[#00FFC8] bg-clip-text text-transparent">
              CineCode
            </h1>
            <p className="mt-3 text-sm font-light">Crafting Digital Experiences Like Cinema</p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
