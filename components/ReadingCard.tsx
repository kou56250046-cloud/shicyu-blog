import Link from 'next/link'
import type { Reading } from '@/lib/readings'

export default function ReadingCard({ reading }: { reading: Reading }) {
  const isCompatibility = reading.type === 'compatibility'

  return (
    <Link
      href={`/readings/${reading.slug}`}
      className="block bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md hover:border-indigo-300 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="text-base font-semibold text-stone-800 leading-snug">
          {reading.title}
        </h2>
        {isCompatibility && (
          <span className="shrink-0 text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">
            相性
          </span>
        )}
      </div>

      <p className="text-xs text-stone-400 mb-3">{reading.date}</p>

      <div className="flex flex-wrap gap-1.5">
        {reading.nikushi && (
          <Badge label="日主" value={reading.nikushi} color="indigo" />
        )}
        {reading.kakukyoku && (
          <Badge label="格局" value={reading.kakukyoku} color="amber" />
        )}
        {reading.youjin && (
          <Badge label="用神" value={reading.youjin} color="teal" />
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
  color: 'indigo' | 'amber' | 'teal'
}) {
  const styles = {
    indigo: 'bg-indigo-50 text-indigo-700',
    amber: 'bg-amber-50 text-amber-700',
    teal: 'bg-teal-50 text-teal-700',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[color]}`}>
      {label}: {value}
    </span>
  )
}
