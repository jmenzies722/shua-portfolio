'use client'

/**
 * Apple-style Navigation Bar
 * Desktop: Avatar + Name | Nav Links (centered/right)
 * Mobile: Avatar + Name + Menu Button in ONE ROW | Bottom Sheet Menu
 */
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Resume', href: '/resume' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-200 ${
          isScrolled
            ? 'bg-[#050608]/95 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
        style={{
          paddingTop: 'max(0px, env(safe-area-inset-top))',
          paddingLeft: 'max(0px, env(safe-area-inset-left))',
          paddingRight: 'max(0px, env(safe-area-inset-right))',
          pointerEvents: 'auto',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ pointerEvents: 'auto' }}>
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Left: Avatar + Name + Role - ALL IN ONE ROW */}
            <Link 
              href="/" 
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group"
              style={{ pointerEvents: 'auto', zIndex: 10000 }}
            >
              <div className="relative w-8 h-8 sm:w-9 md:w-10 rounded-full overflow-hidden border border-white/[0.12] bg-white/[0.04] flex-shrink-0">
                <Image
                  src="/IMG_2897.jpg"
                  alt="Josh Menzies"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-base md:text-lg font-semibold text-white/90 leading-tight truncate">
                  Josh M.
                </span>
                <span className="text-xs text-white/60 leading-tight hidden sm:block truncate">
                  Platform Engineer
                </span>
              </div>
            </Link>

            {/* Desktop Nav - Right */}
            <div 
              className="hidden lg:flex items-center gap-1"
              style={{ pointerEvents: 'auto', zIndex: 10000, position: 'relative' }}
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-white/[0.12]'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.08]'
                    }`}
                    style={{
                      pointerEvents: 'auto',
                      cursor: 'pointer',
                      position: 'relative',
                      zIndex: 10001,
                    }}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button - SAME ROW */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 -mr-2 rounded-lg text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open menu"
              type="button"
              style={{ pointerEvents: 'auto', zIndex: 10000 }}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sheet */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
          <div
            className="fixed bottom-0 left-0 right-0 z-[9999] lg:hidden bg-white/[0.08] border-t border-white/[0.12] backdrop-blur-md rounded-t-3xl shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
            style={{
              paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
            }}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-white/30 rounded-full" />
            </div>
            <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/[0.12] bg-white/[0.04] flex-shrink-0">
                  <Image
                    src="/IMG_2897.jpg"
                    alt="Josh Menzies"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white/90 truncate">Josh M.</h3>
                  <p className="text-xs text-white/60 truncate">Platform Engineer</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-full hover:bg-white/[0.12] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
                type="button"
              >
                <X className="w-5 h-5 text-white/80" />
              </button>
            </div>
            <nav className="px-2 py-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block w-full px-4 py-3 rounded-xl transition-colors text-left min-h-[44px] flex items-center ${
                      isActive
                        ? 'bg-white/[0.12] text-white'
                        : 'text-white/80 active:bg-white/[0.12] active:text-white'
                    }`}
                  >
                    <span className="text-base font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
            <div className="h-2" />
          </div>
        </>
      )}
    </>
  )
}
