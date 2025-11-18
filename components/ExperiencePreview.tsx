import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { resumeData } from '@/content/resume'
import { withTrailingSlash } from '@/lib/utils'

export default function ExperiencePreview() {
  const featured = resumeData.experience.slice(0, 2)

  return (
    <section id="experience" className="py-20 md:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 gradient-text">
            Experience
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Building infrastructure systems at scale
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {featured.map((exp, index) => (
            <div key={index} className="glass-card p-8">
              <div className="h-full flex flex-col">
                <div className="mb-6 flex-grow">
                  <h3 className="text-2xl font-semibold mb-2 gradient-text">{exp.role}</h3>
                  <p className="text-white/70 text-base mb-1">{exp.company}</p>
                  <p className="text-white/50 text-sm">{exp.period}</p>
                </div>
                <div className="pt-6 border-t border-white/[0.08]">
                  <p className="text-white/60 text-sm">
                    {exp.highlights.length} key achievements
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={withTrailingSlash('/experience')}
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 bg-white/[0.05] text-white rounded-xl font-medium transition-all duration-200 hover:bg-white/[0.1] hover:border-white/30 hover:scale-[1.02]"
          >
            View all experience
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
