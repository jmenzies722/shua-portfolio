import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`glass-card p-6 ${hover ? 'hover:translate-y-[-2px]' : ''} ${className}`}
      style={{
        opacity: 1,
        transform: 'translateY(0)',
        transition: hover ? 'transform 0.15s ease, background 0.15s ease' : 'none',
      }}
    >
      {children}
    </div>
  )
}
