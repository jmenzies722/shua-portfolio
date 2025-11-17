'use client'

import { useState } from 'react'
import { ChevronDown, MapPin, Calendar } from 'lucide-react'
import { resumeData } from '@/content/resume'

export default function ExperienceContent() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 gradient-text">
            Experience
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Building infrastructure systems at scale with measurable impact on cost, reliability, and performance.
          </p>
        </div>

        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="glass-card p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 gradient-text">{exp.role}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-white/70 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#007AFF] flex-shrink-0" />
                      <span className="text-sm md:text-base">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#007AFF] flex-shrink-0" />
                      <span className="text-sm md:text-base">{exp.period}</span>
                    </div>
                  </div>
                  
                  {expandedIndex === index && (
                    <div className="mt-6 pt-6 border-t border-white/[0.08]">
                      <ul className="space-y-3">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-white/70 leading-relaxed flex items-start gap-3 text-sm md:text-base">
                            <span className="text-[#007AFF] mt-1.5 flex-shrink-0">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="p-2 glass-card rounded-lg hover:bg-white/[0.08] transition-colors flex-shrink-0"
                  aria-label={expandedIndex === index ? 'Collapse' : 'Expand'}
                  type="button"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${expandedIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
