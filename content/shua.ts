export interface ShuaData {
  yearsOfExperience: number
  favoriteStack: string[]
  currentFocus: string[]
  descriptions: string[]
}

export const shuaData: ShuaData = {
  yearsOfExperience: 6,
  favoriteStack: ['AWS', 'Terraform', 'Python', 'TypeScript', 'Kubernetes'],
  currentFocus: [
    'Serverless architectures',
    'Cost optimization',
    'Observability platforms',
    'AI-powered automation',
  ],
  descriptions: [
    'Infrastructure Software Engineer building resilient cloud systems.',
    'AWS-native engineer specializing in automation and observability.',
    'Passionate about cost-aware infrastructure and reliability.',
    'Building the future of cloud-native platforms.',
    'Expert in infrastructure-as-code and DevOps practices.',
    'Focused on creating systems that scale effortlessly.',
  ],
}

export const shuaResponses: Record<string, string> = {
  greeting: "Hello! I'm Shua, Josh's AI assistant. I can help you learn about his work, experience, and projects. What would you like to know?",
  experience: "Josh has 6+ years of experience in infrastructure engineering, specializing in AWS, automation, and cloud-native systems. He's worked on everything from serverless platforms to observability systems.",
  projects: "Josh has built several impactful projects including an AI data pipeline automation system, a serverless distribution platform, and comprehensive observability solutions. Would you like details on any specific project?",
  skills: "Josh's expertise spans cloud platforms (AWS, GCP), infrastructure-as-code (Terraform), containerization (Kubernetes, Docker), CI/CD, monitoring, and cost optimization. He's particularly strong in Python and TypeScript.",
  contact: "You can reach Josh through the contact page, or connect on LinkedIn and GitHub. He's always open to discussing infrastructure challenges and opportunities.",
  default: "I'm here to help! Ask me about Josh's experience, projects, skills, or how to get in touch. What interests you most?",
}

