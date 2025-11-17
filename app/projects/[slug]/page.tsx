import { notFound } from 'next/navigation'
import { projects } from '@/content/projects'
import ProjectCaseStudy from '@/components/ProjectCaseStudy'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectCaseStudy project={project} />
}

