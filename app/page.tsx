import Button from '@/components/ui/Button'
import SectionShell from '@/components/SectionShell'
import HeroAvatar from '@/components/HeroAvatar'

const orbitTech = ['AWS', 'Terraform', 'Kubernetes', 'Lambda', 'Python', 'Datadog']

export default function Page() {
  return (
    <SectionShell className="section-wrapper pt-28 pb-20">
      <div className="glass-card p-8 sm:p-12 w-full max-w-5xl mx-auto">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Platform Engineering</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              Scaling secure, observable infrastructure for teams who cannot slow down.
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              I design AWS-native automation, serverless data flows, and observability layers that keep engineering
              velocity high without trading away reliability or trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/projects" variant="primary">
                View projects
              </Button>
              <Button href="/resume" variant="secondary">
                View résumé
              </Button>
              <Button href="/contact" variant="secondary">
                Contact
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 pt-3">
              {orbitTech.map((tech) => (
                <span key={tech} className="pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <HeroAvatar src="/IMG_2897.jpg" alt="Josh Menzies" />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
