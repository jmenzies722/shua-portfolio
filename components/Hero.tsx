import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MessageSquare } from 'lucide-react'
import AnimatedText from './AnimatedText'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        paddingTop: 'max(4rem, calc(4rem + env(safe-area-inset-top)))',
        paddingBottom: 'max(4rem, calc(4rem + env(safe-area-inset-bottom)))',
        minHeight: '-webkit-fill-available',
      }}
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Apple Tahoe Glass Card */}
        <div 
          className="glass-card p-8 sm:p-10 md:p-12 lg:p-16 mx-auto"
          style={{ 
            opacity: 1, 
            transform: 'translateY(0)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Left: Text & CTAs */}
            <div className="space-y-6 md:space-y-8 order-2 md:order-1">
              <AnimatedText />
              
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl">
                Building secure, automated, and observable infrastructure on AWS and Kubernetes.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Link
                  href="/projects"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium text-sm sm:text-base transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/chat"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 bg-white/[0.05] text-white rounded-xl font-medium text-sm sm:text-base transition-all duration-200 hover:bg-white/[0.1] hover:border-white/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  Ask Shua
                </Link>
              </div>
            </div>

            {/* Right: Avatar - Centered */}
            <div className="relative flex items-center justify-center order-1 md:order-2">
              <div className="relative">
                {/* Subtle Tahoe glass ring */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-blue-300/8 to-transparent rounded-full blur-2xl opacity-40" />
                
                {/* Avatar */}
                <div className="relative h-40 w-40 sm:h-44 sm:w-44 md:h-48 md:w-48 rounded-full overflow-hidden border-2 border-white/[0.12] bg-white/[0.04] glass-profile">
                  <Image
                    src="/IMG_2897.jpg"
                    alt="Josh Menzies"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover rounded-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
