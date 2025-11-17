'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
        isScrolled
          ? 'bg-[#0B0E11]/95 backdrop-blur-sm border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
      style={{
        paddingTop: 'max(0px, env(safe-area-inset-top))',
        paddingLeft: 'max(0px, env(safe-area-inset-left))',
        paddingRight: 'max(0px, env(safe-area-inset-right))',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-16 w-full" style={{
          minHeight: 'calc(4rem + max(0px, env(safe-area-inset-top)))',
        }}>
          {/* Logo - Ensure side by side on mobile */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden glass-profile flex-shrink-0">
              <img
                src="/IMG_2897.jpg"
                alt="Josh Menzies"
                className="w-full h-full object-cover rounded-full"
                loading="eager"
              />
            </div>
            <span className="text-base sm:text-lg md:text-xl font-display font-bold gradient-text whitespace-nowrap">
              Josh M.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 relative z-50">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                  style={{
                    position: 'relative',
                    zIndex: 50,
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                  }}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF] transition-all duration-200 pointer-events-none ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Toggle menu"
            type="button"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#0B0E11]/98 backdrop-blur-sm border-t border-white/5 relative z-50">
          <div className="container py-4">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block py-3 px-2 text-base transition-colors rounded-lg ${
                      isActive 
                        ? 'text-white bg-white/5' 
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                    style={{
                      position: 'relative',
                      zIndex: 50,
                      pointerEvents: 'auto',
                      cursor: 'pointer',
                    }}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </nav>
  )
}
