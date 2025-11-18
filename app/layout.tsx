import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import Spotlight from '@/components/Spotlight'

export const metadata: Metadata = {
  title: 'Josh Menzies | Platform Engineer',
  description: 'Platform Engineer building secure, automated, and observable infrastructure on AWS and Kubernetes.',
  keywords: ['DevOps', 'AWS', 'Platform Engineering', 'Cloud Engineering', 'Automation', 'Kubernetes'],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#050608',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#050608] text-white">
        <Spotlight />
        <Navigation />
        <main 
          className="min-h-screen relative z-10"
          style={{
            paddingTop: 'calc(4rem + env(safe-area-inset-top))',
          }}
        >
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
