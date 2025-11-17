'use client'

import { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

const maxWidthClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  '2xl': 'max-w-7xl',
  full: 'max-w-full',
}

export default function SectionContainer({ 
  children, 
  className = '', 
  maxWidth = '2xl' 
}: SectionContainerProps) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      <div className={`pt-32 pb-32 md:pt-40 md:pb-40 px-6 lg:px-8 mx-auto ${maxWidthClasses[maxWidth]} relative z-10`}>
        {children}
      </div>
    </div>
  )
}

