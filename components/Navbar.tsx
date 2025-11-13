// Premium Sheryians-inspired navbar with centered menu, glassy blur, and theme toggle
'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from './ThemeProvider'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const { isSignedIn, user } = useUser()
  const { scrollY } = useScroll()

  // Sheryians-style glassy blur effect
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    [
      resolvedTheme === 'dark' ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)',
      resolvedTheme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    ]
  )

  const backdropBlur = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(24px)'])
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.1])

  // Only 4 centered menu items (Sheryians style)
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/team', label: 'Work' },
    { href: '/contact', label: 'Contact' },
  ]

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        borderBottomColor: `rgba(255, 255, 255, ${borderOpacity})`,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-3 group z-10">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-11 h-11 bg-linear-to-br from-(--accent-gold) via-(--accent-cyan) to-(--accent-purple) rounded-xl flex items-center justify-center shadow-lg shadow-accent-gold/20">
                <span className="text-black font-bold text-xl tracking-tight">C</span>
              </div>
            </motion.div>
            <span className="text-xl font-bold bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) bg-clip-text text-transparent tracking-tight">
              CineCode
            </span>
          </Link>

          {/* Centered Navigation - Desktop Only */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300"
              >
                <span
                  className={`relative z-10 ${
                    resolvedTheme === 'dark'
                      ? 'text-gray-300 group-hover:text-white'
                      : 'text-gray-700 group-hover:text-black'
                  }`}
                >
                  {link.label}
                </span>
                {/* Sheryians-style hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                />
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) group-hover:w-3/4 transition-all duration-500 ease-out" />
              </Link>
            ))}
          </div>

          {/* Right Side - Theme Toggle + Auth */}
          <div className="hidden lg:flex items-center gap-4 z-10">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                resolvedTheme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10'
                  : 'bg-black/5 hover:bg-black/10'
              }`}
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </motion.button>

            {/* Auth - Profile or Sign In */}
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-medium ${
                    resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {user?.firstName || 'User'}
                </span>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox:
                        'w-10 h-10 ring-2 ring-accent-gold/20 hover:ring-accent-gold/40 transition-all',
                    },
                  }}
                />
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="group relative px-6 py-2.5 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/30"
                data-magnetic="0.3"
              >
                <span className="relative z-10">Sign In</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
              resolvedTheme === 'dark'
                ? 'bg-white/5 hover:bg-white/10'
                : 'bg-black/5 hover:bg-black/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Premium Slide-in */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`lg:hidden ${
            resolvedTheme === 'dark'
              ? 'bg-black/95 border-white/5'
              : 'bg-white/95 border-black/5'
          } backdrop-blur-2xl border-t`}
        >
          <div className="px-6 py-8 space-y-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-5 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                    resolvedTheme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-white/5'
                      : 'text-gray-700 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <div className={`flex items-center justify-between pt-6 border-t ${
              resolvedTheme === 'dark' ? 'border-white/10' : 'border-black/10'
            }`}>
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  resolvedTheme === 'dark'
                    ? 'bg-white/5 hover:bg-white/10 text-gray-300'
                    : 'bg-black/5 hover:bg-black/10 text-gray-700'
                }`}
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" />
                )}
                <span className="text-sm">
                  {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
                </span>
              </button>

              {isSignedIn ? (
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${
                    resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {user?.firstName}
                  </span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) text-black font-semibold rounded-full shadow-lg shadow-accent-gold/20"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
