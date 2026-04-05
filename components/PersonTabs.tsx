'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { Reading } from '@/lib/readings'
import ReadingCard from './ReadingCard'

type Props = {
  readings: Reading[]
  people: string[]
}

export default function PersonTabs({ readings, people }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selected = searchParams.get('person') ?? 'すべて'

  const setSelected = (person: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (person === 'すべて') {
      params.delete('person')
    } else {
      params.set('person', person)
    }
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  const filtered =
    selected === 'すべて'
      ? readings
      : readings.filter(
          (r) =>
            r.person === selected ||
            r.person1 === selected ||
            r.person2 === selected,
        )

  const tabs = ['すべて', ...people]

  return (
    <div>
      {/* タブ */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelected(tab)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selected === tab
                ? 'bg-indigo-950 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-indigo-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 記事一覧 */}
      {filtered.length === 0 ? (
        <p className="text-center text-stone-400 py-16">記事がありません</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((reading) => (
            <ReadingCard key={reading.slug} reading={reading} />
          ))}
        </div>
      )}
    </div>
  )
}
