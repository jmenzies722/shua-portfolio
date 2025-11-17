'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, Zap, Code, Target } from 'lucide-react'
import { shuaData } from '@/content/shua'
import GlassCard from './GlassCard'

export default function ShuaContent() {
  const [currentDescription, setCurrentDescription] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescription((prev) => (prev + 1) % shuaData.descriptions.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pt-32 pb-32 px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Tech Lines Background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#007AFF]/30 to-transparent"
            style={{
              top: `${(i * 5) % 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
            }}
            animate={{
              x: [0, 100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-6"
          >
            <div className="p-6 bg-white/5 rounded-3xl backdrop-blur-xl border border-white/10">
              <Bot className="w-16 h-16 text-white/80" />
            </div>
          </motion.div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 gradient-text">
            Meet Shua
          </h1>
          <p className="text-2xl text-white/70 max-w-3xl mx-auto">
            Your AI assistant for learning about Josh's work, experience, and projects.
          </p>
        </motion.div>

        {/* Rotating Description */}
        <motion.div
          key={currentDescription}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center mb-16"
        >
          <GlassCard>
            <div className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-2 h-2 bg-[#007AFF] rounded-full animate-pulse" />
                <span className="text-sm text-white/50">ACTIVE</span>
              </div>
              <p className="text-xl text-white/90 font-light">
                {shuaData.descriptions[currentDescription]}
              </p>
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard delay={0.1}>
            <div className="p-8 text-center">
              <div className="p-4 bg-white/5 rounded-2xl inline-block mb-4">
                <Zap className="w-8 h-8 text-white/80" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">
                {shuaData.yearsOfExperience}+
              </div>
              <div className="text-white/60 text-sm">Years Experience</div>
            </div>
          </GlassCard>

          <GlassCard delay={0.2}>
            <div className="p-8">
              <div className="p-4 bg-white/5 rounded-2xl inline-block mb-4">
                <Code className="w-8 h-8 text-white/80" />
              </div>
              <h3 className="text-xl font-bold mb-4 gradient-text">Favorite Stack</h3>
              <div className="space-y-2">
                {shuaData.favoriteStack.map((tech) => (
                  <div
                    key={tech}
                    className="px-3 py-1 bg-white/5 rounded-lg text-white/70 text-sm"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={0.3}>
            <div className="p-8">
              <div className="p-4 bg-white/5 rounded-2xl inline-block mb-4">
                <Target className="w-8 h-8 text-white/80" />
              </div>
              <h3 className="text-xl font-bold mb-4 gradient-text">Current Focus</h3>
              <div className="space-y-2">
                {shuaData.currentFocus.map((focus) => (
                  <div
                    key={focus}
                    className="px-3 py-1 bg-white/5 rounded-lg text-white/70 text-sm"
                  >
                    {focus}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={0.4}>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-4 gradient-text">Model Info</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-white/50 mb-1">Model</div>
                  <div className="text-white/90 font-mono">shua-1.0</div>
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Modes</div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-[#007AFF]/20 rounded text-xs text-[#5AC8FA]">
                      friendly
                    </span>
                    <span className="px-2 py-1 bg-[#0051D5]/20 rounded text-xs text-[#5AC8FA]">
                      technical
                    </span>
                    <span className="px-2 py-1 bg-[#007AFF]/20 rounded text-xs text-[#5AC8FA]">
                      casual
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Status</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#007AFF] rounded-full animate-pulse" />
                    <span className="text-white/90 text-sm">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <GlassCard>
            <div className="p-10">
              <h2 className="text-3xl font-bold mb-6 gradient-text">Interact with Shua</h2>
              <p className="text-white/70 mb-6">
                Click the chat button in the bottom-right corner to start a conversation. Shua can
                answer questions about Josh's experience, projects, skills, and more.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-4 py-2 bg-white/5 rounded-lg text-white/70 text-sm">
                  "Tell me about Josh's experience"
                </span>
                <span className="px-4 py-2 bg-white/5 rounded-lg text-white/70 text-sm">
                  "What projects has he built?"
                </span>
                <span className="px-4 py-2 bg-white/5 rounded-lg text-white/70 text-sm">
                  "What are his skills?"
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}

