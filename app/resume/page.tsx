/**
 * Resume Page - Web Version of Résumé
 * Sections: Summary, Experience, Projects, Skills, Education
 */
import Link from 'next/link'
import { Download, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'
import { resumeData } from '@/content/resume'

export default function Page() {
  return (
    <div className="section-wrapper space-y-8">
      <div className="glass-card p-8 space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Résumé</p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">{resumeData.name}</h1>
          <p className="text-white/70">{resumeData.title}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
          <a href={`mailto:${resumeData.email}`} className="hover:text-white inline-flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {resumeData.email}
          </a>
          <a href={`tel:${resumeData.phone}`} className="hover:text-white inline-flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {resumeData.phone}
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {resumeData.location}
          </span>
          <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a href="https://github.com/joshmenzies" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-2">
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
        <div>
          <Link href="/resume.pdf" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium hover:border-white/40">
            <Download className="h-4 w-4" />
            Download PDF
          </Link>
        </div>
      </div>

      <section className="glass-card p-8 space-y-4">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <p className="text-white/75">{resumeData.summary}</p>
      </section>

      <section className="glass-card p-8 space-y-6">
        <h2 className="text-2xl font-semibold">Experience</h2>
        <div className="space-y-6">
          {resumeData.experience.map((experience) => (
            <div key={experience.role} className="space-y-2 border-b border-white/10 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-semibold">{experience.role}</h3>
                  <p className="text-white/60 text-sm">
                    {experience.company} · {experience.location}
                  </p>
                </div>
                <p className="text-xs text-white/60">{experience.period}</p>
              </div>
              <ul className="space-y-2 text-white/75 text-sm">
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
      </section>

      <section className="glass-card p-8 space-y-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="space-y-6">
          {resumeData.projects.map((project) => (
            <div key={project.name} className="space-y-3 border-b border-white/10 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <span className="text-xs text-white/60">{project.period}</span>
              </div>
              <p className="text-white/70">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 8).map((tech) => (
                  <span key={tech} className="pill">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-2 text-white/75 text-sm">
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
      </section>

      <section className="glass-card p-8 space-y-6">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {Object.entries(resumeData.skills).map(([category, skills]) => (
            <div key={category} className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                {category.replace(/_/g, ' ')}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card p-8 space-y-4">
        <h2 className="text-2xl font-semibold">Education</h2>
        {resumeData.education.map((edu) => (
          <div key={edu.degree} className="space-y-1">
            <h3 className="text-xl font-semibold">{edu.degree}</h3>
            <p className="text-white/70 text-sm">
              {edu.school} · {edu.year}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
