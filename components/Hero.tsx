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
      {/* Subtle static background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(56, 120, 255, 0.08), transparent 60%)',
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Apple-style Glass Card */}
        <div 
          className="bg-white/[0.03] border border-white/[0.06] rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.45)] p-8 sm:p-10 md:p-12 lg:p-16 mx-auto"
          style={{ 
            opacity: 1, 
            transform: 'translateY(0)',
            maxWidth: '64rem',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Left: Text & CTAs */}
            <div className="space-y-6 md:space-y-8 order-2 md:order-1">
              <AnimatedText />
              
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl">
                Building secure, automated, and observable infrastructure on AWS and Kubernetes.
              </p>

              {/* CTAs - Clean Row */}
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
                {/* Subtle gradient ring */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 via-blue-300/10 to-transparent rounded-full blur-xl opacity-50" />
                
                {/* Avatar */}
                <div className="relative h-40 w-40 sm:h-44 sm:w-44 md:h-48 md:w-48 rounded-full overflow-hidden border-2 border-white/[0.12] bg-white/[0.05]">
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
