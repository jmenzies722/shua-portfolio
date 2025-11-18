import { notFound } from 'next/navigation'
import { blogPosts } from '@/content/blog'
import BlogPostContent from '@/components/BlogPostContent'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}

