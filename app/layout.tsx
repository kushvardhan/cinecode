// app/layout.tsx (simplified snippet)
'use client'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => t })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis?.destroy?.()
  }, [])
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
