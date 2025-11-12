// Animated timeline component with scroll-triggered animations
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { slideInLeft, slideInRight } from '@/lib/motion'

interface TimelineStep {
  number: string
  title: string
  description: string
  icon?: React.ReactNode
}

interface ProcessTimelineProps {
  steps: TimelineStep[]
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative max-w-4xl mx-auto py-12">
      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent-gold)] via-[var(--accent-cyan)] to-[var(--accent-purple)]" />

      {/* Timeline Steps */}
      <div className="space-y-16">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0
          const variant = isEven ? slideInLeft : slideInRight

          return (
            <motion.div
              key={step.number}
              initial={prefersReducedMotion ? false : variant.hidden}
              whileInView={prefersReducedMotion ? false : variant.visible}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: index * 0.1 }}
              className={`relative flex items-center ${
                isEven ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-cyan)] text-black font-bold rounded-full mb-3">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>

              {/* Center Circle */}
              <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent-cyan)] flex items-center justify-center shadow-lg">
                {step.icon || (
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                )}
              </div>

              {/* Empty Space */}
              <div className="w-5/12" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Example usage with default steps
export function DefaultProcessTimeline() {
  const defaultSteps: TimelineStep[] = [
    {
      number: '01',
      title: 'Discovery & Strategy',
      description:
        'We dive deep into your vision, goals, and target audience to craft a strategic roadmap.',
    },
    {
      number: '02',
      title: 'Design & Prototyping',
      description:
        'Our designers create stunning, user-centric interfaces with interactive prototypes.',
    },
    {
      number: '03',
      title: 'Development',
      description:
        'Expert developers bring designs to life with clean, scalable, and performant code.',
    },
    {
      number: '04',
      title: 'Testing & QA',
      description:
        'Rigorous testing ensures flawless functionality across all devices and browsers.',
    },
    {
      number: '05',
      title: 'Launch & Support',
      description:
        'We deploy your project and provide ongoing support to ensure continued success.',
    },
  ]

  return <ProcessTimeline steps={defaultSteps} />
}

