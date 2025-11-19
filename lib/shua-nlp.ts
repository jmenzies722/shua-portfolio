import { resumeData } from '@/content/resume'
import { Message } from '@/contexts/ShuaContext'

interface KnowledgeBase {
  summary: string
  experience: typeof resumeData.experience
  projects: typeof resumeData.projects
  skills: typeof resumeData.skills
  education: typeof resumeData.education
  name: string
  title: string
  location: string
}

const knowledge: KnowledgeBase = {
  summary: resumeData.summary,
  experience: resumeData.experience,
  projects: resumeData.projects,
  skills: resumeData.skills,
  education: resumeData.education,
  name: resumeData.name,
  title: resumeData.title,
  location: resumeData.location,
}

// Intent detection
type Intent = 
  | 'experience' 
  | 'projects' 
  | 'skills' 
  | 'summary' 
  | 'strengths' 
  | 'education' 
  | 'contact' 
  | 'comparison'
  | 'advice'
  | 'general'

function detectIntent(message: string, history: Message[]): Intent {
  const lower = message.toLowerCase()
  
  // Check for experience-related queries
  if (lower.match(/\b(experience|work|job|role|position|career|background|worked|working|current|present|nectar)\b/)) {
    return 'experience'
  }
  
  // Check for project queries
  if (lower.match(/\b(project|built|build|created|developed|delivered|showcase|case study|best|strongest|favorite)\b/)) {
    return 'projects'
  }
  
  // Check for skills/tech queries
  if (lower.match(/\b(skill|tech|technology|stack|tools|proficient|expert|know|use|work with|language|code|programming|aws|cloud)\b/)) {
    return 'skills'
  }
  
  // Check for strengths/best at
  if (lower.match(/\b(best|strong|strongest|expert|specializ|excel|great at|good at)\b/)) {
    return 'strengths'
  }
  
  // Check for summary/overview
  if (lower.match(/\b(summary|overview|introduce|tell me about|who is|what does|quick intro|intro)\b/)) {
    return 'summary'
  }
  
  // Check for education
  if (lower.match(/\b(education|degree|school|university|college|studied)\b/)) {
    return 'education'
  }
  
  // Check for contact
  if (lower.match(/\b(contact|email|reach|connect|get in touch|phone|linkedin)\b/)) {
    return 'contact'
  }
  
  // Check for comparison/advice
  if (lower.match(/\b(compare|versus|vs|better|difference|advice|recommend|suggest)\b/)) {
    return 'comparison'
  }
  
  return 'general'
}

