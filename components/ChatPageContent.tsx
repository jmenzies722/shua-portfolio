'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot } from 'lucide-react'
import { shuaResponses } from '@/content/shua'
import GlassCard from './GlassCard'

export default function ChatPageContent() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: shuaResponses.greeting },
  ])
  const [input, setInput] = useState('')

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return shuaResponses.experience
    }
    if (lowerMessage.includes('project')) {
      return shuaResponses.projects
    }
    if (lowerMessage.includes('skill') || lowerMessage.includes('tech')) {
      return shuaResponses.skills
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return shuaResponses.contact
    }
    return shuaResponses.default
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setInput('')

    setTimeout(() => {
      const response = getResponse(userMessage)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    }, 500)
  }

  return (
    <div className="pt-32 pb-32 px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 glass-badge rounded-3xl mb-6">
            <Bot className="w-12 h-12 text-primary-80" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 gradient-text">
            Ask Shua
          </h1>
          <p className="text-xl text-secondary">
            Your AI assistant for learning about Josh's work, experience, and projects.
          </p>
        </motion.div>

        <GlassCard delay={0.2}>
          <div className="p-6 flex flex-col h-[600px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-6">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-[#007AFF]/20 text-primary'
                        : 'glass-badge text-primary-80'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 pt-4 border-t border-primary">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Shua anything..."
                className="flex-1 glass-badge border border-primary rounded-xl px-4 py-3 text-primary placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 transition-all"
              />
              <motion.button
                onClick={handleSend}
                disabled={!input.trim()}
                whileHover={input.trim() ? { scale: 1.05 } : {}}
                whileTap={input.trim() ? { scale: 0.95 } : {}}
                transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="glass-card p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                aria-label="Send message"
              >
                <Send className="w-5 h-5 text-primary" />
              </motion.button>
            </div>
          </div>
        </GlassCard>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8 text-center"
        >
          <p className="text-tertiary text-sm mb-4">Try asking:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Tell me about Josh's experience",
              "What projects has he built?",
              "What are his skills?",
              "How can I contact him?",
            ].map((suggestion) => (
              <motion.button
                key={suggestion}
                onClick={() => {
                  setInput(suggestion)
                  setTimeout(() => handleSend(), 100)
                }}
                className="px-4 py-2 glass-badge rounded-lg text-primary-60 text-sm hover:text-primary hover:ring-2 hover:ring-[#007AFF]/30 transition-all focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

