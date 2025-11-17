'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { resumeData } from '@/content/resume'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-32 glass-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24 relative z-10">
        {/* Main Footer Content */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.02,
              },
            },
          }}
        >
          {/* Brand Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }
              },
            }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14 rounded-full overflow-hidden glass-profile p-0.5 hover:ring-2 hover:ring-[#007AFF]/40 transition-all duration-300">
                <img
                  src="/IMG_2897.jpg"
                  alt="Josh Menzies"
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                  decoding="async"
                  style={{
                    objectPosition: 'center center',
                    transform: 'translateZ(0)',
                  }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold gradient-text">
                  Josh M.
                </h3>
                <p className="text-xs text-tertiary mt-0.5">Platform Engineer</p>
              </div>
            </div>
            <p className="text-primary-60 text-sm leading-relaxed max-w-sm">
              Building secure, automated, and observable infrastructure on AWS and Kubernetes.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }
              },
            }}
            className="space-y-5"
          >
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-3">
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
                  className="text-sm text-primary-60 hover:text-primary transition-all duration-300 group inline-flex items-center gap-2 w-fit"
                >
                  {item.name}
                  <motion.span 
                    className="h-0.5 bg-[#007AFF]"
                    initial={{ width: 0 }}
                    whileHover={{ width: 16 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }
              },
            }}
            className="space-y-5"
          >
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-6">
              Connect
            </h4>
            <div className="flex flex-col space-y-3">
              <motion.a
                href={`mailto:${resumeData.email}`}
                className="flex items-center gap-3 text-sm text-primary-60 hover:text-primary transition-all duration-300 group"
                whileHover={{ x: 4 }}
              >
                <div className="p-2.5 glass-badge rounded-xl group-hover:ring-2 group-hover:ring-[#007AFF]/30 transition-all">
                  <Mail className="w-4 h-4 text-[#007AFF]" />
                </div>
                <span className="truncate">{resumeData.email}</span>
              </motion.a>
              <motion.a
                href={resumeData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-primary-60 hover:text-primary transition-all duration-300 group"
                whileHover={{ x: 4 }}
              >
                <div className="p-2.5 glass-badge rounded-xl group-hover:ring-2 group-hover:ring-[#007AFF]/30 transition-all">
                  <Linkedin className="w-4 h-4 text-[#007AFF]" />
                </div>
                <span>LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://github.com/joshmenzies"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-primary-60 hover:text-primary transition-all duration-300 group"
                whileHover={{ x: 4 }}
              >
                <div className="p-2.5 glass-badge rounded-xl group-hover:ring-2 group-hover:ring-[#007AFF]/30 transition-all">
                  <Github className="w-4 h-4 text-[#007AFF]" />
                </div>
                <span>GitHub</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          <p className="text-xs text-primary-40 font-light">
            © {currentYear} Josh Menzies. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            className="group glass-badge p-3 rounded-xl hover:ring-2 hover:ring-[#007AFF]/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-primary-60 group-hover:text-[#007AFF] transition-colors duration-200" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}

