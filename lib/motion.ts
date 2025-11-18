export const softEase = [0.22, 1, 0.36, 1]

export const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: softEase,
      delay,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.2,
      ease: softEase,
    },
  },
})

export const hoverMotion = {
  whileHover: { scale: 1.015 },
  whileTap: { scale: 0.985 },
}

export const subtlePresence = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: softEase },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: softEase },
  },
}


