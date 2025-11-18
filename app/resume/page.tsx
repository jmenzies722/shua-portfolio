/**
 * Resume Page - Web Version of Résumé
 * Sections: Summary, Experience, Projects, Skills, Education
 */
import Link from 'next/link'
import { Download, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'
import { resumeData } from '@/content/resume'

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 tracking-tight">
          {resumeData.name}
        </h1>
        <p className="text-lg sm:text-xl text-white/70 mb-6">{resumeData.title}</p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white/70 mb-8">
          <a href={`mailto:${resumeData.email}`} className="flex items-center gap-2 hover:text-[#007AFF] transition-colors">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{resumeData.email}</span>
          </a>
          <a href={`tel:${resumeData.phone}`} className="flex items-center gap-2 hover:text-[#007AFF] transition-colors">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{resumeData.phone}</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{resumeData.location}</span>
          </div>
          <a
            href={resumeData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#007AFF] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm">LinkedIn</span>
          </a>
          <a
            href="https://github.com/joshmenzies"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#007AFF] transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">GitHub</span>
          </a>
        </div>

        {/* Download Button */}
        <Link
          href="/resume.pdf"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium transition-all duration-200 hover:bg-white/90 hover:scale-[1.02]"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Link>
      </div>

      {/* Summary */}
      <div className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
        <p className="text-white/80 leading-relaxed">{resumeData.summary}</p>
      </div>

      {/* Experience */}
      <div className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Experience</h2>
        <div className="space-y-8">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className={index > 0 ? 'pt-8 border-t border-white/[0.08]' : ''}>
              <h3 className="text-xl font-semibold mb-2">{exp.role}</h3>
              <p className="text-white/70 text-sm mb-2">{exp.company} • {exp.location}</p>
              <p className="text-white/60 text-xs mb-4">{exp.period}</p>
              <ul className="space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-white/70 leading-relaxed flex items-start gap-3 text-sm">
                    <span className="text-[#007AFF] mt-1.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
        <div className="space-y-6">
          {resumeData.projects.map((project, index) => (
            <div key={index} className={index > 0 ? 'pt-6 border-t border-white/[0.08]' : ''}>
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-white/70 text-sm mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-white/[0.05] border border-white/[0.10] rounded text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-1">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                    <span className="text-[#007AFF] mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(resumeData.skills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3 capitalize">
                {category.replace(/_/g, ' ')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm bg-white/[0.05] border border-white/[0.10] rounded-lg text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-semibold mb-6">Education</h2>
        <div className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
              <p className="text-white/70 text-sm">{edu.school} • {edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
