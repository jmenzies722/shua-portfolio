'use client'

import { motion } from 'framer-motion'

interface ArchitectureDiagramProps {
  type: 'data-pipeline' | 'distribution-platform'
}

export default function ArchitectureDiagram({ type }: ArchitectureDiagramProps) {
  if (type === 'data-pipeline') {
    return (
      <div className="glass-card p-6 sm:p-8 rounded-2xl overflow-x-auto">
        <div className="min-w-[600px] space-y-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">AI Data Pipeline Architecture</h3>
            <p className="text-sm text-white/60">Serverless, event-driven data processing</p>
          </div>

          {/* Flow Diagram */}
          <div className="space-y-4">
            {/* Source Layer */}
            <div className="flex items-center justify-center gap-4">
              <div className="px-4 py-3 rounded-xl bg-[#5ac8fa]/20 border border-[#5ac8fa]/30 text-sm font-medium text-white">
                PostgreSQL Source
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-[#5ac8fa]/40" />
            </div>

            {/* Processing Layer */}
            <div className="grid grid-cols-3 gap-3">
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-center text-white/90">
                Glue Crawler
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-center text-white/90">
                Lambda Orchestrator
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-center text-white/90">
                Macie Scanner
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-[#5ac8fa]/40" />
            </div>

            {/* Storage Layer */}
            <div className="grid grid-cols-2 gap-3">
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-center text-white/90">
                S3 Data Lake
              </div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-center text-white/90">
                Athena Queries
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-[#5ac8fa]/40" />
            </div>

            {/* Output Layer */}
            <div className="flex items-center justify-center gap-4">
              <div className="px-4 py-3 rounded-xl bg-[#5ac8fa]/20 border border-[#5ac8fa]/30 text-sm font-medium text-white">
                SageMaker / Analytics
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-lg font-semibold text-[#5ac8fa]">40%</div>
              <div className="text-xs text-white/60">Faster ETL</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-[#5ac8fa]">1 TB+</div>
              <div className="text-xs text-white/60">Data Processed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-[#5ac8fa]">20%</div>
              <div className="text-xs text-white/60">Cost Reduction</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'distribution-platform') {
    return (
      <div className="glass-card p-6 sm:p-8 rounded-2xl overflow-x-auto">
        <div className="min-w-[600px] space-y-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Serverless Distribution Platform</h3>
            <p className="text-sm text-white/60">Global artifact delivery with RBAC</p>
          </div>

          {/* Flow Diagram */}
          <div className="space-y-4">
            {/* Client Layer */}
            <div className="flex items-center justify-center gap-4">
              <div className="px-4 py-3 rounded-xl bg-[#5ac8fa]/20 border border-[#5ac8fa]/30 text-sm font-medium text-white">
                Developer / CI/CD
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-[#5ac8fa]/40" />
            </div>

            {/* API Layer */}
            <div className="flex items-center justify-center">
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/90">
                API Gateway + Cognito Auth
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-[#5ac8fa]/40" />
            </div>

            {/* Processing Layer */}
            <div className="grid grid-cols-2 gap-3">
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-center text-white/90">
                Lambda Functions
              </div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-center text-white/90">
                IAM RBAC
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-[#5ac8fa]/40" />
            </div>

            {/* Storage & CDN Layer */}
            <div className="grid grid-cols-2 gap-3">
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-center text-white/90">
                S3 Storage
              </div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-center text-white/90">
                CloudFront CDN
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-[#5ac8fa]/40" />
            </div>

            {/* Output Layer */}
            <div className="flex items-center justify-center gap-4">
              <div className="px-4 py-3 rounded-xl bg-[#5ac8fa]/20 border border-[#5ac8fa]/30 text-sm font-medium text-white">
                Global End Users
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-lg font-semibold text-[#5ac8fa]">500+</div>
              <div className="text-xs text-white/60">Artifacts/Month</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-[#5ac8fa]">35%</div>
              <div className="text-xs text-white/60">Faster Releases</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-[#5ac8fa]">60%</div>
              <div className="text-xs text-white/60">Less Setup Time</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

