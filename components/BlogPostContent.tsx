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
            <div className="text-white/70 leading-relaxed text-base md:text-lg space-y-6">
              {post.slug === 'golden-path-for-developers' && (
                <>
                  <p>
                    Building a "golden path" for developers means creating a self-service platform that eliminates 
                    friction while maintaining security and reliability. At Nectar Services, we transformed our 
                    deployment process from manual, error-prone workflows to a fully automated platform that 
                    reduced deployment time by 40% and standardized infrastructure across 5 AWS accounts.
                  </p>
                  <h2 className="text-2xl font-semibold text-white mb-4 mt-8">The Challenge</h2>
                  <p>
                    Before the golden path, each team had their own deployment scripts, inconsistent Terraform modules, 
                    and manual approval processes. This led to deployment errors, security gaps, and slow time-to-market. 
                    Developers spent more time fighting infrastructure than building features.
                  </p>
                  <h2 className="text-2xl font-semibold text-white mb-4 mt-8">The Solution</h2>
                  <p>
                    We built a standardized platform using Terraform modules, GitLab CI/CD pipelines, and AWS-native 
                    services. The platform provides:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Reusable Terraform modules for common patterns (EKS clusters, Lambda functions, S3 buckets)</li>
                    <li>Automated CI/CD pipelines with built-in security scanning and compliance checks</li>
                    <li>Self-service provisioning through GitLab merge requests</li>
                    <li>Standardized observability with Datadog and OpenTelemetry</li>
                  </ul>
                  <h2 className="text-2xl font-semibold text-white mb-4 mt-8">The Impact</h2>
                  <p>
                    The golden path reduced deployment time by 40%, cut deployment errors by 30%, and enabled 3 teams 
                    to adopt consistent infrastructure patterns. Developers can now provision new environments in minutes 
                    instead of days, and our platform consistency has improved dramatically.
                  </p>
                </>
              )}
              {post.slug === 'observability-at-scale' && (
                <>
                  <p>
                    Implementing observability across a multi-account AWS organization with 200+ EKS services requires 
                    careful planning, standardization, and automation. This post covers how we implemented Datadog and 
                    OpenTelemetry to improve detection latency by 40% and reduce MTTR by 25%.
                  </p>
                  <h2 className="text-2xl font-semibold text-white mb-4 mt-8">The Challenge</h2>
                  <p>
                    With services spread across multiple AWS accounts and EKS clusters, we had fragmented observability. 
                    Teams used different monitoring tools, alerting was inconsistent, and incident response was slow. 
                    We needed a unified observability strategy that worked at scale.
                  </p>
                  <h2 className="text-2xl font-semibold text-white mb-4 mt-8">The Solution</h2>
                  <p>
                    We standardized on Datadog for metrics, logs, and APM, and implemented OpenTelemetry for 
                    distributed tracing. Key components:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>OpenTelemetry auto-instrumentation for all EKS services</li>
                    <li>Datadog agents deployed via DaemonSet across all clusters</li>
                    <li>Standardized dashboards and alerting rules</li>
                    <li>Automated WAF rules for security monitoring</li>
                    <li>Trace-based incident correlation</li>
                  </ul>
                  <h2 className="text-2xl font-semibold text-white mb-4 mt-8">The Impact</h2>
                  <p>
                    Detection latency improved by 40%, MTTR decreased by 25%, and we reduced alert fatigue by 60% 
                    through intelligent alerting. The unified observability platform now provides real-time visibility 
                    across all services, enabling faster incident response and data-driven optimization.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
