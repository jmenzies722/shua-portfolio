import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'

const orbitTech = ['AWS', 'Terraform', 'Kubernetes', 'Lambda', 'Python', 'Datadog']

export default function Page() {
  return (
    <div className="section-wrapper pt-32">
      <div className="glass-card p-8 sm:p-10 md:p-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Platform Engineer</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              Scaling serverless infrastructure for secure, observable platforms.
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              I build AWS-native platform capabilities—automation, observability, and developer experience—
              for teams that need reliability without sacrificing speed.
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
            <div className="flex flex-wrap gap-2 pt-2">
              {orbitTech.map((tech) => (
                <span key={tech} className="pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative h-60 w-60 sm:h-64 sm:w-64">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5ac8fa]/30 to-[#7f7bff]/30 blur-3xl" />
              <div className="relative h-full w-full rounded-full overflow-hidden border border-white/15 shadow-2xl">
                <Image
                  src="/IMG_2897.jpg"
                  alt="Josh Menzies"
                  fill
                  sizes="260px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
