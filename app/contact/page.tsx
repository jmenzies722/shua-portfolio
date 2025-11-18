/**
 * Contact Page - Clean Contact Form
 * Email, LinkedIn, GitHub links + optional "What I'm open to" section
 */
import { Mail, Linkedin, Github } from 'lucide-react'
import { resumeData } from '@/content/resume'
import SectionShell from '@/components/SectionShell'
import Card from '@/components/ui/Card'

export default function Page() {
  return (
    <SectionShell className="section-wrapper space-y-10">
      <div className="text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Contact</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Let's build calmer, faster infrastructure together.
        </h1>
        <p className="text-white/70 max-w-3xl mx-auto">
          I partner with teams on platform strategy, AWS automation, and observability programs. If that sounds familiar,
          I’d love to hear from you.
        </p>
      </div>

      <Card className="space-y-6">
        <div className="space-y-3">
          <a href={`mailto:${resumeData.email}`} className="flex items-center gap-4 rounded-2xl border border-white/10 p-4 hover:border-white/25 transition-colors">
            <Mail className="h-5 w-5 text-[#5ac8fa]" />
            <div>
              <p className="text-sm text-white/60">Email</p>
              <p className="text-lg">{resumeData.email}</p>
            </div>
          </a>
          <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/10 p-4 hover:border-white/25 transition-colors">
            <Linkedin className="h-5 w-5 text-[#5ac8fa]" />
            <div>
              <p className="text-sm text-white/60">LinkedIn</p>
              <p className="text-lg">Connect with me</p>
            </div>
          </a>
          <a href="https://github.com/joshmenzies" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/10 p-4 hover:border-white/25 transition-colors">
            <Github className="h-5 w-5 text-[#5ac8fa]" />
            <div>
              <p className="text-sm text-white/60">GitHub</p>
              <p className="text-lg">View engineering work</p>
            </div>
          </a>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <h2 className="text-xl font-semibold">What I’m open to</h2>
          <ul className="grid gap-2 text-white/75 text-sm sm:grid-cols-2">
            {[
              'Platform engineering leadership',
              'DevOps / infrastructure consulting',
              'AWS cost and observability programs',
              'Internal developer platform initiatives',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-[#5ac8fa]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </SectionShell>
  )
}
