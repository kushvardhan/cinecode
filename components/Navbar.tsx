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
import { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'

export default function Navbar() {
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [showSignInTooltip, setShowSignInTooltip] = useState(false)
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
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-5 py-2.5 text-[15px] font-medium transition-all duration-300 rounded-lg group ${
                pathname === link.href ? 'text-foreground' : 'text-text-muted hover:text-foreground'
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) transition-all duration-500 ease-out ${
                  pathname === link.href ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                }`}
              />
            </Link>
          ))}

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1.5 px-5 py-2.5 text-[15px] font-medium text-text-muted hover:text-foreground transition-all duration-300 rounded-lg group">
              Services
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Premium Dropdown Menu */}
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-card-bg backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden p-2"
                >
                  {services.map((service) => {
                    const Icon = service.icon
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-foreground/5 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-(--accent-gold)/10 to-(--accent-cyan)/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-5 h-5 text-(--accent-cyan)" />
                        </div>
                        <span className="text-sm font-medium text-foreground group-hover:text-(--accent-cyan) transition-colors">
                          {service.label}
                        </span>
                      </Link>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
                      <div className="w-10 h-10 rounded-lg bg-linear-to-br from-(--accent-gold)/20 to-(--accent-cyan)/20 flex items-center justify-center flex-shrink-0">
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-background-secondary/95 backdrop-blur-2xl border-t border-border"
          >
            <div className="px-8 py-6 space-y-1">
              {/* Mobile Nav Links */}
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      pathname === link.href
                        ? 'bg-foreground/10 text-foreground'
                        : 'text-text-muted hover:bg-foreground/5 hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Services */}
              <div className="pt-2">
                <p className="px-4 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Services
                </p>
                {services.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <motion.div
                      key={service.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + index) * 0.1 }}
                    >
                      <Link
                        href={service.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-muted hover:bg-foreground/5 hover:text-foreground transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                        {service.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Mobile Auth + Theme */}
              <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-foreground/5 transition-colors text-sm font-medium"
                >
                  {resolvedTheme === 'dark' ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-400" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-indigo-600" />
                      Dark Mode
                    </>
                  )}
                </button>

                {isSignedIn ? (
                  <UserButton />
                ) : (
                  <Link
                    href="/sign-in"
                    className="px-6 py-2.5 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) text-black font-semibold rounded-full text-sm"
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
