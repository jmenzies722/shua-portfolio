'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleNavClick = () => {
    // Close mobile menu on navigation
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      
      // Hide nav on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#007AFF]/20 animate-pulse flex-shrink-0" />
              <div className="h-6 w-32 bg-[#007AFF]/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-150 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
      style={{ 
        willChange: 'auto', 
        pointerEvents: isVisible ? 'auto' : 'none',
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden glass-profile p-0.5 flex-shrink-0 group-hover:ring-2 group-hover:ring-[#007AFF]/40 transition-all duration-300">
              <img
                src="/IMG_2897.jpg"
                alt="Josh Menzies"
                className="w-full h-full object-cover rounded-full"
                loading="eager"
                decoding="async"
                style={{
                  objectPosition: 'center center',
                  transform: 'translateZ(0)',
                }}
              />
            </div>
            <span className="text-2xl font-display font-bold gradient-text">Josh M.</span>
          </Link>

          {/* Desktop Navigation */}
          <div 
            className="hidden md:flex items-center space-x-8" 
            style={{ 
              pointerEvents: 'auto', 
              zIndex: 10000, 
              position: 'relative',
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  handleNavClick()
                  // Ensure navigation happens
                  if (!item.href.startsWith('#')) {
                    // Let Next.js handle the navigation
                    return
                  }
                }}
                className="text-sm font-medium text-primary-80 hover:text-primary transition-colors relative group cursor-pointer px-2 py-1"
                style={{ 
                  pointerEvents: 'auto', 
                  position: 'relative', 
                  zIndex: 10000,
                  display: 'inline-block',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {item.name}
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#007AFF] w-0 group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <motion.button
              className="text-primary-80 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-primary"
          >
            <motion.div 
              className="px-6 py-4 space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className="block text-primary-80 hover:text-primary transition-colors cursor-pointer"
                  style={{ pointerEvents: 'auto', position: 'relative', zIndex: 100 }}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

