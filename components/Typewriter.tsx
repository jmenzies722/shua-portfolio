'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface TypewriterProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
  className?: string
}

export default function Typewriter({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = '',
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const textsRef = useRef(texts)
  const isInitializedRef = useRef(false)

  // Update ref when texts change, but don't reset animation
  useEffect(() => {
    textsRef.current = texts
  }, [texts])

  // Initialize only once
  useEffect(() => {
    if (!isInitializedRef.current && texts.length > 0) {
      isInitializedRef.current = true
    }
  }, [texts])

  useEffect(() => {
    if (textsRef.current.length === 0 || !isInitializedRef.current) return

    const currentFullText = textsRef.current[currentTextIndex]
    if (!currentFullText) return

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseTime)
      return () => clearTimeout(pauseTimer)
    }

    const timer = setTimeout(() => {
      if (!isDeleting && currentText.length < currentFullText.length) {
        // Typing
        setCurrentText(currentFullText.slice(0, currentText.length + 1))
      } else if (!isDeleting && currentText.length === currentFullText.length && currentFullText.length > 0) {
        // Finished typing, pause then delete
        setIsPaused(true)
      } else if (isDeleting && currentText.length > 0) {
        // Deleting
        setCurrentText(currentText.slice(0, -1))
      } else if (isDeleting && currentText.length === 0) {
        // Finished deleting, move to next text
        setIsDeleting(false)
        setCurrentTextIndex((prev) => {
          const next = (prev + 1) % textsRef.current.length
          return next
        })
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, isPaused, currentTextIndex, speed, deleteSpeed, pauseTime])

  return (
    <span className={`${className} inline-block`}>
      {currentText || '\u00A0'}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[2px] h-[0.9em] bg-[#007AFF] ml-1.5 align-middle"
      />
    </span>
  )
}

