'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { stripTrailingSlash, withTrailingSlash } from '@/lib/utils'
import { bottomSheetMotion, menuItemMotion } from '@/lib/motion'

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
          backdrop-blur-md
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
            prefetch={true}
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group"
            onClick={(e) => {
              // If already on home page, scroll to top and prevent navigation
              if (pathname === '/') {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
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
                  prefetch={true}
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

      {/* iOS-Style Bottom Sheet Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={handleLinkClick}
            />

            {/* Centered Glassy Modal Sheet - Dynamic Island Inspired */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 200,
                duration: 0.3
              }}
              className="fixed inset-0 z-50 flex items-center justify-center lg:hidden px-4"
              style={{
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'env(safe-area-inset-bottom)',
                paddingLeft: 'max(1rem, env(safe-area-inset-left))',
                paddingRight: 'max(1rem, env(safe-area-inset-right))',
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  handleLinkClick()
                }
              }}
            >
              <div
                className="w-full max-w-sm rounded-3xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Profile Header */}
                <div className="px-6 pt-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/[0.12] bg-white/[0.04] flex-shrink-0">
                        <Image
                          src="/IMG_2897.jpg"
                          alt="Josh Menzies"
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold tracking-tight text-white truncate">
                          Josh M.
                        </h3>
                        <p className="text-xs text-white/60 truncate">
                          Platform Engineer
                        </p>
                      </div>
                    </div>
                    <motion.button
                      onClick={handleLinkClick}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/[0.12] transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center touch-manipulation"
                      aria-label="Close menu"
                      type="button"
                    >
                      <X className="w-5 h-5" strokeWidth={1.5} />
                    </motion.button>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mx-6 mb-4" />

                {/* Navigation Links */}
                <nav className="px-6 pb-6 space-y-2">
                  {navItems.map((item, index) => {
                    const normalizedHref = withTrailingSlash(item.href)
                    const isActive =
                      stripTrailingSlash(pathname) === stripTrailingSlash(item.href)
                    return (
                      <motion.div
                        key={item.href}
                        {...menuItemMotion(index)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <Link
                            href={normalizedHref}
                            prefetch={true}
                            onClick={handleLinkClick}
                            className={`
                              block w-full px-4 py-3 rounded-2xl
                              text-base font-medium tracking-tight
                              transition-all duration-150
                              ${isActive ? 'text-white' : 'text-white/90'}
                            `}
                            style={{
                              background: isActive
                                ? 'rgba(255, 255, 255, 0.15)'
                                : 'rgba(255, 255, 255, 0.08)',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                              border: '1px solid rgba(255, 255, 255, 0.10)',
                            }}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
