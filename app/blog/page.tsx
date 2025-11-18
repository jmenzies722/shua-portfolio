import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import SectionShell from '@/components/SectionShell'
import Card from '@/components/ui/Card'
import { withTrailingSlash } from '@/lib/utils'

const posts = [
  {
    slug: 'devops-philosophy',
    title: 'The DevOps philosophy',
    summary: 'How automation, observability, and empathy create calmer delivery.',
    date: '2024-01-15',
    readTime: '5 min',
    category: 'DevOps',
  },
  {
    slug: 'aws-cost-optimization',
    title: 'AWS cost optimization strategies',
    summary: 'Practical levers for teams running multi-account AWS environments.',
    date: '2024-02-20',
    readTime: '8 min',
    category: 'AWS',
  },
  {
    slug: 'kubernetes-best-practices',
    title: 'Kubernetes best practices',
    summary: 'Lessons learned from production EKS clusters powering data workloads.',
    date: '2024-03-10',
    readTime: '6 min',
    category: 'Kubernetes',
  },
  {
    slug: 'serverless-distribution',
    title: 'Designing a serverless distribution layer',
    summary: 'Moving secure artifact publishing to CloudFront and Lambda.',
    date: '2024-04-05',
    readTime: '7 min',
    category: 'Serverless',
  },
]

export default function Page() {
  return (
    <SectionShell 
      className="space-y-8 sm:space-y-10 bg-transparent"
      style={{
        paddingTop: '1rem',
        paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, calc(1rem + env(safe-area-inset-left)))',
        paddingRight: 'max(1rem, calc(1rem + env(safe-area-inset-right)))',
        background: 'transparent',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/60">Writing</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Notes on building resilient platforms.
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            Essays on automation, observability, platform leadership, and the systems that enable teams to move fast.
          </p>
        </div>

        {/* Blog Grid - Mobile: 1 column, Desktop: 2 columns */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.slug} className="flex flex-col space-y-4">
            <Link 
              href={withTrailingSlash(`/blog/${post.slug}`)} 
              className="flex flex-col h-full space-y-4 min-h-[44px]"
            >
              <div className="flex items-center justify-between text-xs text-white/60 uppercase tracking-[0.3em]">
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold">{post.title}</h2>
              <p className="text-sm sm:text-base text-white/70 flex-1 leading-relaxed">{post.summary}</p>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-white/60">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <Clock className="h-4 w-4 ml-4 flex-shrink-0" />
                <span>{post.readTime}</span>
              </div>
            </Link>
          </Card>
        ))}
      </div>
      </div>
    </SectionShell>
  )
}