'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useCallback } from 'react'

type Props = {
  src: string
  alt: string
}

export default function HeroAvatar({ src, alt }: Props) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 120, damping: 20 })
  const springY = useSpring(y, { stiffness: 120, damping: 20 })

  const handlePointer = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = event.clientX - (rect.left + rect.width / 2)
    const offsetY = event.clientY - (rect.top + rect.height / 2)
    x.set((offsetX / rect.width) * 12)
    y.set((offsetY / rect.height) * 12)
  }, [x, y])

  const reset = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      className="relative mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56"
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointer}
      onPointerLeave={reset}
    >
      {/* Removed gradient background - using global background only */}
      <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-white/[0.12] shadow-2xl bg-white/[0.04]">
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 128px, (max-width: 1024px) 192px, 224px" className="object-cover" priority />
      </div>
    </motion.div>
  )
}

