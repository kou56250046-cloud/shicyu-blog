import type { Metadata } from 'next'
import { getCompatibilityReadings } from '@/lib/readings'
import CompatibilityCard from '@/components/CompatibilityCard'

export const metadata: Metadata = {
  title: '相性鑑定一覧',
}

export default async function CompatibilityPage() {
  const readings = await getCompatibilityReadings()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800">相性鑑定一覧</h1>
        <p className="text-sm text-stone-500 mt-1">{readings.length} 件</p>
      </div>

      {readings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-4xl mb-4">💑</p>
          <p className="text-stone-400 text-sm">相性鑑定の記事がまだありません</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {readings.map((reading) => (
            <CompatibilityCard key={reading.slug} reading={reading} />
          ))}
        </div>
      )}
    </div>
  )
}
