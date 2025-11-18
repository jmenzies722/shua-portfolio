// Apple-quality motion presets for mobile-first design
export const softEase = [0.22, 1, 0.36, 1]
export const springConfig = { type: 'spring', damping: 20, stiffness: 200 }

// Page transitions optimized for mobile
export const pageTransition = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.35, ease: 'easeOut' },
}

// Bottom sheet menu animation (iOS-style)
export const bottomSheetMotion = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
  transition: { type: 'spring', damping: 20, stiffness: 180 },
}

// Menu item animation for bottom sheet
export const menuItemMotion = (index: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: {
    duration: 0.3,
    delay: index * 0.03,
    ease: [0.22, 1, 0.36, 1],
  },
})

// Card hover/tap feedback
export const cardInteraction = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15, ease: softEase },
}

// Subtle fade in for content
export const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: softEase,
      delay,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.25,
      ease: softEase,
    },
  },
})

// Avatar parallax (subtle movement)
export const avatarParallax = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.3, ease: softEase }
  },
}

// Subtle presence for staggered content
export const subtlePresence = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: softEase },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: softEase },
  },
}

// Enhanced card with parallax and glow
export const enhancedCardInteraction = {
  whileHover: {
    scale: 1.02,
    y: -3,
    transition: { duration: 0.2, ease: softEase },
  },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15, ease: softEase },
}

// Scroll-triggered fade in
export const scrollFadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: softEase,
      delay,
    },
  },
  viewport: { once: true, margin: '-50px' },
})


