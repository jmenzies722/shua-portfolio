'use client'

import { ReactNode } from 'react'

interface GlowHeaderProps {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
}

export default function GlowHeader({ title, subtitle, children, className = '' }: GlowHeaderProps) {
  return (
    <div
      className={`text-center mb-16 md:mb-20 relative ${className}`}
    >
      {/* Apple-style static subtle glow - no animation, no blur */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0, 122, 255, 0.06) 0%, transparent 60%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
      
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 gradient-text tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-white/70 max-w-[700px] mx-auto leading-relaxed font-light" style={{ lineHeight: '1.7' }}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  )
}

