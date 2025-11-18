import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '@/types'
import { withTrailingSlash } from '@/lib/utils'

interface BlogPostContentProps {
  post: BlogPost
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={withTrailingSlash('/blog')}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>

        <div className="mb-12">
          <span className="inline-block px-4 py-2 glass-card rounded-lg text-sm text-white/70 mb-6">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 gradient-text">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-white/50 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime} read</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8">{post.description}</p>
            <div className="text-white/70 leading-relaxed text-base md:text-lg">
              <p className="mb-6">
                This is a placeholder blog post. In a production environment, you would use MDX to
                render the full blog content from markdown files.
              </p>
              <p className="mb-6">
                To set up MDX blog posts, create markdown files in a `content/blog/` directory and
                use Next.js MDX loader to render them. Each blog post would have frontmatter with
                metadata and the content would be written in markdown.
              </p>
              <h2 className="text-2xl font-semibold gradient-text mb-4 mt-8">
                Example Content Structure
              </h2>
              <p className="mb-6">
                Blog posts can include code examples, diagrams, and rich formatting. The MDX format
                allows for React components to be embedded directly in markdown.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
