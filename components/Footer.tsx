// Multi-column footer with links, social media, and newsletter
'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const footerLinks = {
    Services: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'App Development', href: '/services/app-development' },
      { label: 'UI/UX Design', href: '/services/ui-ux-design' },
      { label: 'Video Editing', href: '/services/video-editing' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'SEO & GMB', href: '/services/seo-gmb' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Projects', href: '/projects/ecommerce-platform' },
      { label: 'Contact', href: '/contact' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/cinecode', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/cinecode', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/cinecode', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/cinecode', label: 'Instagram' },
  ]

  return (
    <footer className="relative bg-background border-t border-border transition-colors duration-300">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-background-secondary/50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-(--accent-gold) to-(--accent-cyan) rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) bg-clip-text text-transparent">
                CineCode
              </span>
            </Link>
            <p className="text-text-muted mb-6 max-w-sm">
              Crafting digital experiences like cinema. We blend creativity with cutting-edge
              technology to deliver exceptional results.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-card-bg border border-border rounded-lg focus:outline-none focus:border-(--accent-cyan) transition-colors text-sm text-foreground placeholder:text-text-muted"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-2 bg-linear-to-r from-(--accent-gold) to-(--accent-cyan) text-black rounded-lg font-semibold"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-foreground font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-muted hover:text-(--accent-cyan) transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} CineCode. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-card-bg hover:bg-foreground/10 flex items-center justify-center transition-colors border border-border"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-text-muted" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
