'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface Section {
  id: string
  label: string
}

const sections: Section[] = [
  { id: 'hero', label: 'Home' },
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

  // Only show on home page
  if (pathname !== '/') {
    return null
  }

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
        window.scrollTo({
          top: targetPosition,
          behavior: 'auto',
        })
        setActiveSection(id)
        return
      }

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (pathname !== '/') return
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const currentIndex = sections.findIndex(s => s.id === activeSection)
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
          scrollToSection(sections[currentIndex + 1].id)
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
          scrollToSection(sections[currentIndex - 1].id)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection, pathname])

  // Show/hide on hover
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX < 100) {
        setIsVisible(true)
      } else if (e.clientX > 150 && !isHovered) {
        setIsVisible(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  return (
    <div
      ref={sidebarRef}
      className={`fixed left-6 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-200 ${
        isVisible || isHovered ? 'opacity-100' : 'opacity-0'
      }`}
      onMouseEnter={() => {
        setIsHovered(true)
        setIsVisible(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsVisible(false)
      }}
    >
      <div className="flex flex-col gap-4 items-center">
        {/* Active indicator line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-[#007AFF] transition-all duration-300"
          style={{
            height: `${sections.length * 32}px`,
            top: `${sections.findIndex(s => s.id === activeSection) * 32}px`,
            transform: 'translateX(-50%)',
          }}
        />

        {/* Dots */}
        {sections.map((section, index) => {
          const isActive = activeSection === section.id
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id, true)}
              className={`relative w-3 h-3 rounded-full transition-all duration-200 ${
                isHovered ? 'w-4 h-4' : 'w-3 h-3'
              } ${
                isActive
                  ? 'bg-[#007AFF] ring-2 ring-[#007AFF]/30'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to ${section.label}`}
            />
          )
        })}
      </div>
    </div>
  )
}
