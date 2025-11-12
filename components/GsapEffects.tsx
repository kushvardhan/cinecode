// Global GSAP effects: ScrollTrigger reveals, parallax, and magnetic hover
'use client'
import { useEffect } from 'react'

export default function GsapEffects() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let cleanupFns: Array<() => void> = []

    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Reveal on scroll for elements with data-reveal
      document.querySelectorAll<HTMLElement>('[data-reveal]')?.forEach((el) => {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
              },
            }
          )
        }, el)
        cleanupFns.push(() => ctx.revert())
      })

      // Parallax for elements with data-parallax
      document.querySelectorAll<HTMLElement>('[data-parallax]')?.forEach((el) => {
        const speed = Number(el.getAttribute('data-parallax')) || 0.25
        const y = Math.min(120, Math.max(-120, speed * 100))
        const ctx = gsap.context(() => {
          gsap.to(el, {
            yPercent: y,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              scrub: true,
              start: 'top bottom',
              end: 'bottom top',
            },
          })
        }, el)
        cleanupFns.push(() => ctx.revert())
      })

      // Magnetic hover for [data-magnetic]
      document.querySelectorAll<HTMLElement>('[data-magnetic]')?.forEach((el) => {
        const strength = Number(el.getAttribute('data-magnetic')) || 0.3
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const relX = e.clientX - rect.left - rect.width / 2
          const relY = e.clientY - rect.top - rect.height / 2
          el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`
        }
        const onLeave = () => {
          el.style.transform = 'translate(0, 0)'
        }
        el.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
        cleanupFns.push(() => {
          el.removeEventListener('mousemove', onMove)
          el.removeEventListener('mouseleave', onLeave)
        })
      })
    })()

    return () => {
      cleanupFns.forEach((fn) => fn())
      cleanupFns = []
    }
  }, [])

  return null
}

