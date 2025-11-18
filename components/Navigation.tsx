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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
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
          backdropFilter: isScrolled || pathname !== '/' ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled || pathname !== '/' ? 'blur(24px) saturate(180%)' : 'none',
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden border border-white/[0.12] bg-white/[0.04] flex-shrink-0"
              >
                <Image
                  src="/IMG_2897.jpg"
                  alt="Josh Menzies"
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </motion.div>
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
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/[0.08] active:bg-white/[0.12] transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              aria-label="Open menu"
              type="button"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay - Apple Design */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay with Glass Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{
                background: 'rgba(4, 6, 8, 0.85)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Glass Menu Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.22, 1, 0.36, 1],
                opacity: { duration: 0.3 }
              }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden pointer-events-none"
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-4 sm:top-8 sm:right-6 p-3 rounded-2xl text-white/80 hover:text-white transition-all duration-200 min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation pointer-events-auto"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
                aria-label="Close menu"
                type="button"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Navigation Items Container */}
              <nav className="flex flex-col items-center justify-center gap-3 px-6 pointer-events-auto">
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
                        duration: 0.4,
                        delay: 0.15 + (index * 0.04),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="w-full"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <Link
                          href={normalizedHref}
                          onClick={handleLinkClick}
                          className={`relative block w-full px-6 py-4 rounded-2xl text-center transition-all duration-300 ${
                            isActive
                              ? 'text-white'
                              : 'text-white/70 hover:text-white'
                          }`}
                          style={{
                            background: isActive 
                              ? 'rgba(255, 255, 255, 0.12)' 
                              : 'rgba(255, 255, 255, 0.04)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: isActive
                              ? '1px solid rgba(255, 255, 255, 0.22)'
                              : '1px solid rgba(255, 255, 255, 0.12)',
                            boxShadow: isActive
                              ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(90, 200, 250, 0.1), 0 0 20px rgba(90, 200, 250, 0.15)'
                              : '0 4px 16px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          {/* Active Indicator */}
                          {isActive && (
                            <motion.div
                              layoutId="activeNavIndicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                              style={{
                                background: 'linear-gradient(180deg, #5ac8fa, #7f7bff)',
                                boxShadow: '0 0 12px rgba(90, 200, 250, 0.5)',
                              }}
                              transition={{ 
                                type: 'spring', 
                                stiffness: 300, 
                                damping: 30 
                              }}
                            />
                          )}
                          
                          <span className="relative text-xl font-semibold tracking-tight">
                            {item.label}
                          </span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Profile Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 rounded-2xl pointer-events-auto"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/[0.12] bg-white/[0.04] flex-shrink-0">
                  <Image
                    src="/IMG_2897.jpg"
                    alt="Josh Menzies"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold tracking-tight text-white">Josh M.</span>
                  <span className="text-xs text-white/60">Platform Engineer</span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
