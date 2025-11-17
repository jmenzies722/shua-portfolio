'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { X, ChevronRight } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: Array<{ name: string; href: string }>
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  const handleLinkClick = (href: string) => {
    onClose()
    router.push(href)
  }

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
            onClick={onClose}
          />

          {/* Menu Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              duration: 0.3,
            }}
            className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden"
            style={{
              paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
            }}
          >
            <div className="bg-white/[0.08] border-t border-white/[0.12] backdrop-blur-md rounded-t-3xl shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-white/30 rounded-full" />
              </div>

              {/* Profile Header */}
              <div className="px-6 py-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/[0.12] bg-white/[0.04] flex-shrink-0">
                    <img
                      src="/IMG_2897.jpg"
                      alt="Josh Menzies"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white/90 truncate">
                      Josh M.
                    </h3>
                    <p className="text-xs text-white/60 truncate">
                      Platform Engineer
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 -mr-2 rounded-full hover:bg-white/[0.12] transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-white/80" />
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="px-2 py-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleLinkClick(item.href)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-left ${
                        isActive
                          ? 'bg-white/[0.12] text-white'
                          : 'text-white/80 hover:bg-white/[0.12] hover:text-white'
                      }`}
                      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                    >
                      <span className="text-base font-medium">{item.name}</span>
                      <ChevronRight className="w-5 h-5 text-white/40" />
                    </button>
                  )
                })}
              </nav>

              {/* Bottom Spacing */}
              <div className="h-2" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