// Natural language generation
function generateNaturalResponse(
  intent: Intent,
  message: string,
  history: Message[]
): string {
  const lower = message.toLowerCase()
  
  switch (intent) {
    case 'experience': {
      const exp = knowledge.experience
      if (exp.length === 0) return "I don't have detailed experience information to share right now."
      
      // Check if asking about specific company or role
      const askingAboutCurrent = lower.includes('current') || lower.includes('present') || lower.includes('now')
      const askingAboutNectar = lower.includes('nectar')
      
      if (askingAboutCurrent || askingAboutNectar) {
        const current = exp[0]
        return `Right now, ${knowledge.name} is working as a ${current.role} at ${current.company} (${current.period}). His focus there has been on building serverless data pipelines, secure artifact distribution, and enhancing observability across large-scale EKS deployments. He's reduced ETL times by 40%, built platforms handling 500+ builds monthly, and improved detection latency by 40%—all while standardizing infrastructure across multiple AWS accounts.`
      }
      
      return `${knowledge.name} has ${exp.length} key roles in his career. Most recently, he's been a ${exp[0].role} at ${exp[0].company}, where he's focused on AWS-native automation, serverless architectures, and observability systems. Before that, he worked as a ${exp[1]?.role || 'System Support Engineer'} at the same company, automating workflows and supporting CI/CD pipelines. His work consistently centers on reducing operational overhead and building platforms that scale reliably.`
    }
    
    case 'projects': {
      const projects = knowledge.projects
      if (projects.length === 0) return "I don't have specific project details to share right now."
      
      // Check if asking about best/strongest project
      if (lower.includes('best') || lower.includes('strongest') || lower.includes('favorite')) {
        const best = projects[0] // AI Data Pipeline is most recent/complex
        return `I'd say his strongest project is the ${best.name} at ${best.company}. It's a serverless AI-compliant data pipeline that reduced ETL runtime by 40% using automated schema discovery. He implemented Macie-driven PII detection and masking across 1 TB+ of PostgreSQL data, orchestrated event-driven Lambda pipelines, and automated dataset versioning—all while keeping everything compliant and audit-ready. It really showcases his ability to build secure, automated systems at scale.`
      }
      
      if (projects.length === 1) {
        const p = projects[0]
        return `He's been working on the ${p.name}—a ${p.description.toLowerCase()}. The project uses ${p.tech.slice(0, 4).join(', ')}, and focuses on ${p.highlights[0]?.toLowerCase() || 'automated data processing'}. It's a solid example of his serverless architecture work.`
      }
      
      return `He's worked on ${projects.length} major projects. The most recent is the ${projects[0].name}, which is a ${projects[0].description.toLowerCase()}. It reduced ETL runtime by 40% and handles PII detection across large datasets. The other is a ${projects[1].name.toLowerCase()}, a secure artifact distribution platform that delivers 500+ monthly artifacts using Lambda, API Gateway, and CloudFront. Both showcase his ability to build reliable, automated infrastructure.`
    }
    
    case 'skills': {
      const skills = knowledge.skills
      const languages = skills.languages.join(', ')
      const cloud = skills.cloud_devops.slice(0, 3).join(', ')
      
      if (lower.includes('language') || lower.includes('code') || lower.includes('programming')) {
        return `He primarily works with ${languages}. Python is his go-to for automation and data pipelines, Go for performance-critical services, and Bash for scripting and CI/CD tasks.`
      }
      
      if (lower.includes('aws') || lower.includes('cloud')) {
        return `Most of his work sits inside AWS—especially EKS for Kubernetes, Lambda for serverless, S3 for storage, and services like Glue, Athena, and Macie for data pipelines. He's also deep into Terraform for infrastructure as code, which he uses to standardize deployments across multiple AWS accounts.`
      }
      
      return `His technical skills span several areas. For languages, he works with ${languages}. On the cloud and DevOps side, he's focused on ${cloud}, plus Docker and Helm for container orchestration. For observability, he uses Datadog, Prometheus, and OpenTelemetry. He's particularly strong with AWS services, Terraform, and building observable systems.`
    }
    
    case 'strengths': {
      return `I'd say his strongest areas are:\n\n**1. AWS Platform Engineering** — Building serverless architectures, EKS clusters, and automated infrastructure that scales reliably.\n\n**2. Infrastructure as Code** — Deep Terraform expertise for consistent, repeatable deployments across environments.\n\n**3. Observability & Monitoring** — Implementing Datadog, OpenTelemetry, and WAF rules that improve detection latency and reduce MTTR.\n\n**4. Automation & CI/CD** — GitLab CI/CD pipelines, Lambda functions, and event-driven workflows that remove manual toil.\n\n**5. Security & Compliance** — Macie, IAM, KMS, and automated security practices that keep systems compliant.\n\nHe's particularly known for reducing operational overhead, improving MTTR, and building platforms that teams actually want to use.`
    }
    
    case 'summary': {
      return `${knowledge.summary}\n\nHe's based in ${knowledge.location} and focuses on building secure, automated infrastructure that keeps engineering velocity high without trading away reliability. His work spans AWS-native automation, serverless data flows, and observability layers—all with an emphasis on reducing operational drag for engineering teams.`
    }
    
    case 'education': {
      const edu = knowledge.education[0]
      return `He earned a ${edu.degree} from ${edu.school} in ${edu.year}.`
    }
    
    case 'contact': {
      return `You can reach ${knowledge.name} at:\n\n**Email:** ${resumeData.email}\n**Phone:** ${resumeData.phone}\n**LinkedIn:** ${resumeData.linkedin}\n\nHe's based in ${knowledge.location} and is open to discussing platform engineering opportunities, infrastructure challenges, or collaboration.`
    }
    
    case 'general':
    default: {
      // Check history for context
      const lastUserMessage = history.filter(m => m.role === 'user').slice(-1)[0]
      if (lastUserMessage) {
        const lastIntent = detectIntent(lastUserMessage.content, [])
        if (lastIntent !== 'general') {
          return `I can help you learn more about ${knowledge.name}'s ${lastIntent}. What specifically would you like to know?`
        }
      }
      
      return `I can help you learn about ${knowledge.name}'s experience, projects, skills, education, or contact information. What would you like to know?`
    }
  }
}

export function generateShuaReply(
  message: string,
  history: Message[]
): string {
  const intent = detectIntent(message, history)
  let response = generateNaturalResponse(intent, message, history)
  
  // Add conversational touches based on history
  const recentUserMessages = history.filter(m => m.role === 'user').slice(-3)
  const recentAssistantMessages = history.filter(m => m.role === 'assistant').slice(-2)
  
  // Check if we're repeating ourselves
  const lastAssistantContent = recentAssistantMessages[recentAssistantMessages.length - 1]?.content.toLowerCase() || ''
  if (lastAssistantContent && response.toLowerCase().includes(lastAssistantContent.substring(0, 50))) {
    // Add variation to avoid repetition
    if (!response.toLowerCase().startsWith('to add')) {
      response = `To add to that, ${response.toLowerCase()}`
    }
  }
  
  // Add follow-up context if this is a continuation
  if (recentUserMessages.length > 1 && recentAssistantMessages.length > 0) {
    const lastUserIntent = detectIntent(recentUserMessages[recentUserMessages.length - 2].content, [])
    if (lastUserIntent === intent && intent !== 'general') {
      // This is a follow-up on the same topic - make it feel connected
      if (response.startsWith("He's") || response.startsWith("His")) {
        response = response.replace(/^He's/, "He's also").replace(/^His/, "His")
      }
    }
  }
  
  // Ensure response doesn't hallucinate - if we can't answer, be honest
  if (response.length < 20 && intent === 'general') {
    return `I can help you learn about ${knowledge.name}'s experience, projects, skills, education, or contact information. What specifically would you like to know?`
  }
  
  return response
}
