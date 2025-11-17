'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import MobileMenu from './MobileMenu'

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

  // Prevent body scroll when menu is open
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
            ? 'bg-[#0B0E11]/95 backdrop-blur-sm border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
        style={{
          paddingTop: 'max(0px, env(safe-area-inset-top))',
          paddingLeft: 'max(0px, env(safe-area-inset-left))',
          paddingRight: 'max(0px, env(safe-area-inset-right))',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo - Profile Pic Left of Josh M. */}
            <Link 
              href="/" 
              className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="relative w-8 h-8 sm:w-9 md:w-10 rounded-full overflow-hidden border border-white/[0.12] bg-white/[0.05] flex-shrink-0">
                <img
                  src="/IMG_2897.jpg"
                  alt="Josh Menzies"
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                />
              </div>
              <span className="text-base sm:text-lg md:text-xl font-semibold text-white/90 whitespace-nowrap">
                Josh M.
              </span>
            </Link>

            {/* Desktop Nav - Centered */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
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
                    }}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 -mr-2 rounded-lg text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Open menu"
              type="button"
              style={{
                pointerEvents: 'auto',
              }}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* iOS-Style Mobile Menu */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navItems={navItems}
      />
    </>
  )
}
