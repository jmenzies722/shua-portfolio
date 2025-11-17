'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { blogPosts } from '@/content/blog'
import GlassCard from './GlassCard'
import GlowHeader from './GlowHeader'
import PillTag from './PillTag'
import SectionContainer from './SectionContainer'
import MotionFadeIn from './MotionFadeIn'
import { format } from 'date-fns'

export default function BlogContent() {

  return (
    <SectionContainer>
      <GlowHeader 
        title="Blog" 
        subtitle="Thoughts on DevOps, infrastructure, cloud engineering, and building reliable systems."
      />

      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            className="h-full"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }
              },
            }}
          >
            <Link 
              href={`/blog/${post.slug}`} 
              className="group block h-full focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded-2xl"
            >
              <GlassCard delay={index * 0.08} className="h-full">
                <div className="p-8 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-5 text-sm text-white/50">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <PillTag variant="glow" className="mb-5 w-fit">
                    {post.category}
                  </PillTag>
                  <h3 className="text-2xl font-bold mb-4 gradient-text group-hover:text-[#007AFF] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed flex-grow" style={{ lineHeight: '1.7' }}>{post.description}</p>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  )
}
