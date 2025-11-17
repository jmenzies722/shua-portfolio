import { Skill } from '@/types'

export const skills: Skill[] = [
  {
    category: 'Languages',
    icon: 'Code',
    skills: ['Go', 'Python', 'Bash'],
  },
  {
    category: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: ['AWS (EKS, Lambda, S3, RDS, Glue, Athena, Macie, IAM, KMS)', 'Terraform', 'GitLab CI/CD', 'Docker', 'Helm'],
  },
  {
    category: 'Monitoring & Security',
    icon: 'Shield',
    skills: ['Datadog', 'Prometheus', 'OpenTelemetry', 'WAF', 'Secrets Manager', 'Vault'],
  },
  {
    category: 'Collaboration',
    icon: 'Users',
    skills: ['Jira', 'Slack', 'Confluence', 'Agile Workflows'],
  },
]
