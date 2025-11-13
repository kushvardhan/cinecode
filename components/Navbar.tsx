'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import {
  ChevronDown,
  Code2,
  Menu,
  Moon,
  Palette,
  Search,
  Smartphone,
  Sparkles,
  Sun,
  TrendingUp,
  Video,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from './ThemeProvider'

export default function Navbar() {
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const [showSignInTooltip, setShowSignInTooltip] = useState(false)
  const mobileRef = useRef<HTMLDivElement | null>(null)
  const { resolvedTheme, setTheme } = useTheme()

  const { scrollY } = useScroll()
  const bg = useTransform(
    scrollY,
    [0, 60],
    resolvedTheme === 'dark'
      ? ['rgba(10,10,10,0)', 'rgba(10,10,10,0.8)']
      : ['rgba(255,255,255,0)', 'rgba(255,255,255,0.85)']
  )
  const blur = useTransform(scrollY, [0, 60], ['blur(0px)', 'blur(24px)'])

  // Close mobile menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsOpen(false), [pathname, setIsOpen])

  // Premium service items with icons (no emojis!)
  const services = [
    { icon: Code2, label: 'Web Development', href: '/services/web-development' },
    { icon: Smartphone, label: 'App Development', href: '/services/app-development' },
    { icon: Palette, label: 'UI/UX Design', href: '/services/ui-ux-design' },
    { icon: Video, label: 'Video Editing', href: '/services/video-editing' },
    { icon: TrendingUp, label: 'Digital Marketing', href: '/services/digital-marketing' },
    { icon: Search, label: 'SEO & GMB', href: '/services/seo-gmb' },
  ]

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    {
      href: '/work',
      label: 'Work',
      dropdown: services.map((s) => ({ href: s.href, label: s.label })),
    },
    { href: '/contact', label: 'Contact' },
  ]

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  return (
    <motion.nav
      style={{ backgroundColor: bg, backdropFilter: blur }}
      className="fixed top-0 left-0 w-full z-50 border-b border-border/50 transition-all duration-500"
    >
      {/* Main Container - Proper padding from edges */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 h-20 flex items-center justify-between relative">
        {/* Logo - Left Side */}
        <Link href="/" className="flex items-center gap-3 group relative z-10">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 8 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="w-11 h-11 rounded-xl bg-linear-to-br from-(--accent-gold) via-(--accent-cyan) to-(--accent-purple) flex items-center justify-center shadow-lg shadow-accent-gold/20"
          >
            <span className="text-black font-bold text-xl">C</span>
          </motion.div>
          <span className="text-xl font-bold bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) bg-clip-text text-transparent">
            CineCode
          </span>
        </Link>

        {/* Centered Navigation - Desktop Only */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setHoveredMenu(link.label)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button
                  aria-haspopup="menu"
                  aria-expanded={hoveredMenu === link.label}
                  className={`flex items-center gap-2 px-6 py-3 text-[15px] font-medium rounded-md transition-colors ${
                    pathname === link.href ? 'text-foreground' : 'text-text-muted'
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`w-4 h-4 ${hoveredMenu === link.label ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {hoveredMenu === link.label && (
                    <motion.ul
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: [0.2, 0.9, 0.2, 1] }}
                      className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 bg-card-bg backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden p-2"
                    >
                      {link.dropdown!.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block px-4 py-3 rounded-lg hover:bg-foreground/5 transition-colors"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-6 py-3 text-[15px] font-medium rounded-md transition-colors ${
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                {link.label}
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) w-0 group-hover:w-3/4 transition-all duration-300" />
              </Link>
            )
          )}
        </nav>

        {/* Right Side - Theme Toggle + Auth */}
        <div className="hidden lg:flex items-center gap-4 relative z-10">
          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </motion.button>

          {/* Auth Section */}
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-text-muted">
                {user?.firstName || 'User'}
              </span>
              <UserButton />
            </div>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setShowSignInTooltip(true)}
              onMouseLeave={() => setShowSignInTooltip(false)}
            >
              <Link
                href="/sign-in"
                className="relative px-6 py-2.5 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) text-black font-semibold rounded-full hover:shadow-lg hover:shadow-accent-gold/30 transition-all duration-300 overflow-hidden group"
                data-magnetic="0.3"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Sign In
                </span>
              </Link>

              {/* Premium Tooltip */}
              <AnimatePresence>
                {showSignInTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-card-bg backdrop-blur-2xl border border-border rounded-xl shadow-2xl p-4 pointer-events-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-linear-to-br from-(--accent-gold)/20 to-(--accent-cyan)/20 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-(--accent-cyan)" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">
                          Sign in to elevate your experience
                        </p>
                        <p className="text-xs text-text-muted leading-relaxed">
                          Access exclusive features, save your preferences, and take your journey to
                          the next level.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-foreground/5 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileRef}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 w-[340px] max-w-[94vw] z-50 bg-background/95 dark:bg-background-secondary/95 backdrop-blur-xl shadow-2xl p-6 lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-linear-to-br from-(--accent-gold) to-(--accent-cyan) flex items-center justify-center">
                    <span className="text-black font-bold">C</span>
                  </div>
                  <span className="font-semibold text-lg">CineCode</span>
                </Link>
                <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X />
                </button>
              </div>

              <nav className="flex-1 overflow-auto">
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-lg font-semibold text-foreground"
                      >
                        {link.label}
                      </Link>
                      {link.dropdown && (
                        <div className="pl-4 mt-2 space-y-2">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block text-sm text-text-muted"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-sm"
                  aria-pressed={resolvedTheme === 'dark'}
                >
                  {resolvedTheme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-indigo-600" />
                  )}
                  <span className="ml-1">
                    {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>

                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <Link
                    href="/sign-in"
                    className="px-5 py-2 rounded-full bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) text-black font-semibold"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
