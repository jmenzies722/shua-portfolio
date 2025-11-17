'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Github, Linkedin, Mail, CheckCircle } from 'lucide-react'
import GlassCard from './GlassCard'
import GlowHeader from './GlowHeader'
import SectionContainer from './SectionContainer'
import MotionFadeIn from './MotionFadeIn'

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <SectionContainer maxWidth="lg">
      <GlowHeader 
        title="Get in Touch" 
        subtitle="Interested in discussing infrastructure challenges, opportunities, or just want to connect? Let's talk."
      />

      <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-16">
        <MotionFadeIn delay={0.1}>
          <GlassCard delay={0.05} className="h-full">
            <div className="p-8 lg:p-10 h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-8 gradient-text">Contact Information</h2>
              <div className="space-y-5">
                <motion.a
                  href="mailto:jmenzies722@gmail.com"
                  className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="p-3 glass-card rounded-xl group-hover:ring-2 group-hover:ring-[#007AFF]/30 transition-all flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail className="w-5 h-5 text-[#007AFF]" />
                  </motion.div>
                  <span className="text-lg">jmenzies722@gmail.com</span>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/josh-m123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="p-3 glass-card rounded-xl group-hover:ring-2 group-hover:ring-[#007AFF]/30 transition-all flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Linkedin className="w-5 h-5 text-[#007AFF]" />
                  </motion.div>
                  <span className="text-lg">LinkedIn</span>
                </motion.a>
                <motion.a
                  href="https://github.com/joshmenzies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="p-3 glass-card rounded-xl group-hover:ring-2 group-hover:ring-[#007AFF]/30 transition-all flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Github className="w-5 h-5 text-[#007AFF]" />
                  </motion.div>
                  <span className="text-lg">GitHub</span>
                </motion.a>
              </div>
            </div>
          </GlassCard>
        </MotionFadeIn>

        <MotionFadeIn delay={0.15}>
          <GlassCard delay={0.1} className="h-full">
            <div className="p-8 lg:p-10 h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-8 gradient-text">Quick Links</h2>
              <div className="space-y-4">
                {[
                  { name: 'Download Résumé', href: '/resume.pdf' },
                  { name: 'View Projects', href: '/projects' },
                  { name: 'See Experience', href: '/experience' },
                  { name: 'Chat with Shua', href: '/chat' },
                ].map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    download={link.href.includes('.pdf')}
                    className="block text-white/70 hover:text-white transition-colors group text-lg"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </GlassCard>
        </MotionFadeIn>
      </div>

      <MotionFadeIn delay={0.2}>
        <GlassCard delay={0.15}>
          <form onSubmit={handleSubmit} className="p-10 lg:p-12">
            <h2 className="text-3xl font-bold mb-10 gradient-text">Send a Message</h2>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 glass-card border border-[#007AFF]/30 rounded-xl flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-[#007AFF] flex-shrink-0" />
                <span className="text-white/90">Message sent successfully!</span>
              </motion.div>
            )}

            <div className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-3 text-white/70">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#007AFF]/50 focus:ring-2 focus:ring-[#007AFF]/20 transition-all text-lg backdrop-blur-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-3 text-white/70">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#007AFF]/50 focus:ring-2 focus:ring-[#007AFF]/20 transition-all text-lg backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-3 text-white/70">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#007AFF]/50 focus:ring-2 focus:ring-[#007AFF]/20 transition-all resize-none text-lg backdrop-blur-sm"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={isSubmitting ? {} : { scale: 1.02, y: -2 }}
                whileTap={isSubmitting ? {} : { scale: 0.98 }}
                transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="w-full glass-card px-8 py-4 flex items-center justify-center gap-2 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Transmit Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </span>
                {!isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#007AFF]/20 via-[#5AC8FA]/20 to-[#007AFF]/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </motion.button>
            </div>
          </form>
        </GlassCard>
      </MotionFadeIn>
    </SectionContainer>
  )
}
