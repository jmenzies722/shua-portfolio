import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ShuaChat from '@/components/ShuaChat'

export const metadata: Metadata = {
  title: 'Josh Menzies | Platform Engineer',
  description: 'Platform Engineer building secure, automated, and observable infrastructure on AWS and Kubernetes.',
  keywords: ['DevOps', 'AWS', 'Platform Engineering', 'Cloud Engineering', 'Automation', 'Kubernetes'],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    viewportFit: 'cover', // iPhone notch support
  },
  themeColor: '#0B0E11',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" style={{
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      <body className="antialiased bg-[#0B0E11] text-white" style={{
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}>
        <Navigation />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
        <ShuaChat />
      </body>
    </html>
  )
}
