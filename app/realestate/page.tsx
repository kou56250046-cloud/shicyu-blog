import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllReports } from '@/lib/reports'

export const metadata: Metadata = {
  title: '物件探し・引越し鑑定',
}

const TYPE_BADGE: Record<string, { label: string; color: string }> = {
  realestate: { label: '物件・引越し', color: 'bg-teal-100 text-teal-700' },
}

export default async function RealEstatePage() {
  const reports = await getAllReports()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* ページヘッダー */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.2em] text-[#0D7377] uppercase mb-1">
          Real Estate Report
        </p>
        <h1 className="text-2xl font-bold text-stone-800 mb-1">物件探し・引越し先 鑑定</h1>
        <p className="text-sm text-stone-500">
          四柱推命・算命学・西洋占星術・気学九星・風水・数秘術による引越し先・持ち家アドバイス
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-4xl mb-4">🏠</p>
          <p className="text-stone-400 text-sm">レポートがまだありません</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reports.map((report) => {
            const badge = TYPE_BADGE[report.type] ?? { label: report.type, color: 'bg-stone-100 text-stone-500' }
            return (
              <Link
                key={report.slug}
                href={`/realestate/${report.slug}`}
                className="group block bg-white rounded-xl border border-stone-200 p-6 hover:border-[#0D7377] hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 ${badge.color}`}>
                      {badge.label}
                    </span>
                    <h2 className="text-base font-bold text-stone-800 group-hover:text-[#0D7377] transition-colors leading-snug">
                      {report.title}
                    </h2>
                  </div>
                  <span className="text-xs text-stone-400 shrink-0 mt-1">{report.date}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {report.target && (
                    <MetaItem icon="👨‍👩‍👧" label="対象" value={report.target} />
                  )}
                  {report.recommendation && (
                    <MetaItem icon="📍" label="最推奨" value={report.recommendation} accent />
                  )}
                  {report.moveDate && (
                    <MetaItem icon="📦" label="引越し" value={report.moveDate} />
                  )}
                  {report.budget && (
                    <MetaItem icon="💰" label="予算" value={report.budget} />
                  )}
                </div>

                {report.areas && report.areas.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-stone-100">
                    {report.areas.map((area) => (
                      <span
                        key={area}
                        className="text-xs bg-stone-50 border border-stone-200 text-stone-500 px-2 py-0.5 rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

function MetaItem({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: string
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className={`rounded-lg p-2 ${accent ? 'bg-teal-50' : 'bg-stone-50'}`}>
      <p className="text-stone-400 text-[10px] mb-0.5">{icon} {label}</p>
      <p className={`font-medium leading-tight ${accent ? 'text-[#0D7377]' : 'text-stone-700'}`}>
        {value}
      </p>
    </div>
  )
}
