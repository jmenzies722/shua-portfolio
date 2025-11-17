import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MessageSquare } from 'lucide-react'
import AnimatedText from './AnimatedText'
import Button from './ui/Button'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12"
      style={{
        paddingTop: 'max(5rem, calc(5rem + env(safe-area-inset-top)))',
        paddingBottom: 'max(3rem, calc(3rem + env(safe-area-inset-bottom)))',
        minHeight: '-webkit-fill-available',
      }}
    >
      {/* Static background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(56, 120, 255, 0.12), transparent 60%)',
        }}
      />

      <div className="container relative z-10">
        {/* Glass Hero Card - wider to accommodate longer text */}
        <div className="glass-card p-8 md:p-12 lg:p-16 max-w-6xl mx-auto" style={{ opacity: 1, transform: 'translateY(0)' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text & CTAs */}
            <div className="space-y-8">
              <AnimatedText />
              
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
                Building secure, automated, and observable infrastructure on AWS and Kubernetes.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/projects" variant="primary" icon={<ArrowRight size={18} />}>
                  View Projects
                </Button>
                <Button href="/chat" variant="secondary" icon={<MessageSquare size={18} />}>
                  Ask Shua
                </Button>
              </div>
            </div>

            {/* Right: Avatar */}
            <div className="relative flex items-center justify-center">
              <div className="relative">
                {/* Minimal glow */}
                <div className="absolute inset-0 bg-[#007AFF]/10 blur-2xl rounded-full" />
                
                {/* Avatar */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden glass-profile p-1">
                  <Image
                    src="/IMG_2897.jpg"
                    alt="Josh Menzies"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover rounded-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 opacity-100"
          style={{
            bottom: 'max(2rem, calc(2rem + env(safe-area-inset-bottom)))',
          }}
        >
          <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-3 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
