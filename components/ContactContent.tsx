'use client'

import { useState } from 'react'
import { Send, Github, Linkedin, Mail } from 'lucide-react'
import { resumeData } from '@/content/resume'
import Image from 'next/image'

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
    <section className="py-20 md:py-28 lg:py-32 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Removed gradient background - using global background only */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/[0.12] bg-white/[0.04] glass-profile">
                <Image
                  src="/IMG_2897.jpg"
                  alt="Josh Menzies"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 gradient-text">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Interested in discussing infrastructure challenges, opportunities, or just want to connect? Let's talk.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 gradient-text">Contact Information</h2>
            <div className="space-y-4">
              <a
                href={`mailto:${resumeData.email}`}
                className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
              >
                <div className="p-3 glass-card rounded-xl group-hover:bg-white/[0.08] transition-all flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#007AFF]" />
                </div>
                <span className="text-base md:text-lg">{resumeData.email}</span>
              </a>
              <a
                href={resumeData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
              >
                <div className="p-3 glass-card rounded-xl group-hover:bg-white/[0.08] transition-all flex-shrink-0">
                  <Linkedin className="w-5 h-5 text-[#007AFF]" />
                </div>
                <span className="text-base md:text-lg">LinkedIn</span>
              </a>
              <a
                href={resumeData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
              >
                <div className="p-3 glass-card rounded-xl group-hover:bg-white/[0.08] transition-all flex-shrink-0">
                  <Github className="w-5 h-5 text-[#007AFF]" />
                </div>
                <span className="text-base md:text-lg">GitHub</span>
              </a>
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-6 gradient-text">Send a Message</h2>
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-green-400 mb-4">✓ Message sent successfully!</div>
                <p className="text-white/70">I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-white/70">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 glass-card rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/70">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 glass-card rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-white/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 glass-card rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
