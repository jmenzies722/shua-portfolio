import { resumeData } from '@/content/resume'

interface ShuaResponse {
  model: string
  response: string
}

export function generateShuaResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()
  
  // Experience queries
  if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('role')) {
    const experience = resumeData.experience
    let response = `Josh has ${experience.length} key roles in his experience:\n\n`
    
    experience.forEach((exp, index) => {
      response += `${index + 1}. **${exp.role}** at ${exp.company} (${exp.period})\n`
      response += `   Location: ${exp.location}\n`
      response += `   Key highlights:\n`
      exp.highlights.slice(0, 3).forEach((highlight) => {
        response += `   • ${highlight}\n`
      })
      response += `\n`
    })
    
    return response.trim()
  }

  // Projects queries
  if (lowerMessage.includes('project') || lowerMessage.includes('built') || lowerMessage.includes('build')) {
    const projects = resumeData.projects
    let response = `Josh has worked on ${projects.length} major projects:\n\n`
    
    projects.forEach((project, index) => {
      response += `${index + 1}. **${project.name}** (${project.company})\n`
      response += `   ${project.description}\n`
      response += `   Period: ${project.period}\n`
      response += `   Key achievements:\n`
      project.highlights.slice(0, 3).forEach((highlight) => {
        response += `   • ${highlight}\n`
      })
      response += `   Tech stack: ${project.tech.slice(0, 5).join(', ')}\n\n`
    })
    
    return response.trim()
  }

  // Skills/tech queries
  if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('technology') || lowerMessage.includes('stack') || lowerMessage.includes('tools')) {
    const skills = resumeData.skills
    let response = `Josh's technical skills span several areas:\n\n`
    
    response += `**Languages:** ${skills.languages.join(', ')}\n\n`
    response += `**Cloud & DevOps:** ${skills.cloud_devops.join(', ')}\n\n`
    response += `**Monitoring & Security:** ${skills.monitoring_security.join(', ')}\n\n`
    response += `**Collaboration:** ${skills.collaboration.join(', ')}\n\n`
    response += `He's particularly strong with AWS services, Terraform for infrastructure as code, and observability tools like Datadog and OpenTelemetry.`
    
    return response
  }

  // Resume summary
  if (lowerMessage.includes('résumé') || lowerMessage.includes('resume') || lowerMessage.includes('summary') || lowerMessage.includes('overview')) {
    return `${resumeData.summary}\n\nJosh is a ${resumeData.title} based in ${resumeData.location}. He specializes in building secure, automated, and observable infrastructure on AWS and Kubernetes. With experience in Terraform, Python, and Go, he focuses on improving reliability and speed for AI and cloud workloads.`
  }

  // Strengths/what is he strongest at
  if (lowerMessage.includes('strong') || lowerMessage.includes('best') || lowerMessage.includes('expert') || lowerMessage.includes('specializ')) {
    return `Josh's strongest areas are:\n\n**1. AWS Platform Engineering** - Building serverless architectures, EKS clusters, and automated infrastructure\n\n**2. Infrastructure as Code** - Terraform expertise for consistent, repeatable deployments\n\n**3. Observability & Monitoring** - Datadog, OpenTelemetry, and WAF implementation for better visibility\n\n**4. Automation & CI/CD** - GitLab CI/CD pipelines, Lambda functions, and event-driven workflows\n\n**5. Security & Compliance** - Macie, IAM, KMS, and automated security practices\n\nHe's particularly known for reducing operational overhead, improving MTTR, and building platforms that scale reliably.`
  }

  // Education
  if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('school') || lowerMessage.includes('university')) {
    const edu = resumeData.education[0]
    return `Josh earned a ${edu.degree} from ${edu.school} in ${edu.year}.`
  }

  // Contact info
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('connect')) {
    return `You can reach Josh at:\n\n**Email:** ${resumeData.email}\n**Phone:** ${resumeData.phone}\n**LinkedIn:** ${resumeData.linkedin}\n\nHe's based in ${resumeData.location} and is open to discussing platform engineering opportunities, infrastructure challenges, or collaboration.`
  }

  // Default response
  return `I can help you learn about Josh's experience, projects, skills, education, or contact information. Try asking:\n\n• "Tell me about Josh's experience"\n• "What projects has he built?"\n• "What tech does he work with?"\n• "Summarize his résumé"\n• "What is Josh strongest at?"`
}

export function formatShuaResponse(userMessage: string): ShuaResponse {
  return {
    model: 'shua-1.0',
    response: generateShuaResponse(userMessage),
  }
}

