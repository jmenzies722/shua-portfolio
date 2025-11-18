/**
 * Contact Page - Clean Contact Form
 * Email, LinkedIn, GitHub links + optional "What I'm open to" section
 */
import { Mail, Linkedin, Github } from 'lucide-react'
import { resumeData } from '@/content/resume'

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Contact
        </h1>
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Interested in discussing infrastructure challenges, opportunities, or just want to connect? Let's talk.
        </p>
      </div>

      {/* Contact Card */}
      <div className="glass-card p-8 md:p-10">
        <div className="space-y-6">
          {/* Email */}
          <a
            href={`mailto:${resumeData.email}`}
            className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl hover:bg-white/[0.05] transition-colors group"
          >
            <div className="p-3 bg-white/[0.05] rounded-xl group-hover:bg-white/[0.08] transition-colors">
              <Mail className="w-5 h-5 text-[#007AFF]" />
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Email</div>
              <div className="text-base md:text-lg text-white/90">{resumeData.email}</div>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={resumeData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl hover:bg-white/[0.05] transition-colors group"
          >
            <div className="p-3 bg-white/[0.05] rounded-xl group-hover:bg-white/[0.08] transition-colors">
              <Linkedin className="w-5 h-5 text-[#007AFF]" />
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">LinkedIn</div>
              <div className="text-base md:text-lg text-white/90">Connect on LinkedIn</div>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/joshmenzies"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl hover:bg-white/[0.05] transition-colors group"
          >
            <div className="p-3 bg-white/[0.05] rounded-xl group-hover:bg-white/[0.08] transition-colors">
              <Github className="w-5 h-5 text-[#007AFF]" />
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">GitHub</div>
              <div className="text-base md:text-lg text-white/90">View my code</div>
            </div>
          </a>
        </div>

        {/* What I'm Open To */}
        <div className="mt-8 pt-8 border-t border-white/[0.08]">
          <h2 className="text-xl font-semibold mb-4">What I'm Open To</h2>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Platform Engineering roles</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>DevOps and Infrastructure positions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Internal platform teams</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Cloud infrastructure and automation</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
