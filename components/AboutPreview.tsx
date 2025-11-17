import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { resumeData } from '@/content/resume'
import Card from './ui/Card'
import Button from './ui/Button'

export default function AboutPreview() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 gradient-text">
            About
          </h2>
        </div>

        <Card className="max-w-4xl mx-auto mb-12">
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light text-center">
            {resumeData.summary}
          </p>
        </Card>

        <div className="text-center">
          <Button href="/about" variant="secondary" icon={<ArrowRight size={18} />}>
            Learn more
          </Button>
        </div>
      </div>
    </section>
  )
}
