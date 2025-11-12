// Reusable motion wrapper components with variants
'use client'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { fadeIn, fadeInUp, scaleIn, slideInLeft, slideInRight, motionTokens } from '@/lib/motion'

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
      initial={prefersReducedMotion ? false : fadeIn.hidden}
      whileInView={prefersReducedMotion ? false : fadeIn.visible}
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
      initial={prefersReducedMotion ? false : fadeInUp.hidden}
      whileInView={prefersReducedMotion ? false : fadeInUp.visible}
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
      initial={prefersReducedMotion ? false : scaleIn.hidden}
      whileInView={prefersReducedMotion ? false : scaleIn.visible}
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
      initial={prefersReducedMotion ? false : slideInLeft.hidden}
      whileInView={prefersReducedMotion ? false : slideInLeft.visible}
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
      initial={prefersReducedMotion ? false : slideInRight.hidden}
      whileInView={prefersReducedMotion ? false : slideInRight.visible}
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
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView={prefersReducedMotion ? false : 'visible'}
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
      variants={prefersReducedMotion ? {} : fadeInUp}
      transition={{ duration: motionTokens.duration.medium, ease: 'easeInOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

