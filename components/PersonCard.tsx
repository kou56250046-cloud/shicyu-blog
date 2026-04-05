import Link from 'next/link'
import type { Reading } from '@/lib/readings'

type Props = {
  person: string
  readings: Reading[]
}

export default function PersonCard({ person, readings }: Props) {
  const latest = readings[0] // getAllReadings は日付降順
  const individualCount = readings.filter((r) => r.type === 'individual').length
  const compatibilityCount = readings.filter((r) => r.type === 'compatibility').length

  return (
    <Link
      href={`/?person=${encodeURIComponent(person)}`}
      className="block bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md hover:border-indigo-300 transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-stone-800">{person}</h2>
        <span className="text-xs text-stone-400">{readings.length} 件</span>
      </div>

      {/* 記事数バッジ */}
      <div className="flex gap-2 mb-3">
        {individualCount > 0 && (
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
            個人鑑定 {individualCount}
          </span>
        )}
        {compatibilityCount > 0 && (
          <span className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">
            相性鑑定 {compatibilityCount}
          </span>
        )}
      </div>

      {/* 最新記事情報 */}
      {latest && (
        <div className="text-sm border-t border-stone-100 pt-3">
          <p className="text-xs text-stone-400 mb-1">最新: {latest.date}</p>
          <div className="flex flex-wrap gap-1.5">
            {latest.nikushi && (
              <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                {latest.nikushi}
              </span>
            )}
            {latest.kakukyoku && (
              <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                {latest.kakukyoku}
              </span>
            )}
            {latest.youjin && (
              <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">
                用神: {latest.youjin}
              </span>
            )}
          </div>
        </div>
      )}
    </Link>
  )
}
