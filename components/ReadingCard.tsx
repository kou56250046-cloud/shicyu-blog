import Link from 'next/link'
import type { Reading } from '@/lib/readings'

const TYPE_LABELS: Record<string, { label: string; className: string }> = {
  compatibility: { label: '相性', className: 'bg-rose-100 text-rose-600' },
  fuusui: { label: '風水', className: 'bg-emerald-100 text-emerald-700' },
  astrology: { label: '占星術', className: 'bg-violet-100 text-violet-700' },
  sanmei: { label: '算命学', className: 'bg-orange-100 text-orange-700' },
  numerology: { label: '数秘術', className: 'bg-sky-100 text-sky-700' },
}

export default function ReadingCard({ reading }: { reading: Reading }) {
  const typeLabel = TYPE_LABELS[reading.type]

  return (
    <Link
      href={`/readings/${reading.slug}`}
      className="block bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md hover:border-indigo-300 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="text-base font-semibold text-stone-800 leading-snug">
          {reading.title}
        </h2>
        {typeLabel && (
          <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${typeLabel.className}`}>
            {typeLabel.label}
          </span>
        )}
      </div>

      <p className="text-xs text-stone-400 mb-3">{reading.date}</p>

      <div className="flex flex-wrap gap-1.5">
        {/* 四柱推命・算命学 */}
        {reading.nikushi && (
          <Badge label="日主" value={reading.nikushi} color="indigo" />
        )}
        {reading.kakukyoku && (
          <Badge label="格局" value={reading.kakukyoku} color="amber" />
        )}
        {reading.youjin && (
          <Badge label="用神" value={reading.youjin} color="teal" />
        )}
        {/* 算命学 */}
        {reading.chuseiStar && (
          <Badge label="中心星" value={reading.chuseiStar} color="orange" />
        )}
        {/* 西洋占星術 */}
        {reading.sunSign && (
          <Badge label="太陽" value={reading.sunSign} color="amber" />
        )}
        {reading.ascendant && (
          <Badge label="AS" value={reading.ascendant} color="violet" />
        )}
        {/* 風水 */}
        {reading.kuaNumber != null && (
          <Badge label="卦数" value={String(reading.kuaNumber)} color="emerald" />
        )}
        {reading.group && (
          <Badge label="" value={reading.group} color="emerald" />
        )}
        {/* 数秘術 */}
        {reading.lifePathNumber != null && (
          <Badge label="LP" value={String(reading.lifePathNumber)} color="sky" />
        )}
      </div>
    </Link>
  )
}

function Badge({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: 'indigo' | 'amber' | 'teal' | 'orange' | 'violet' | 'emerald' | 'sky'
}) {
  const styles = {
    indigo: 'bg-indigo-50 text-indigo-700',
    amber: 'bg-amber-50 text-amber-700',
    teal: 'bg-teal-50 text-teal-700',
    orange: 'bg-orange-50 text-orange-700',
    violet: 'bg-violet-50 text-violet-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    sky: 'bg-sky-50 text-sky-700',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[color]}`}>
      {label ? `${label}: ${value}` : value}
    </span>
  )
}
