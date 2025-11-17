import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { resumeData } from '@/content/resume'
import Card from './ui/Card'
import Button from './ui/Button'

export default function ExperiencePreview() {
  const featured = resumeData.experience.slice(0, 2)

  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 gradient-text">
            Experience
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            Building infrastructure systems at scale
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {featured.map((exp, index) => (
            <Card key={index}>
              <div className="h-full flex flex-col">
                <div className="mb-6 flex-grow">
                  <h3 className="text-2xl font-bold mb-2 gradient-text">{exp.role}</h3>
                  <p className="text-white/70 text-lg mb-1">{exp.company}</p>
                  <p className="text-white/50 text-sm">{exp.period}</p>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-white/60 text-sm">
                    {exp.highlights.length} key achievements
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button href="/experience" variant="secondary" icon={<ArrowRight size={18} />}>
            View all experience
          </Button>
        </div>
      </div>
    </section>
  )
}
