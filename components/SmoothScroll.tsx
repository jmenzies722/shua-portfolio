'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    // Enhanced smooth scroll behavior for anchor links ONLY
    // Only handle links that start with # and are NOT Next.js Link components
    const handleSmoothScroll = () => {
      // Only select regular anchor tags with hash links, NOT Next.js Link components
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        // Skip Next.js Link components and navigation links
        const element = anchor as HTMLElement
        const href = (anchor as HTMLAnchorElement).getAttribute('href')
        
        // Skip if:
        // 1. Inside a nav element
        // 2. Has Next.js Link attributes
        // 3. Is a page route (starts with /)
        if (
          element.closest('nav') ||
          element.closest('[data-nextjs-scroll-focus-boundary]') ||
          element.hasAttribute('data-next-link') ||
          (href && href.startsWith('/'))
        ) {
          return
        }
        
        // Only handle pure hash links like #section
        anchor.addEventListener('click', (e: Event) => {
          if (href && href !== '#' && href.startsWith('#') && !href.includes('/')) {
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

