'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/content/resume'
import GlassCard from './GlassCard'
import GlowHeader from './GlowHeader'
import HaloAvatar from './HaloAvatar'
import SectionContainer from './SectionContainer'
import MotionFadeIn from './MotionFadeIn'
import AboutOrbit from './AboutOrbit'

export default function AboutContent() {
  return (
    <SectionContainer>
      {/* Apple-style subtle static lighting - no animation, minimal opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 122, 255, 0.04) 0%, rgba(90, 200, 250, 0.02) 40%, transparent 70%)',
            transform: 'translate3d(-50%, -50%, 0)',
          }}
        />
      </div>

      {/* 1. GlowHeader */}
      <GlowHeader title="About Josh" />

      {/* 2. Description text block */}
      <MotionFadeIn delay={0.1} className="mb-12 md:mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="text-lg md:text-xl text-white/75 max-w-[700px] mx-auto text-center leading-relaxed font-light"
          style={{ lineHeight: '1.7' }}
        >
          {resumeData.summary}
        </motion.p>
      </MotionFadeIn>

      {/* 3. HaloAvatar - centered with Apple-style crisp presentation */}
      <MotionFadeIn delay={0.15} className="flex justify-center mb-16 md:mb-20">
        <div className="relative">
          <HaloAvatar size="lg">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              {/* Apple-style clean glass frame - minimal blur */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                }}
              />
              
              {/* Image - crisp and sharp */}
              <img
                src="/IMG_2897.jpg"
                alt="Josh Menzies"
                className="relative w-full h-full object-cover rounded-full"
                loading="eager"
                decoding="async"
                style={{
                  objectPosition: 'center center',
                  transform: 'translate3d(0, 0, 0)',
                }}
              />
            </div>
          </HaloAvatar>
          
          {/* Orbiting Icons - optimized for performance */}
          <AboutOrbit />
        </div>
      </MotionFadeIn>

      {/* 4. Three Column Cards - Perfect alignment, Apple spacing */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20">
        <MotionFadeIn delay={0.2}>
          <GlassCard delay={0.05} className="h-full">
            <div className="p-8 md:p-10 h-full flex flex-col">
              <h2 className="text-3xl font-bold mb-6 gradient-text">What I Build</h2>
              <p className="text-white/80 leading-relaxed mb-8 flex-grow text-lg" style={{ lineHeight: '1.75' }}>
                I specialize in cloud-native platforms and serverless architectures that reduce
                operational overhead while improving reliability and performance.
              </p>
              <ul className="space-y-3.5 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Serverless distribution platforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">AI-powered automation systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Observability and monitoring platforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Infrastructure-as-code solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Cost-optimized cloud architectures</span>
                </li>
              </ul>
            </div>
          </GlassCard>
        </MotionFadeIn>

        <MotionFadeIn delay={0.25}>
          <GlassCard delay={0.1} className="h-full">
            <div className="p-8 md:p-10 h-full flex flex-col">
              <h2 className="text-3xl font-bold mb-6 gradient-text">How I Work</h2>
              <p className="text-white/80 leading-relaxed mb-8 flex-grow text-lg" style={{ lineHeight: '1.75' }}>
                Infrastructure-as-code first, observability-driven, cost-aware. I believe in
                automation, documentation, and building systems that are self-healing.
              </p>
              <ul className="space-y-3.5 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Code-first infrastructure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Comprehensive observability</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Cost optimization in every decision</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Automation over manual processes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Clear documentation and runbooks</span>
                </li>
              </ul>
            </div>
          </GlassCard>
        </MotionFadeIn>

        <MotionFadeIn delay={0.3}>
          <GlassCard delay={0.15} className="h-full">
            <div className="p-8 md:p-10 h-full flex flex-col">
              <h2 className="text-3xl font-bold mb-6 gradient-text">Principles</h2>
              <p className="text-white/80 leading-relaxed mb-8 flex-grow text-lg" style={{ lineHeight: '1.75' }}>
                My approach is guided by core principles that ensure systems are reliable, scalable,
                and cost-effective.
              </p>
              <ul className="space-y-3.5 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Reliability over features</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Cost-awareness in every decision</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Systems that scale effortlessly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Proactive over reactive</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#007AFF] mt-1.5 text-lg flex-shrink-0">•</span>
                  <span className="leading-relaxed">Clear observability always</span>
                </li>
              </ul>
            </div>
          </GlassCard>
        </MotionFadeIn>
      </div>

      {/* Subtle Apple-style divider - static, no animation */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-16 md:mb-20 pointer-events-none" />

      {/* Background Card */}
      <MotionFadeIn delay={0.35}>
        <GlassCard delay={0.2}>
          <div className="p-10 md:p-12">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Background</h2>
            <p className="text-white/80 leading-relaxed text-lg mb-6" style={{ lineHeight: '1.75' }}>
              Specializing in building automated, observable, and developer-friendly cloud platforms on AWS and Kubernetes. 
              Skilled in Go and Python for backend services and automation tooling. Experienced in designing scalable systems, 
              improving platform reliability, and empowering engineering teams through software-defined infrastructure.
            </p>
            <p className="text-white/70 leading-relaxed text-lg" style={{ lineHeight: '1.75' }}>
              Currently building serverless data pipelines, secure artifact delivery platforms, and observability systems 
              that reduce operational overhead while improving reliability and performance. Passionate about infrastructure-as-code, 
              cost optimization, and creating systems that scale effortlessly.
            </p>
          </div>
        </GlassCard>
      </MotionFadeIn>
    </SectionContainer>
  )
}
