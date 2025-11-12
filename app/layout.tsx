// Global layout - Server Component with metadata, Lenis wrapper, and theme provider
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
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" suppressHydrationWarning>
        <body className="antialiased">
          <ThemeProvider>
            <LenisWrapper>{children}</LenisWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
