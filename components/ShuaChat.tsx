'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, MessageSquare } from 'lucide-react'
import { shuaResponses } from '@/content/shua'

export default function ShuaChat() {
  const [isOpen, setIsOpen] = useState(false)
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
    <>
          {/* Floating Button - Ask Shua Icon */}
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] rounded-full glass-card shadow-lg backdrop-blur-xl ring-2 ring-[#007AFF]/20 hover:ring-[#007AFF]/40 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: 'fixed', width: '56px', height: '56px' }}
            aria-label="Open chat with Shua"
          >
            <Bot className="w-7 h-7 text-[#007AFF]" />
          </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-end p-4 md:p-8 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="glass-card w-full max-w-md h-[600px] flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-primary flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 glass-badge rounded-lg">
                    <Bot className="w-5 h-5 text-primary-80" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Shua</h3>
                    <p className="text-xs text-tertiary">AI Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-primary-60 hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
              <div className="p-6 border-t border-primary">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask Shua anything..."
                    className="flex-1 glass-badge border border-primary rounded-xl px-4 py-3 text-primary placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 transition-all"
                  />
                  <button
                    onClick={handleSend}
                    className="glass-card p-3 rounded-xl hover:scale-105 transition-transform"
                  >
                    <Send className="w-5 h-5 text-primary" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

