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

  return (
    <footer className="relative mt-20 md:mt-32 pb-20 md:pb-24">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden glass-profile p-0.5">
                <img
                  src="/IMG_2897.jpg"
                  alt="Josh Menzies"
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold gradient-text">
                  Josh M.
                </h3>
                <p className="text-xs text-white/50 mt-0.5">Platform Engineer</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Building secure, automated, and observable infrastructure on AWS and Kubernetes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <div className="flex flex-col space-y-3">
              {[
                { name: 'About', href: '/about' },
                { name: 'Experience', href: '/experience' },
                { name: 'Projects', href: '/projects' },
                { name: 'Skills', href: '/skills' },
                { name: 'Resume', href: '/resume' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200 w-fit"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-6">
              Connect
            </h4>
            <div className="flex flex-col space-y-3">
              <a
                href={`mailto:${resumeData.email}`}
                className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <div className="p-2.5 glass-card rounded-xl">
                  <Mail className="w-4 h-4 text-[#007AFF]" />
                </div>
                <span className="truncate">{resumeData.email}</span>
              </a>
              <a
                href={resumeData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <div className="p-2.5 glass-card rounded-xl">
                  <Linkedin className="w-4 h-4 text-[#007AFF]" />
                </div>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/joshmenzies"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <div className="p-2.5 glass-card rounded-xl">
                  <Github className="w-4 h-4 text-[#007AFF]" />
                </div>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-white/40 font-light">
            © {currentYear} Josh Menzies. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="group glass-card p-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50"
            aria-label="Scroll to top"
            type="button"
          >
            <ArrowUp className="w-4 h-4 text-white/60 group-hover:text-[#007AFF] transition-colors duration-200" />
          </button>
        </div>
      </div>
    </footer>
  )
}
