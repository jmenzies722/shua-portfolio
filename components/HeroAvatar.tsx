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
      className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64"
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointer}
      onPointerLeave={reset}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#5ac8fa]/30 to-[#7f7bff]/30 blur-3xl" />
      <div className="relative h-full w-full rounded-full overflow-hidden border border-white/15 shadow-2xl">
        <Image src={src} alt={alt} fill sizes="260px" className="object-cover" priority />
      </div>
    </motion.div>
  )
}

