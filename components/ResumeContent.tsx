import { Download, Mail, Phone, MapPin, Linkedin } from 'lucide-react'
import { resumeData } from '@/content/resume'
import Image from 'next/image'
import Link from 'next/link'

export default function ResumeContent() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-blue-300/5 to-transparent rounded-full blur-xl opacity-30" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/[0.12] bg-white/[0.04] glass-profile">
                <Image
                  src="/IMG_2897.jpg"
                  alt="Josh Menzies"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 gradient-text">
            {resumeData.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8">{resumeData.title}</p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 mb-8">
            <a href={`mailto:${resumeData.email}`} className="flex items-center gap-2 hover:text-white transition-colors text-sm md:text-base">
              <Mail className="w-4 h-4" />
              <span>{resumeData.email}</span>
            </a>
            <a href={`tel:${resumeData.phone}`} className="flex items-center gap-2 hover:text-white transition-colors text-sm md:text-base">
              <Phone className="w-4 h-4" />
              <span>{resumeData.phone}</span>
            </a>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <MapPin className="w-4 h-4" />
              <span>{resumeData.location}</span>
            </div>
            <a
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors text-sm md:text-base"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
          
          <Link
            href="/resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Link>
        </div>

        <div className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 gradient-text">Summary</h2>
          <p className="text-white/80 leading-relaxed">{resumeData.summary}</p>
        </div>

        <div className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 gradient-text">Experience</h2>
          <div className="space-y-8">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className={index > 0 ? 'pt-8 border-t border-white/[0.08]' : ''}>
                <h3 className="text-xl font-semibold mb-2 text-white/90">{exp.role}</h3>
                <p className="text-white/70 mb-2">{exp.company} • {exp.location}</p>
                <p className="text-white/60 text-sm mb-4">{exp.period}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-white/70 leading-relaxed flex items-start gap-3 text-sm md:text-base">
                      <span className="text-[#007AFF] mt-1.5 flex-shrink-0">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 gradient-text">Skills</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white/90">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.languages.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm glass-card rounded-lg text-white/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white/90">Cloud & DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.cloud_devops.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm glass-card rounded-lg text-white/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white/90">Monitoring & Security</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.monitoring_security.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm glass-card rounded-lg text-white/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white/90">Collaboration</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.collaboration.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm glass-card rounded-lg text-white/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-6 gradient-text">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-2 text-white/90">{edu.degree}</h3>
              <p className="text-white/70 mb-2">{edu.school}</p>
              <p className="text-white/60 text-sm">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
