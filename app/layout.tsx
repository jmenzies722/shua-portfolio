import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ShuaChat from '@/components/ShuaChat'
import SmoothScroll from '@/components/SmoothScroll'
import Spotlight from '@/components/Spotlight'
import SideNav from '@/components/SideNav'
import GradientFogBackground from '@/components/GradientFogBackground'

export const metadata: Metadata = {
  title: 'Josh Menzies | Platform Engineer',
  description: 'Platform Engineer building secure, automated, and observable infrastructure on AWS and Kubernetes.',
  keywords: ['DevOps', 'AWS', 'Platform Engineering', 'Cloud Engineering', 'Automation', 'Kubernetes'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#0a0a0a]">
        <GradientFogBackground fixed />
        <Spotlight />
        <SmoothScroll />
        <Navigation />
        <SideNav />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
        <ShuaChat />
      </body>
    </html>
  )
}

