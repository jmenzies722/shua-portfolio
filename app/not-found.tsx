import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-9xl font-display font-bold gradient-text mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4 text-white">Page Not Found</h2>
        <p className="text-white/70 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 glass-card px-8 py-4 text-white hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
