'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { Reading } from '@/lib/readings'
import ReadingCard from './ReadingCard'

type Props = {
  readings: Reading[]
  people: string[]
}

const ANIM_CLASSES = ['anim-up-1', 'anim-up-2', 'anim-up-3', 'anim-up-4']

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
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selected === tab
                ? 'bg-[#0D7377] text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-[#14A085] hover:text-[#14A085]'
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((reading, i) => (
            <div key={reading.slug} className={ANIM_CLASSES[i % 4]}>
              <ReadingCard reading={reading} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
