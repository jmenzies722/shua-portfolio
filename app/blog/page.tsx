/**
 * Blog Page - Simple Blog Index
 * Grid of blog post cards with category, date, title, description
 */
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'

const blogPosts = [
  {
    slug: 'devops-philosophy',
    title: 'The DevOps Philosophy',
    excerpt: 'Building reliable systems through automation and observability.',
    date: '2024-01-15',
    readTime: '5 min',
    category: 'DevOps',
  },
  {
    slug: 'aws-cost-optimization',
    title: 'AWS Cost Optimization Strategies',
    excerpt: 'Practical approaches to reducing cloud infrastructure costs.',
    date: '2024-02-20',
    readTime: '8 min',
    category: 'AWS',
  },
  {
    slug: 'kubernetes-best-practices',
    title: 'Kubernetes Best Practices',
    excerpt: 'Lessons learned from running production workloads on K8s.',
    date: '2024-03-10',
    readTime: '6 min',
    category: 'Kubernetes',
  },
]

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Blog
        </h1>
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Thoughts on DevOps, infrastructure, cloud engineering, and building reliable systems
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card p-8 block hover:bg-white/[0.08] transition-all duration-200"
          >
            <div className="mb-4">
              <span className="px-3 py-1 text-xs bg-white/[0.05] border border-white/[0.10] rounded-full text-white/70">
                {post.category}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mb-3">{post.title}</h2>
            <p className="text-white/70 text-sm md:text-base mb-4 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-white/60 text-xs pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
