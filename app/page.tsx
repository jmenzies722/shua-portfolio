/**
 * Home Page - Apple-style Hero Section
 * Centered hero card with text on left, avatar on right
 */
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MessageSquare, FileText } from 'lucide-react'

export default function Page() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-5xl mx-auto w-full">
        {/* Hero Card */}
        <div className="glass-card p-8 sm:p-10 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Left: Text & CTAs */}
            <div className="space-y-6 md:space-y-8 order-2 md:order-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Scaling serverless infrastructure
              </h1>
              
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
                Platform Engineer building secure, automated, and observable infrastructure on AWS and Kubernetes.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/projects"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium text-sm sm:text-base transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/resume"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 bg-white/[0.05] text-white rounded-xl font-medium text-sm sm:text-base transition-all duration-200 hover:bg-white/[0.1] hover:border-white/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <FileText className="w-4 h-4" />
                  View Résumé
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 bg-white/[0.05] text-white rounded-xl font-medium text-sm sm:text-base transition-all duration-200 hover:bg-white/[0.1] hover:border-white/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  Ask Shua
                </Link>
              </div>
            </div>

            {/* Right: Avatar */}
            <div className="relative flex items-center justify-center order-1 md:order-2">
              <div className="relative h-40 w-40 sm:h-44 sm:w-44 md:h-48 md:w-48 rounded-full overflow-hidden border-2 border-white/[0.12] bg-white/[0.04]">
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
    </section>
  )
}
