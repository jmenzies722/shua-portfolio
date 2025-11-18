'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { stripTrailingSlash, withTrailingSlash } from '@/lib/utils'
import { bottomSheetMotion } from '@/lib/motion'

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
    // Set initial state
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // CRITICAL: Force navbar to top via JavaScript as fallback
  useEffect(() => {
    if (navRef.current) {
      const nav = navRef.current
      // Force position via inline styles (highest priority)
      nav.style.setProperty('position', 'fixed', 'important')
      nav.style.setProperty('top', '0', 'important')
      nav.style.setProperty('bottom', 'auto', 'important')
      nav.style.setProperty('transform', 'translateY(0)', 'important')
      nav.style.setProperty('margin-top', '0', 'important')
      nav.style.setProperty('margin-bottom', '0', 'important')
      
      // Use MutationObserver to watch for any style changes
      const observer = new MutationObserver(() => {
        if (nav.style.top !== '0px' || nav.style.position !== 'fixed') {
          nav.style.setProperty('position', 'fixed', 'important')
          nav.style.setProperty('top', '0', 'important')
          nav.style.setProperty('bottom', 'auto', 'important')
        }
      })
      
      observer.observe(nav, {
        attributes: true,
        attributeFilter: ['style', 'class'],
        childList: false,
        subtree: false,
      })
      
      return () => observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      // Delay restoring overflow to allow menu close animation
      const timer = setTimeout(() => {
        document.body.style.overflow = ''
      }, 200)
      return () => clearTimeout(timer)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Top Navigation Bar - Mobile-First - Always Pinned at Top */}
      {/* CRITICAL: This nav must NEVER be at bottom - always top-0 */}
      <nav
        ref={navRef}
        data-navbar="top"
        className="fixed top-0 left-0 right-0 z-[9999] transition-colors duration-300"
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
          translate: '0 0',
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          zIndex: 9999,
          overflow: 'visible',
          alignSelf: 'flex-start',
          order: -9999,
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
            {/* Left: Avatar + Name + Role - ALL IN ONE ROW */}
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

            {/* Mobile Menu Button - SAME ROW - Properly Aligned */}
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

      {/* Mobile Bottom Sheet Menu - iOS Style - Only shows when menu button is clicked */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] lg:hidden"
              onClick={() => setIsMenuOpen(false)}
              style={{ top: 0, left: 0, right: 0, bottom: 0 }}
            />

            {/* Bottom Sheet - Slides up from bottom when menu is opened */}
            <motion.div
              {...bottomSheetMotion}
              className="fixed bottom-0 left-0 right-0 z-[10000] lg:hidden"
              style={{
                top: 'auto',
                bottom: 0,
                position: 'fixed',
                paddingBottom: 'max(1rem, calc(1rem + env(safe-area-inset-bottom)))',
                paddingLeft: 'max(0px, env(safe-area-inset-left))',
                paddingRight: 'max(0px, env(safe-area-inset-right))',
              }}
            >
              <div className="bg-white/[0.08] border-t border-white/[0.12] backdrop-blur-xl rounded-t-3xl shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
                {/* Handle Bar */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1 bg-white/30 rounded-full" />
                </div>

                {/* Profile Header */}
                <div className="px-6 py-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/[0.12] bg-white/[0.04] flex-shrink-0">
                      <Image
                        src="/IMG_2897.jpg"
                        alt="Josh Menzies"
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-white/90 truncate">
                        Josh M.
                      </h3>
                      <p className="text-xs text-white/60 truncate">
                        Platform Engineer
                      </p>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 -mr-2 rounded-full hover:bg-white/[0.12] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label="Close menu"
                      type="button"
                    >
                      <X className="w-5 h-5 text-white/80" />
                    </button>
                  </div>
                </div>

                {/* Menu Items */}
                <nav className="px-2 py-2">
                  {navItems.map((item) => {
                    const normalizedHref = withTrailingSlash(item.href)
                    const isActive =
                      stripTrailingSlash(pathname) === stripTrailingSlash(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={normalizedHref}
                        onClick={(e) => {
                          // Close menu immediately, let Link handle navigation
                          setIsMenuOpen(false)
                          // Don't prevent default - let Next.js handle routing
                        }}
                        className={`block w-full px-4 py-3.5 rounded-xl transition-colors text-left min-h-[56px] flex items-center justify-between ${
                          isActive
                            ? 'bg-white/[0.12] text-white'
                            : 'text-white/80 active:bg-white/[0.12] active:text-white'
                        }`}
                      >
                        <span className="text-base font-medium">{item.label}</span>
                        {isActive && <ChevronRight className="w-5 h-5 text-white/40" />}
                      </Link>
                    )
                  })}
                </nav>

                {/* Bottom Spacing */}
                <div className="h-2" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
