// Reusable motion wrapper components with variants
'use client'
import { fadeIn, fadeInUp, motionTokens, scaleIn, slideInLeft, slideInRight } from '@/lib/motion'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  className?: string
}

// Fade In Wrapper
export function FadeIn({ children, delay = 0, className, ...props }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : fadeIn.hidden}
      whileInView={prefersReducedMotion ? undefined : fadeIn.visible}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: motionTokens.duration.medium, ease: 'easeInOut', delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Fade In Up Wrapper
export function FadeInUp({ children, delay = 0, className, ...props }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : fadeInUp.hidden}
      whileInView={prefersReducedMotion ? undefined : fadeInUp.visible}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: motionTokens.duration.medium, ease: 'easeInOut', delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Scale In Wrapper
export function ScaleIn({ children, delay = 0, className, ...props }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : scaleIn.hidden}
      whileInView={prefersReducedMotion ? undefined : scaleIn.visible}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: motionTokens.duration.medium, ease: 'easeInOut', delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Slide In Left Wrapper
export function SlideInLeft({ children, delay = 0, className, ...props }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : slideInLeft.hidden}
      whileInView={prefersReducedMotion ? undefined : slideInLeft.visible}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: motionTokens.duration.medium, ease: 'easeInOut', delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Slide In Right Wrapper
export function SlideInRight({ children, delay = 0, className, ...props }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : slideInRight.hidden}
      whileInView={prefersReducedMotion ? undefined : slideInRight.visible}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: motionTokens.duration.medium, ease: 'easeInOut', delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Stagger Container
interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({
  children,
  staggerDelay = motionTokens.stagger.medium,
  className,
  ...props
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Stagger Item (use inside StaggerContainer)
export function StaggerItem({ children, className, ...props }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : fadeInUp}
      transition={{ duration: motionTokens.duration.medium, ease: 'easeInOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
