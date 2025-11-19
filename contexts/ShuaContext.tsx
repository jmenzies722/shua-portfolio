'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ShuaContextType {
  messages: Message[]
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  clearMessages: () => void
  getRecentHistory: (count?: number) => Message[]
}

const ShuaContext = createContext<ShuaContextType | undefined>(undefined)

export function ShuaProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `${message.role}-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    }
    setMessages((prev) => {
      const updated = [...prev, newMessage]
      // Keep only last 20 messages for context
      return updated.slice(-20)
    })
  }

  const clearMessages = () => {
    setMessages([])
  }

  const getRecentHistory = (count = 8) => {
    return messages.slice(-count)
  }

  return (
    <ShuaContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        getRecentHistory,
      }}
    >
      {children}
    </ShuaContext.Provider>
  )
}

export function useShua() {
  const context = useContext(ShuaContext)
  if (context === undefined) {
    throw new Error('useShua must be used within a ShuaProvider')
  }
  return context
}

