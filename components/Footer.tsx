'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { resumeData } from '@/content/resume'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Experience', href: '/experience' },
    { name: 'Skills', href: '/skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Resume', href: '/resume' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  const socialLinks = [
    {
      name: 'Email',
      href: `mailto:${resumeData.email}`,
      icon: Mail,
    },
    {
      name: 'LinkedIn',
      href: resumeData.linkedin,
      icon: Linkedin,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/joshmenzies',
      icon: Github,
    },
  ]

  return (
    <footer 
      className="relative mt-24 md:mt-32 border-t border-white/[0.06] bg-[#0B0E11]"
      style={{
        paddingBottom: 'max(3rem, calc(3rem + env(safe-area-inset-bottom)))',
        paddingLeft: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-left)))',
        paddingRight: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-right)))',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">
          {/* Left: Profile Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/[0.08] bg-white/[0.02] p-0.5">
                <img
                  src="/IMG_2897.jpg"
                  alt="Josh Menzies"
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white/90">
                  Josh M.
                </h3>
                <p className="text-xs text-white/60 mt-0.5">Platform Engineer</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              Building secure, automated, and observable infrastructure on AWS and Kubernetes.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-2 md:space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs md:text-sm text-white/80 hover:text-blue-400 transition-colors duration-200 w-fit relative z-10 pointer-events-auto py-1 md:py-0"
                  style={{ position: 'relative', zIndex: 10 }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Contact Icons */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-6">
              Connect
            </h4>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-3 text-sm text-white/80 hover:text-blue-400 transition-colors duration-200"
                  >
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 group-hover:scale-[1.03]">
                      <Icon className="w-4 h-4 text-white/70 group-hover:text-blue-400 transition-colors duration-200" />
                    </div>
                    <span className="truncate">{social.name === 'Email' ? resumeData.email : social.name}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-white/60 font-light">
            © {currentYear} Josh Menzies. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="group h-10 w-10 flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-[#0B0E11]"
            aria-label="Scroll to top"
            type="button"
          >
            <ArrowUp className="w-4 h-4 text-white/70 group-hover:text-blue-400 transition-colors duration-200 group-hover:scale-[1.03]" />
          </button>
        </div>
      </div>
    </footer>
  )
}
