'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useUser, UserButton } from '@clerk/nextjs'

export default function Navbar() {
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const { scrollY } = useScroll()
  const bg = useTransform(
    scrollY,
    [0, 60],
    resolvedTheme === 'dark'
      ? ['rgba(0,0,0,0)', 'rgba(0,0,0,0.85)']
      : ['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)']
  )
  const blur = useTransform(scrollY, [0, 60], ['none', 'blur(18px)'])

  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
useEffect(() => setIsOpen(false), [pathname])


  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    {
      href: '/work',
      label: 'Work',
      dropdown: [
        { href: '/projects/web', label: 'Web Projects' },
        { href: '/projects/design', label: 'Design Works' },
        { href: '/projects/marketing', label: 'Marketing' },
      ],
    },
    { href: '/contact', label: 'Contact' },
  ]

  const toggleTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  return (
    <motion.nav
      style={{ backgroundColor: bg, backdropFilter: blur }}
      className="fixed top-0 left-0 w-full z-50 border-b border-transparent transition-all duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold text-lg tracking-tight"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-cyan-300 to-purple-500 flex items-center justify-center shadow-lg"
          >
            <span className="text-black font-bold text-xl">C</span>
          </motion.div>
          <span className="bg-gradient-to-r from-amber-400 to-cyan-300 bg-clip-text text-transparent text-xl font-bold">
            CineCode
          </span>
        </Link>

        {/* Centered Nav */}
        <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 font-medium text-[15px]">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li
                key={link.href}
                className="relative group"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors">
                  {link.label}
                  <ChevronDown className="w-4 h-4 mt-[2px]" />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white dark:bg-neutral-900 shadow-2xl rounded-xl overflow-hidden min-w-[180px] border border-gray-200/20"
                    >
                      {link.dropdown.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-2 py-1 transition-all duration-300 ${
                    pathname === link.href
                      ? 'text-black dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-400 to-cyan-300 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all ${
              resolvedTheme === 'dark' ? 'bg-white/10' : 'bg-black/5'
            }`}
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </motion.button>

          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user?.firstName || 'User'}
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-cyan-300 text-black font-semibold rounded-full hover:shadow-lg transition-all"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setIsOpen((p) => !p)}
          className="lg:hidden p-2 rounded-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden px-6 pb-6 space-y-3 bg-white/90 dark:bg-black/90 backdrop-blur-lg"
          >
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-gray-800 dark:text-gray-200 text-base font-medium"
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="pl-4 space-y-2">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-1 text-sm text-gray-600 dark:text-gray-300"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200/20 flex items-center justify-between">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-sm"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" />
                )}
                {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>

              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <Link
                  href="/sign-in"
                  className="px-5 py-2 bg-gradient-to-r from-amber-400 to-cyan-300 text-black font-semibold rounded-full"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
