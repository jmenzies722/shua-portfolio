'use client'

import { useState } from 'react'
import { ChevronDown, MapPin, Calendar } from 'lucide-react'
import { resumeData } from '@/content/resume'
import Card from './ui/Card'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExperienceContent() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 gradient-text">
            Experience
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Building infrastructure systems at scale with measurable impact on cost, reliability, and performance.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {resumeData.experience.map((exp, index) => (
            <Card key={index} delay={index * 0.1}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 gradient-text">{exp.role}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-white/70 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#007AFF]" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#007AFF]" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-6 space-y-3 pt-6 border-t border-white/10">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="text-white/70 leading-relaxed flex items-start gap-3">
                              <span className="text-[#007AFF] mt-1.5">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="ml-4 p-2 glass-card rounded-lg hover:bg-white/[0.05] transition-colors flex-shrink-0"
                  aria-label={expandedIndex === index ? 'Collapse' : 'Expand'}
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
