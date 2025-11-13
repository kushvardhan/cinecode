// Global layout - Server Component with metadata, Lenis wrapper, theme provider, and GSAP effects
import GsapEffects from '@/components/GsapEffects'
import LenisWrapper from '@/components/LenisWrapper'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CineCode - Cinematic Digital Experiences',
  description:
    'CineCode is a premium digital agency specializing in web development, app development, UI/UX design, video editing, digital marketing, and SEO services.',
  keywords: [
    'web development',
    'app development',
    'UI/UX design',
    'video editing',
    'digital marketing',
    'SEO',
    'GMB',
  ],
  authors: [{ name: 'CineCode' }],
  openGraph: {
    title: 'CineCode - Cinematic Digital Experiences',
    description: 'Premium digital agency crafting exceptional web, mobile, and marketing solutions',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cinecode.com',
    siteName: 'CineCode',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineCode - Cinematic Digital Experiences',
    description: 'Premium digital agency crafting exceptional web, mobile, and marketing solutions',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased bg-background text-foreground transition-colors duration-300">
          <ThemeProvider>
            <LenisWrapper>
              <GsapEffects />
              {children}
            </LenisWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
