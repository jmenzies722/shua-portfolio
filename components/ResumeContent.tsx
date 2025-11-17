'use client'

import { Download, Mail, Phone, MapPin, Linkedin } from 'lucide-react'
import { resumeData } from '@/content/resume'
import Card from './ui/Card'
import Button from './ui/Button'

export default function ResumeContent() {
  return (
    <section className="py-20 md:py-32">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#007AFF]/20 blur-2xl rounded-full" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden glass-profile p-1">
                <img
                  src="/IMG_2897.jpg"
                  alt="Josh Menzies"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 gradient-text">
            {resumeData.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8">{resumeData.title}</p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 mb-8">
            <a href={`mailto:${resumeData.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{resumeData.email}</span>
            </a>
            <a href={`tel:${resumeData.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
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
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
          
          <Button variant="primary" icon={<Download size={18} />}>
            Download PDF
          </Button>
        </div>

        {/* Summary */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Summary</h2>
          <p className="text-white/80 leading-relaxed">{resumeData.summary}</p>
        </Card>

        {/* Experience */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Experience</h2>
          <div className="space-y-8">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className={index > 0 ? 'pt-8 border-t border-white/10' : ''}>
                <h3 className="text-xl font-semibold mb-2">{exp.role}</h3>
                <p className="text-white/70 mb-2">{exp.company} • {exp.location}</p>
                <p className="text-white/60 text-sm mb-4">{exp.period}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-white/70 leading-relaxed flex items-start gap-3">
                      <span className="text-[#007AFF] mt-1.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {/* Projects */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Projects</h2>
          <div className="space-y-6">
            {resumeData.projects.map((project, index) => (
              <div key={index} className={index > 0 ? 'pt-6 border-t border-white/10' : ''}>
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-white/70 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs glass-card rounded-full text-white/70">
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-white/70 leading-relaxed flex items-start gap-3">
                      <span className="text-[#007AFF] mt-1.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {/* Skills */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Skills</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.languages.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm glass-card rounded-lg text-white/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Cloud & DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.cloud_devops.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm glass-card rounded-lg text-white/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Monitoring & Security</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.monitoring_security.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm glass-card rounded-lg text-white/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Collaboration</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.collaboration.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm glass-card rounded-lg text-white/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Education */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 gradient-text">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-1">{edu.degree}</h3>
              <p className="text-white/70">{edu.school} • {edu.year}</p>
            </div>
          ))}
        </Card>
      </div>
    </section>
  )
}
