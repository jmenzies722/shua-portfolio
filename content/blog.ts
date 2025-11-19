import { BlogPost } from '@/types'

export const blogPosts: BlogPost[] = [
  {
    slug: 'golden-path-for-developers',
    title: 'How we built the golden path for developers',
    description: 'Creating a self-service platform that reduced deployment time by 40% and standardized infrastructure across 5 AWS accounts. This post covers the journey from manual, error-prone deployments to a fully automated, developer-friendly platform.',
    date: '2024-12-15',
    category: 'Platform Engineering',
    readTime: '8 min',
  },
  {
    slug: 'observability-at-scale',
    title: 'Observability at scale in a multi-account AWS org',
    description: 'Implementing Datadog and OpenTelemetry across 200+ EKS services, improving detection latency by 40% and MTTR by 25%. Learn how we standardized observability patterns, reduced alert fatigue, and enabled data-driven incident response.',
    date: '2024-11-20',
    category: 'Observability',
    readTime: '10 min',
  },
]


