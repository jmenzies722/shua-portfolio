'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useDragControls } from 'framer-motion'
import { X, Send, MessageSquare, GripVertical } from 'lucide-react'
import { useShua } from '@/contexts/ShuaContext'
import { generateShuaReply } from '@/lib/shua-nlp'

interface AskShuaModalProps {
  isOpen: boolean
  onClose: () => void
}

const suggestedQuestions = [
  "What's Josh best at?",
  "Tell me about his recent work.",
  "Which project shows his strongest skills?",
  "Give me a quick intro.",
  "What tech does he work with?",
  "What's his experience?",
  "How can I contact him?",
]

const welcomeMessage = "Hey, I'm Shua — ask me anything about Josh, his projects, experience, or how he builds cloud systems."

export default function AskShuaModal({ isOpen, onClose }: AskShuaModalProps) {
  const { messages, addMessage, clearMessages, getRecentHistory } = useShua()
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [typingContent, setTypingContent] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [dragTransform, setDragTransform] = useState('translate(-50%, -50%)')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputBarRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const dragY = useMotionValue(0)
  const dragYSpring = useSpring(dragY, { damping: 25, stiffness: 200 })
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  
  // Desktop drag controls
  const dragControls = useDragControls()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // Higher stiffness for snappier return to center
  const xSpring = useSpring(x, { damping: 30, stiffness: 300 })
  const ySpring = useSpring(y, { damping: 30, stiffness: 300 })

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && !isInitialized && messages.length === 0) {
      addMessage({
        role: 'assistant',
        content: welcomeMessage,
      })
      setIsInitialized(true)
    }
  }, [isOpen, isInitialized, messages.length, addMessage])

  // Reset initialization when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsInitialized(false)
    }
  }, [isOpen])

  // Auto-scroll to bottom with smooth behavior
  useEffect(() => {
    if (messagesEndRef.current) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [messages, isTyping])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

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

  // Keyboard detection only for desktop (mobile uses pre-prompt buttons)
  useEffect(() => {
    if (!isOpen || isMobile || typeof window === 'undefined') return

    const handleViewportResize = () => {
      if (window.visualViewport) {
        const viewport = window.visualViewport
        const windowHeight = window.innerHeight
        const viewportHeight = viewport.height
        const heightDiff = windowHeight - viewportHeight
        
        // Keyboard is open if viewport is significantly smaller
        if (heightDiff > 150) {
          setKeyboardHeight(heightDiff)
        } else {
          setKeyboardHeight(0)
        }
      }
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportResize)
      handleViewportResize() // Initial check
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportResize)
      }
    }
  }, [isOpen, isMobile])

  // Mobile swipe to close
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) {
      setIsDragging(true)
      setStartY(e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && isMobile) {
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

    // Add user message
    addMessage({
      role: 'user',
      content: text,
    })
    setInput('')
    setIsTyping(true)
    setTypingContent('')

    // Simulate thinking delay for natural feel
    await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 400))

    // Get conversation history for context (including the message we just added)
    const history = getRecentHistory(8)
    
    // Generate natural response
    const response = generateShuaReply(text, history)
    
    // Type out response character by character for human-like effect
    let currentIndex = 0
    const typingSpeed = 20 + Math.random() * 15 // Variable typing speed (20-35ms per char)
    
    const typingInterval = setInterval(() => {
      if (currentIndex < response.length) {
        setTypingContent(response.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        // Add the complete message to context
        addMessage({
          role: 'assistant',
          content: response,
        })
        setTypingContent('')
      }
    }, typingSpeed)
  }

  const handleSuggestionClick = (question: string) => {
    handleSend(question)
  }

  const handleClearChat = () => {
    clearMessages()
    addMessage({
      role: 'assistant',
      content: welcomeMessage,
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Prevent body scroll when modal is open (but allow modal content to scroll)
  useEffect(() => {
    if (isOpen) {
      // Only prevent body scroll on mobile to allow modal scrolling
      if (isMobile) {
        document.body.classList.add('modal-open')
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        // Store scroll position to restore later
        const scrollY = window.scrollY
        document.body.style.top = `-${scrollY}px`
      } else {
        document.body.style.overflow = 'hidden'
      }
    } else {
      if (isMobile) {
        document.body.classList.remove('modal-open')
        const scrollY = document.body.style.top
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.width = ''
        document.body.style.top = ''
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }
      } else {
        document.body.style.overflow = ''
      }
    }
    return () => {
      document.body.classList.remove('modal-open')
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [isOpen, isMobile])

  // Reset drag position when modal closes or opens
  useEffect(() => {
    if (!isMobile) {
      if (!isOpen) {
        // Reset when closing
        x.set(0)
        y.set(0)
        setDragTransform('translate(-50%, -50%)')
      } else {
        // Ensure centered when opening
        x.set(0)
        y.set(0)
        setDragTransform('translate(-50%, -50%)')
      }
    }
  }, [isOpen, isMobile, x, y])

  // Update transform on drag for desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      const updateTransform = () => {
        const xVal = xSpring.get()
        const yVal = ySpring.get()
        setDragTransform(`translate(calc(-50% + ${xVal}px), calc(-50% + ${yVal}px))`)
      }
      
      const unsubscribeX = xSpring.on('change', updateTransform)
      const unsubscribeY = ySpring.on('change', updateTransform)
      
      return () => {
        unsubscribeX()
        unsubscribeY()
      }
    }
  }, [isMobile, isOpen, xSpring, ySpring])

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
            ref={modalRef}
            data-chat-modal
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={isMobile 
              ? { type: 'spring', damping: 25, stiffness: 200 }
              : { type: 'spring', damping: 25, stiffness: 200, duration: 0.3 }
            }
            drag={!isMobile}
            dragControls={!isMobile ? dragControls : undefined}
            dragMomentum={false}
            dragElastic={0.1}
            dragListener={false}
            dragConstraints={
              !isMobile && typeof window !== 'undefined'
                ? {
                    left: -(window.innerWidth / 2 - 300),
                    right: window.innerWidth / 2 - 300,
                    top: -(window.innerHeight / 2 - 350),
                    bottom: window.innerHeight / 2 - 350,
                  }
                : false
            }
            onDrag={(event, info) => {
              if (!isMobile) {
                x.set(info.offset.x)
                y.set(info.offset.y)
              }
            }}
            onDragEnd={() => {
              if (!isMobile) {
                // Snap back to center with smooth animation
                x.set(0)
                y.set(0)
              }
            }}
            className={`
              fixed z-[9999] 
              ${isMobile 
                ? 'inset-x-0 bottom-0 top-12 rounded-t-3xl' 
                : 'w-full max-w-[600px] h-[80vh] max-h-[700px] rounded-3xl'
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
              paddingTop: isMobile ? 'max(0.5rem, calc(0.5rem + env(safe-area-inset-top)))' : '0',
              paddingBottom: isMobile 
                ? '0' // No keyboard padding needed on mobile
                : '0',
              top: isMobile ? 'max(3rem, calc(3rem + env(safe-area-inset-top)))' : '50%',
              left: isMobile ? 'auto' : '50%',
              height: isMobile ? 'auto' : undefined,
              maxHeight: isMobile ? 'calc(100vh - max(3rem, calc(3rem + env(safe-area-inset-top))))' : undefined,
              y: isMobile ? dragYSpring : ySpring,
              x: isMobile ? undefined : xSpring,
              touchAction: isMobile ? 'none' : undefined, // Prevent default touch on container, allow in children
              ...(isMobile ? {} : {
                top: '50%',
                left: '50%',
                transform: dragTransform,
              }),
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Drag handle for desktop */}
            <div 
              className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 flex-shrink-0 bg-transparent"
              style={{
                paddingTop: isMobile ? 'max(0.5rem, calc(0.5rem + env(safe-area-inset-top)))' : '1rem',
                cursor: !isMobile ? 'move' : 'default',
              }}
              onPointerDown={!isMobile ? (e) => dragControls.start(e) : undefined}
            >
              <div className="flex items-center gap-3">
                {!isMobile && (
                  <motion.div
                    className="text-white/40 hover:text-white/60 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <GripVertical className="w-5 h-5" strokeWidth={1.5} />
                  </motion.div>
                )}
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
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 scroll-smooth"
              style={{
                scrollBehavior: 'smooth',
              }}
            >
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  index={index}
                />
              ))}
              {isTyping && typingContent && (
                <MessageBubble
                  message={{
                    id: 'typing',
                    role: 'assistant',
                    content: typingContent,
                  }}
                  index={messages.length}
                />
              )}
              {isTyping && !typingContent && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions - Always visible on mobile, conditional on desktop */}
            {(isMobile || messages.length <= 1) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`px-4 sm:px-6 py-4 border-t border-white/10 flex-shrink-0 bg-transparent ${isMobile ? 'pb-6' : ''}`}
                style={{
                  paddingBottom: isMobile ? `calc(1.5rem + env(safe-area-inset-bottom))` : undefined,
                }}
              >
                {isMobile && messages.length > 1 && (
                  <p className="text-xs text-white/60 mb-3 text-center">Tap a question below:</p>
                )}
                <div className={`flex gap-2 ${isMobile ? 'flex-wrap justify-center' : 'overflow-x-auto pb-2 scrollbar-hide'}`}>
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSuggestionClick(question)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className={`px-4 py-2.5 text-sm text-white/90 bg-white/8 hover:bg-white/12 border border-white/15 rounded-full transition-colors flex-shrink-0 ${
                        isMobile ? 'text-base py-3 px-5' : 'text-xs sm:text-sm'
                      }`}
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Bar - Desktop only */}
            {!isMobile && (
              <div 
                ref={inputBarRef}
                className="px-4 sm:px-6 py-4 border-t border-white/10 flex-shrink-0 bg-transparent"
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
                      className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#5ac8fa]/50 focus:border-[#5ac8fa]/50 transition-all"
                      style={{
                        fontSize: '16px',
                        WebkitTextSizeAdjust: '100%',
                      }}
                    />
                  </div>
                  <motion.button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    whileHover={{ scale: input.trim() && !isTyping ? 1.05 : 1 }}
                    whileTap={{ scale: input.trim() && !isTyping ? 0.95 : 1 }}
                    className="p-3 rounded-2xl bg-[#5ac8fa] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all min-w-[48px] min-h-[48px] flex items-center justify-center"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" strokeWidth={2} />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Message Bubble Component with improved animations
function MessageBubble({ message, index }: { message: { id: string; role: 'user' | 'assistant'; content: string }; index: number }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: isUser ? 10 : 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.25,
        delay: index * 0.03,
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
        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
          {message.id === 'typing' && (
            <span className="inline-block w-0.5 h-4 bg-white/60 ml-1 align-middle animate-pulse" />
          )}
        </p>
      </div>
    </motion.div>
  )
}

// Typing Indicator Component with pulsing dots
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
