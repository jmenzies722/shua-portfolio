'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { stripTrailingSlash, withTrailingSlash } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const pathname = usePathname() || '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Force navbar to top via JavaScript as fallback
  useEffect(() => {
    if (navRef.current) {
      const nav = navRef.current
      nav.style.setProperty('position', 'fixed', 'important')
      nav.style.setProperty('top', '0', 'important')
      nav.style.setProperty('bottom', 'auto', 'important')
      nav.style.setProperty('transform', 'translateY(0)', 'important')
      nav.style.setProperty('margin-top', '0', 'important')
      nav.style.setProperty('margin-bottom', '0', 'important')
    }
  }, [])

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Top Navigation Bar - Always Pinned at Top */}
      <nav
        ref={navRef}
        data-navbar="top"
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          paddingTop: 'max(0.5rem, calc(0.5rem + env(safe-area-inset-top)))',
          paddingLeft: 'max(1rem, calc(1rem + env(safe-area-inset-left)))',
          paddingRight: 'max(1rem, calc(1rem + env(safe-area-inset-right)))',
          paddingBottom: 0,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 'auto',
          transform: 'translateY(0)',
          marginTop: 0,
          marginBottom: 0,
          zIndex: 50,
          backgroundColor: isScrolled
            ? 'rgba(5, 6, 8, 0.98)'
            : pathname === '/' ? 'transparent' : 'rgba(5, 6, 8, 0.95)',
          backdropFilter: isScrolled || pathname !== '/' ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: isScrolled || pathname !== '/' ? 'blur(24px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : pathname === '/' ? 'none' : '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-14 md:h-16 px-0">
            {/* Left: Avatar + Name + Role */}
            <Link 
              href="/" 
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group"
            >
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden border border-white/[0.12] bg-white/[0.04] flex-shrink-0">
                <Image
                  src="/IMG_2897.jpg"
                  alt="Josh Menzies"
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-sm font-semibold tracking-tight text-white truncate">Josh M.</span>
                <span className="text-xs text-white/60 truncate hidden sm:inline">Platform Engineer</span>
              </div>
            </Link>

            {/* Desktop Nav - Centered Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const normalizedHref = withTrailingSlash(item.href)
                const active =
                  stripTrailingSlash(pathname) === stripTrailingSlash(item.href)
                return (
                  <Link
                    key={item.href}
                    href={normalizedHref}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      active
                        ? 'text-white bg-white/[0.12]'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              aria-label="Open menu"
              type="button"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 z-40 backdrop-blur-xl bg-black/60 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Full-Screen Menu Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/[0.12] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                aria-label="Close menu"
                type="button"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Items */}
              <nav className="flex flex-col items-center justify-center gap-6">
                {navItems.map((item, index) => {
                  const normalizedHref = withTrailingSlash(item.href)
                  const isActive =
                    stripTrailingSlash(pathname) === stripTrailingSlash(item.href)
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <Link
                        href={normalizedHref}
                        onClick={handleLinkClick}
                        className={`text-2xl font-semibold transition-colors duration-200 ${
                          isActive
                            ? 'text-white'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
