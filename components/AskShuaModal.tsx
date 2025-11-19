'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { X, Send, MessageSquare } from 'lucide-react'
import { resumeData } from '@/content/resume'
import { generateShuaResponse } from '@/lib/shua-knowledge'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface AskShuaModalProps {
  isOpen: boolean
  onClose: () => void
}

const suggestedQuestions = [
  "Tell me about Josh's experience.",
  "Show me his best projects.",
  "What is Josh strongest at?",
  "Summarize his résumé.",
  "What tech does Josh work with?",
]

const welcomeMessage = "Hey, I'm Shua — ask me anything about Josh, his projects, experience, or how he builds cloud systems."

export default function AskShuaModal({ isOpen, onClose }: AskShuaModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragY = useMotionValue(0)
  const dragYSpring = useSpring(dragY, { damping: 25, stiffness: 200 })
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: welcomeMessage,
        timestamp: Date.now(),
      }])
    }
  }, [isOpen, messages.length])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Mobile swipe to close
  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.innerWidth <= 768) {
      setIsDragging(true)
      setStartY(e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && window.innerWidth <= 768) {
      const currentY = e.touches[0].clientY
      const deltaY = currentY - startY
      if (deltaY > 0) {
        dragY.set(deltaY)
      }
    }
  }

  const handleTouchEnd = () => {
    if (isDragging) {
      const currentY = dragY.get()
      if (currentY > 100) {
        onClose()
      }
      dragY.set(0)
      setIsDragging(false)
    }
  }

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const response = generateShuaResponse(text)
    
    // Type out response character by character for human-like effect
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)

    // Type out response
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < response.length) {
        setMessages((prev) => {
          const updated = [...prev]
          const lastMsg = updated[updated.length - 1]
          if (lastMsg.role === 'assistant') {
            lastMsg.content = response.substring(0, currentIndex + 1)
          }
          return updated
        })
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 20)
  }

  const handleSuggestionClick = (question: string) => {
    handleSend(question)
  }

  const handleClearChat = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: welcomeMessage,
      timestamp: Date.now(),
    }])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Desktop: Floating glass card, Mobile: Full-height slide-up modal
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768)
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            onClick={isMobile ? undefined : onClose}
            style={{ zIndex: 9998 }}
          />

          {/* Chat Modal */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={isMobile 
              ? { type: 'spring', damping: 25, stiffness: 200 }
              : { type: 'spring', damping: 25, stiffness: 200, duration: 0.3 }
            }
            className={`
              fixed z-[9999] 
              ${isMobile 
                ? 'inset-x-0 bottom-0 top-12 rounded-t-3xl' 
                : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[80vh] max-h-[700px] rounded-3xl'
              }
              flex flex-col
              overflow-hidden
            `}
            style={{
              zIndex: 9999,
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: isMobile 
                ? '0 -4px 30px rgba(0, 0, 0, 0.5)'
                : '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              paddingTop: isMobile ? 'max(1rem, env(safe-area-inset-top))' : '0',
              paddingBottom: isMobile ? 'max(1rem, env(safe-area-inset-bottom))' : '0',
              y: isMobile ? dragYSpring : undefined,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 flex-shrink-0"
              style={{
                paddingTop: isMobile ? 'max(1rem, calc(1rem + env(safe-area-inset-top)))' : '1rem',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/[0.12] bg-white/[0.04] flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[#5ac8fa]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Shua</h3>
                  <p className="text-xs text-white/60">AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  className="px-3 py-1.5 text-xs text-white/60 hover:text-white/80 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Clear
                </button>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/[0.12] transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  index={index}
                />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="px-4 sm:px-6 py-3 border-t border-white/10 flex-shrink-0">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSuggestionClick(question)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 text-xs sm:text-sm text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full whitespace-nowrap transition-colors flex-shrink-0"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div 
              className="px-4 sm:px-6 py-4 border-t border-white/10 flex-shrink-0 bg-transparent"
              style={{
                paddingBottom: isMobile ? 'max(1rem, calc(1rem + env(safe-area-inset-bottom)))' : '1rem',
              }}
            >
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#5ac8fa]/50 focus:border-[#5ac8fa]/50 transition-all text-sm sm:text-base"
                  />
                </div>
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-2xl bg-[#5ac8fa] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" strokeWidth={2} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Message Bubble Component
function MessageBubble({ message, index }: { message: Message; index: number }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: isUser ? 10 : 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-[#5ac8fa]/20 text-white rounded-br-sm'
            : 'bg-white/8 backdrop-blur-md border border-white/10 text-white/90 rounded-bl-sm'
        }`}
        style={{
          boxShadow: isUser
            ? '0 2px 8px rgba(90, 200, 250, 0.2)'
            : '0 2px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </motion.div>
  )
}

// Typing Indicator Component
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/8 backdrop-blur-md border border-white/10">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/40"
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

