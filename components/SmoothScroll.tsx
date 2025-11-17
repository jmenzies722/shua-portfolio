'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    // Enhanced smooth scroll behavior for anchor links ONLY
    // Only handle links that start with # and are NOT Next.js Link components
    const handleSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]:not([data-next-link])').forEach((anchor) => {
        // Skip Next.js Link components
        if ((anchor as HTMLElement).closest('[data-nextjs-scroll-focus-boundary]')) {
          return
        }
        
        anchor.addEventListener('click', (e: Event) => {
          const href = (anchor as HTMLAnchorElement).getAttribute('href')
          if (href && href !== '#' && href.startsWith('#')) {
            e.preventDefault()
            const target = document.querySelector(href)
            if (target) {
              const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
              })
            }
          }
        })
      })
    }

    handleSmoothScroll()

    // Optimize scroll performance with requestAnimationFrame
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false
        })
        ticking = true
      }
    }

    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleScroll, { passive: true })
    window.addEventListener('touchmove', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [])

  return null
}

