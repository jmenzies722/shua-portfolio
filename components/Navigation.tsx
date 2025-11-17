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


  useEffect(() => {
    setMounted(true)
    let scrollTimeout: NodeJS.Timeout | null = null
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      
      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      
      // Always show nav when scrolling
      setIsVisible(true)
      
      // Hide nav on scroll down after a delay, but keep it visible if user is near top
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        scrollTimeout = setTimeout(() => {
          setIsVisible(false)
        }, 150)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
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
      className={`fixed top-0 left-0 right-0 transition-all duration-75 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
      onMouseEnter={() => setIsVisible(true)}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand - Always visible */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0 min-w-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden glass-profile p-0.5 flex-shrink-0 group-hover:ring-2 group-hover:ring-[#007AFF]/40 transition-all duration-100">
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
            <span className="text-lg sm:text-xl md:text-2xl font-display font-bold gradient-text whitespace-nowrap">Josh M.</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div 
            className="hidden md:flex items-center space-x-6 lg:space-x-8 flex-shrink-0" 
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
                  // Ensure navigation happens
                  if (!isVisible) {
                    setIsVisible(true)
                  }
                }}
                className="text-sm font-medium text-primary-80 hover:text-primary transition-colors duration-100 relative group cursor-pointer px-2 py-1 whitespace-nowrap"
                style={{ 
                  pointerEvents: 'auto', 
                  position: 'relative', 
                  zIndex: 10000,
                  display: 'inline-block',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                }}
              >
                {item.name}
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#007AFF] w-0 group-hover:w-full transition-all duration-100 ease-[cubic-bezier(0.25,0.1,0.25,1)] pointer-events-none" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - Hidden on desktop */}
          <div className="md:hidden flex items-center flex-shrink-0 ml-2">
            <motion.button
              className="text-primary-80 hover:text-primary transition-colors p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.1 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Only visible on mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10"
            style={{ 
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 10000,
            }}
          >
            <motion.div 
              className="px-4 sm:px-6 py-4 space-y-3"
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-base text-primary-80 hover:text-primary transition-colors cursor-pointer py-2"
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

