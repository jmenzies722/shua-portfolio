'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MessageSquare } from 'lucide-react'
import AnimatedText from './AnimatedText'
import Button from './ui/Button'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0E11] via-[#15181D] to-[#0B0E11]" />
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#007AFF]/5 via-transparent to-transparent opacity-50" />

      <div className="container relative z-10">
        {/* Glass Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="glass-card p-8 md:p-12 lg:p-16 max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text & CTAs */}
            <div className="space-y-8">
              <AnimatedText />
              
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
                Building secure, automated, and observable infrastructure on AWS and Kubernetes.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/projects" variant="primary" icon={<ArrowRight size={18} />}>
                  View Projects
                </Button>
                <Button href="/chat" variant="secondary" icon={<MessageSquare size={18} />}>
                  Ask Shua
                </Button>
              </div>
            </div>

            {/* Right: Avatar */}
            <div className="relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Subtle glow */}
                <div className="absolute inset-0 bg-[#007AFF]/20 blur-3xl rounded-full" />
                
                {/* Avatar */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden glass-profile p-1">
                  <img
                    src="/IMG_2897.jpg"
                    alt="Josh Menzies"
                    className="w-full h-full object-cover rounded-full"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-3 bg-white/40 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
