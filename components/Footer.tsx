'use client'

/**
 * Footer - Minimal Apple-style Footer
 * Simple links and copyright
 */
import Link from 'next/link'
import { resumeData } from '@/content/resume'
import { withTrailingSlash } from '@/lib/utils'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="border-t border-white/[0.06] bg-[#050608] mt-24"
      style={{
        paddingBottom: 'max(2rem, calc(2rem + env(safe-area-inset-bottom)))',
        paddingLeft: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-left)))',
        paddingRight: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-right)))',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-white/60">
            © {currentYear} {resumeData.name}. All rights reserved.
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
            <Link href={withTrailingSlash('/about')} prefetch={true} className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center">
              About
            </Link>
            <Link href={withTrailingSlash('/experience')} prefetch={true} className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center">
              Experience
            </Link>
            <Link href={withTrailingSlash('/skills')} prefetch={true} className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center">
              Skills
            </Link>
            <Link href={withTrailingSlash('/projects')} prefetch={true} className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center">
              Projects
            </Link>
            <Link href={withTrailingSlash('/resume')} prefetch={true} className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center">
              Resume
            </Link>
            <Link href={withTrailingSlash('/blog')} prefetch={true} className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center">
              Blog
            </Link>
            <Link href={withTrailingSlash('/contact')} prefetch={true} className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
