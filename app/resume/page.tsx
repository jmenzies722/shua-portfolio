/**
 * Resume Page - Web Version of Résumé
 * Sections: Summary, Experience, Projects, Skills, Education
 */
import Link from 'next/link'
import { Download, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'
import { resumeData } from '@/content/resume'
import SectionShell from '@/components/SectionShell'
import Card from '@/components/ui/Card'

export default function Page() {
  return (
    <SectionShell 
      className="space-y-6 sm:space-y-8 bg-transparent"
      style={{
        paddingTop: '1rem',
        paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, calc(1rem + env(safe-area-inset-left)))',
        paddingRight: 'max(1rem, calc(1rem + env(safe-area-inset-right)))',
        background: 'transparent',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 space-y-6 sm:space-y-8">
      <Card className="space-y-5 sm:space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/60">Résumé</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            {resumeData.name}
          </h1>
          <p className="text-base sm:text-lg text-white/70">{resumeData.title}</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/70">
          <a href={`mailto:${resumeData.email}`} className="hover:text-white inline-flex items-center gap-2 min-h-[44px] justify-center">
            <Mail className="h-4 w-4" />
            {resumeData.email}
          </a>
          <a href={`tel:${resumeData.phone}`} className="hover:text-white inline-flex items-center gap-2 min-h-[44px] justify-center">
            <Phone className="h-4 w-4" />
            {resumeData.phone}
          </a>
          <span className="inline-flex items-center gap-2 min-h-[44px] justify-center">
            <MapPin className="h-4 w-4" />
            {resumeData.location}
          </span>
          <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-2 min-h-[44px] justify-center">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a href="https://github.com/joshmenzies" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-2 min-h-[44px] justify-center">
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
        <div>
          <Link href="/resume.pdf" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium hover:border-white/40 transition-colors min-h-[48px]">
            <Download className="h-4 w-4" />
            Download PDF
          </Link>
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Summary</h2>
        <p className="text-sm sm:text-base text-white/75 leading-relaxed">{resumeData.summary}</p>
      </Card>

      <Card className="space-y-5 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Experience</h2>
        <div className="space-y-6">
          {resumeData.experience.map((experience) => (
            <div key={experience.role} className="space-y-2 border-b border-white/10 pb-6 last:border-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">{experience.role}</h3>
                  <p className="text-white/60 text-xs sm:text-sm">
                    {experience.company} · {experience.location}
                  </p>
                </div>
                <p className="text-xs text-white/60">{experience.period}</p>
              </div>
              <ul className="space-y-2 text-white/75 text-sm leading-relaxed">
                {experience.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-[#5ac8fa]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-5 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Projects</h2>
        <div className="space-y-6">
          {resumeData.projects.map((project) => (
            <div key={project.name} className="space-y-3 border-b border-white/10 pb-6 last:border-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-semibold">{project.name}</h3>
                <span className="text-xs text-white/60">{project.period}</span>
              </div>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 8).map((tech) => (
                  <span key={tech} className="pill text-xs sm:text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-2 text-white/75 text-sm leading-relaxed">
                {project.highlights.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-[#5ac8fa]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-5 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Skills</h2>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          {Object.entries(resumeData.skills).map(([category, skills]) => (
            <div key={category} className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                {category.replace(/_/g, ' ')}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="pill text-xs sm:text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Education</h2>
        {resumeData.education.map((edu) => (
          <div key={edu.degree} className="space-y-1">
            <h3 className="text-lg sm:text-xl font-semibold">{edu.degree}</h3>
            <p className="text-white/70 text-sm">
              {edu.school} · {edu.year}
            </p>
          </div>
        ))}
      </Card>
      </div>
    </SectionShell>
  )
}
