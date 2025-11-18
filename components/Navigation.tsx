'use client'

import { useState, useEffect } from 'react'
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
      {/* Top Navigation Bar - Apple Design */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          h-16 px-4
          flex items-center justify-between
          backdrop-blur-xl
          border-b border-white/5
          transition-all duration-300
          ${isScrolled || pathname !== '/' 
            ? 'bg-black/20 supports-[backdrop-filter]:bg-black/10' 
            : 'bg-transparent'
          }
        `}
        style={{
          paddingTop: 'max(0.5rem, calc(0.5rem + env(safe-area-inset-top)))',
          paddingLeft: 'max(1rem, calc(1rem + env(safe-area-inset-left)))',
          paddingRight: 'max(1rem, calc(1rem + env(safe-area-inset-right)))',
        }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
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

          {/* Mobile Menu Button - Apple Style */}
          <motion.button
            onClick={() => setIsMenuOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/[0.08] active:bg-white/[0.12] transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
            aria-label="Open menu"
            type="button"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </motion.button>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay - Apple Design */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-0 z-40 backdrop-blur-2xl bg-black/60 lg:hidden"
              onClick={handleLinkClick}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, delay: 0.1, ease: 'easeOut' }}
                onClick={handleLinkClick}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-4 sm:top-8 sm:right-6 p-3 rounded-2xl text-white/80 hover:text-white transition-all duration-200 min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
                aria-label="Close menu"
                type="button"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </motion.button>

              {/* Navigation Items */}
              <nav className="flex flex-col items-center justify-center gap-4 px-6">
                {navItems.map((item, index) => {
                  const normalizedHref = withTrailingSlash(item.href)
                  const isActive =
                    stripTrailingSlash(pathname) === stripTrailingSlash(item.href)
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.15 + (index * 0.05),
                        ease: 'easeOut',
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <Link
                          href={normalizedHref}
                          onClick={handleLinkClick}
                          className={`
                            relative block px-6 py-3 rounded-2xl text-center
                            text-2xl font-semibold tracking-tight
                            transition-all duration-300
                            ${isActive ? 'text-white' : 'text-white/90 hover:text-white'}
                          `}
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
                          {item.label}
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
                  duration: 0.3,
                  delay: 0.5,
                  ease: 'easeOut',
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 rounded-2xl"
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
