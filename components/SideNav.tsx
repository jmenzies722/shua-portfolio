'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface Section {
  id: string
  label: string
}

const sections: Section[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

export default function SideNav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight / 3

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i].id)
            if (section) {
              const { offsetTop, offsetHeight } = section
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(sections[i].id)
                break
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string, immediate = false) => {
    const element = document.getElementById(id)
    if (element) {
      const elementTop = element.offsetTop
      const offset = 80
      const targetPosition = elementTop - offset

      if (immediate) {
        // Immediate snap for clicks
        window.scrollTo({
          top: targetPosition,
          behavior: 'auto',
        })
        setActiveSection(id)
        return
      }

      // Smooth scroll for keyboard navigation
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      const duration = Math.min(500, Math.abs(distance) * 0.4)
      let start: number | null = null

      const easeOutCubic = (t: number) => {
        return 1 - Math.pow(1 - t, 3)
      }

      const animateScroll = (currentTime: number) => {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const progress = Math.min(timeElapsed / duration, 1)
        const easedProgress = easeOutCubic(progress)

        window.scrollTo({
          top: startPosition + distance * easedProgress,
          behavior: 'auto',
        })

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (!isHovered) return
    
    e.preventDefault()
    e.stopPropagation()
    
    const delta = e.deltaY
    const currentIndex = sections.findIndex(s => s.id === activeSection)
    
    if (delta > 0 && currentIndex < sections.length - 1) {
      // Scroll down - go to next section
      scrollToSection(sections[currentIndex + 1].id)
    } else if (delta < 0 && currentIndex > 0) {
      // Scroll up - go to previous section
      scrollToSection(sections[currentIndex - 1].id)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle arrow keys
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return

      const currentIndex = sections.findIndex(s => s.id === activeSection)
      
      if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
        e.preventDefault()
        scrollToSection(sections[currentIndex + 1].id)
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault()
        scrollToSection(sections[currentIndex - 1].id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection])

  const activeIndex = sections.findIndex(s => s.id === activeSection)

  // Show sidebar on hover or when near it
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const sidebar = sidebarRef.current
      if (!sidebar) return
      
      const rect = sidebar.getBoundingClientRect()
      const distanceFromRight = window.innerWidth - e.clientX
      
      // Show if mouse is within 100px of the right edge
      if (distanceFromRight < 100) {
        setIsVisible(true)
      } else if (distanceFromRight > 150) {
        setIsVisible(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Only show on home page - must be after all hooks
  if (pathname !== '/') {
    return null
  }

  return (
    <motion.div
      ref={sidebarRef}
      className="fixed right-4 xl:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block select-none"
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: isVisible || isHovered ? 1 : 0,
        x: isVisible || isHovered ? 0 : 20
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => {
        setIsHovered(true)
        setIsVisible(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsVisible(false)
      }}
      onWheel={handleWheel}
    >
      <div className="flex flex-col items-center gap-5 relative">
        {/* Active indicator line */}
        <motion.div
          className="absolute -left-3 w-0.5 bg-[#007AFF] rounded-full pointer-events-none z-0"
          style={{ height: '10px' }}
          animate={{
            y: activeIndex >= 0 ? activeIndex * 40 - 5 : -5,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 40,
            duration: 0.25,
          }}
        />

        {/* Section dots */}
        <div className="flex flex-col gap-5 items-center relative z-10">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id
            
            return (
              <motion.div
                key={section.id}
                className="relative group"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <motion.div
                  className={`rounded-full cursor-pointer transition-all ${
                    isActive ? 'bg-[#007AFF]' : 'bg-[#007AFF]/25'
                  }`}
                  animate={{
                    width: isHovered ? (isActive ? '16px' : '14px') : (isActive ? '10px' : '10px'),
                    height: isHovered ? (isActive ? '16px' : '14px') : (isActive ? '10px' : '10px'),
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.1 }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    scrollToSection(section.id, true)
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
