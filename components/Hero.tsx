'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, MessageSquare } from 'lucide-react'
import AnimatedText from './AnimatedText'
import HeroHalo from './HeroHalo'
import OrbitIcons from './OrbitIcons'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated gradient fog background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1c] to-[#0a0a0a]"
          style={{ opacity }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#007AFF]/20 via-[#5AC8FA]/10 to-[#8A2BE2]/15 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ opacity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#5AC8FA]/15 via-[#8A2BE2]/10 to-[#007AFF]/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ opacity }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8"
        style={{ y, opacity }}
      >
        {/* Glass Card Container - Apple Vision Pro style */}
        <div 
          className="p-8 md:p-12 lg:p-16 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: `
              0 8px 32px 0 rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(0, 122, 255, 0.1),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Animated Text & CTA */}
            <div className="space-y-8">
              {/* Animated Identity Line */}
              <div>
                <AnimatedText />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mt-6 text-xl md:text-2xl text-primary-60 font-light leading-relaxed"
                >
                  Building secure, automated, and observable infrastructure on AWS and Kubernetes.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    href="/projects"
                    className="group relative glass-card px-8 py-4 flex items-center gap-3 text-white font-medium rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                  >
                    <span className="relative z-10">View Projects</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#007AFF]/20 via-[#5AC8FA]/20 to-[#007AFF]/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    href="/chat"
                    className="group relative glass-card px-8 py-4 flex items-center gap-3 text-white font-medium rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                  >
                    <span className="relative z-10">Ask Shua</span>
                    <MessageSquare className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-200" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#007AFF]/20 via-[#5AC8FA]/20 to-[#007AFF]/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Avatar with Halo & Orbiting Icons */}
            <div className="relative flex items-center justify-center">
              <HeroHalo>
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  {/* Avatar Container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden glass-profile p-1">
                    <img
                      src="/IMG_2897.jpg"
                      alt="Josh Menzies"
                      className="w-full h-full object-cover rounded-full"
                      loading="eager"
                      decoding="async"
                      style={{
                        objectPosition: 'center center',
                        transform: 'translateZ(0)',
                      }}
                    />
                  </div>

                  {/* Orbiting Icons */}
                  <OrbitIcons />
                </div>
              </HeroHalo>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        style={{ opacity }}
      >
        <motion.div
          className="w-4 h-6 border border-[#007AFF]/25 rounded-full flex items-start justify-center p-1 backdrop-blur-sm"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-0.5 h-1.5 bg-[#007AFF]/40 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
