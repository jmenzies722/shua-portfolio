'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '@/types'
import { format } from 'date-fns'
import GlassCard from './GlassCard'

interface BlogPostContentProps {
  post: BlogPost
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="pt-32 pb-32 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-2 bg-white/5 rounded-lg text-sm text-white/70 mb-6">
            {post.category}
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 gradient-text">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-white/50">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime} read</span>
            </div>
          </div>
        </motion.div>

        <GlassCard delay={0.2}>
          <div className="p-10 prose prose-invert max-w-none">
            <p className="text-xl text-white/70 leading-relaxed mb-8">{post.description}</p>
            <div className="text-white/70 leading-relaxed">
              <p className="mb-6">
                This is a placeholder blog post. In a production environment, you would use MDX to
                render the full blog content from markdown files.
              </p>
              <p className="mb-6">
                To set up MDX blog posts, create markdown files in a `content/blog/` directory and
                use Next.js MDX loader to render them. Each blog post would have frontmatter with
                metadata and the content would be written in markdown.
              </p>
              <h2 className="text-3xl font-bold gradient-text mb-4 mt-8">
                Example Content Structure
              </h2>
              <p className="mb-6">
                Blog posts can include code examples, diagrams, and rich formatting. The MDX format
                allows for React components to be embedded directly in markdown.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

