import { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: '1',
    role: 'DevOps / Platform Engineer',
    company: 'Nectar Services Corp',
    location: 'Jericho, NY',
    startDate: 'February 2024',
    endDate: null,
    technologies: ['AWS Glue', 'Lambda', 'S3', 'Athena', 'Macie', 'API Gateway', 'CloudFront', 'Cognito', 'EKS', 'Datadog', 'OpenTelemetry', 'Terraform', 'GitLab CI/CD'],
    achievements: [
      'Engineered a serverless data-masking service on AWS Glue, Lambda, S3, Athena, and Macie to sanitize 1 TB+ of PostgreSQL data, reducing ETL time 40%.',
      'Architected a secure artifact-delivery platform (API Gateway, S3, CloudFront, Cognito) replacing SFTP; handles 500+ builds per month.',
      'Enhanced observability across 200+ EKS services using Datadog and OpenTelemetry, improving detection latency 40% and MTTR 25%.',
      'Implemented automated Datadog WAF rules for XSS/SQLi detection, lowering vulnerabilities 60% and enabling automated trace-based actions.',
      'Standardized Terraform and GitLab CI/CD pipelines across 5 AWS accounts, boosting provisioning 25% and reducing deployment errors 30%.',
      'Championed reusable IaC modules and cost-optimization practices adopted by 3 teams, saving $3K monthly and improving platform consistency.',
    ],
    metrics: [
      { label: 'ETL Time Reduction', value: '40%' },
      { label: 'Builds per Month', value: '500+' },
      { label: 'MTTR Improvement', value: '25%' },
      { label: 'Vulnerability Reduction', value: '60%' },
      { label: 'Monthly Savings', value: '$3K' },
    ],
  },
  {
    id: '2',
    role: 'System Support Engineer',
    company: 'Nectar Services Corp',
    location: 'Jericho, NY',
    startDate: 'November 2023',
    endDate: 'February 2024',
    technologies: ['Terraform', 'Python', 'AWS', 'CI/CD', 'Docker'],
    achievements: [
      'Automated Terraform + Python workflows across CI/CD, monitoring, compute, and data systems, boosting deployment speed 15% and reducing manual tasks 20%.',
      'Migrated on-prem workloads to AWS with 99.9% uptime and added Python-based health checks for continuous validation.',
      'Supported CI/CD pipelines + AWS configs for cross-functional teams, improving reliability and environment consistency.',
    ],
    metrics: [
      { label: 'Deployment Speed', value: '15%' },
      { label: 'Manual Task Reduction', value: '20%' },
      { label: 'Uptime', value: '99.9%' },
    ],
  },
]
