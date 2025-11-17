'use client'

import { useState } from 'react'
import { Send, Github, Linkedin, Mail } from 'lucide-react'
import { resumeData } from '@/content/resume'
import Card from './ui/Card'
import Button from './ui/Button'

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
    <section className="py-20 md:py-32">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 gradient-text">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Interested in discussing infrastructure challenges, opportunities, or just want to connect? Let's talk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h2>
            <div className="space-y-4">
              <a
                href={`mailto:${resumeData.email}`}
                className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
              >
                <div className="p-3 glass-card rounded-xl group-hover:ring-2 group-hover:ring-[#007AFF]/30 transition-all flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#007AFF]" />
                </div>
                <span className="text-lg">{resumeData.email}</span>
              </a>
              <a
                href={resumeData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
              >
                <div className="p-3 glass-card rounded-xl group-hover:ring-2 group-hover:ring-[#007AFF]/30 transition-all flex-shrink-0">
                  <Linkedin className="w-5 h-5 text-[#007AFF]" />
                </div>
                <span className="text-lg">LinkedIn</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
              >
                <div className="p-3 glass-card rounded-xl group-hover:ring-2 group-hover:ring-[#007AFF]/30 transition-all flex-shrink-0">
                  <Github className="w-5 h-5 text-[#007AFF]" />
                </div>
                <span className="text-lg">GitHub</span>
              </a>
            </div>
          </Card>

          {/* Contact Form */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 gradient-text">Send a Message</h2>
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
                <Button
                  type="submit"
                  variant="primary"
                  icon={<Send size={18} />}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
