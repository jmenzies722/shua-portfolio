export interface Project {
  id: string
  slug: string
  title: string
  description: string
  shortDescription: string
  technologies: string[]
  metrics?: Array<{ label: string; value: string }>
  problem: string
  solution: string
  architecture: string[]
  impact: string[]
  featured?: boolean
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime: string
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  technologies: string[]
  achievements: string[]
  metrics?: Array<{ label: string; value: string }>
}

export interface Skill {
  category: string
  icon: string
  skills: string[]
}
