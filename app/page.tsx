import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllReadings, getAllPeople } from '@/lib/readings'
import PersonTabs from '@/components/PersonTabs'

export const metadata: Metadata = {
  title: '鑑定一覧',
}

const FORTUNE_TYPES = [
  { href: '/', en: 'BAZI', label: '四柱推命', desc: '命式・格局・用神' },
  { href: '/fuusui', en: 'FENG SHUI', label: '風水', desc: '卦数・方位・吉凶' },
  { href: '/astrology', en: 'ASTROLOGY', label: '西洋占星術', desc: '太陽・月・ASC' },
  { href: '/sanmei', en: 'SANMEI', label: '算命学', desc: '中心星・守護神' },
  { href: '/numerology', en: 'NUMEROLOGY', label: '数秘術', desc: 'ライフパス・使命数' },
  { href: '/compatibility', en: 'COMPAT', label: '相性鑑定', desc: '5占い総合相性' },
]

const ANIM_DELAYS = ['anim-up-1', 'anim-up-2', 'anim-up-3', 'anim-up-4']

export default async function HomePage() {
  const [readings, people] = await Promise.all([getAllReadings(), getAllPeople()])

  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs tracking-[0.35em] text-[#14A085] uppercase mb-5 anim-fade">
            Fortune Reading Archive
          </p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight gradient-text anim-up mb-6 leading-none">
            READING
            <br />
            ARCHIVE
          </h1>
          <p className="text-stone-500 text-sm max-w-sm mx-auto anim-up-1 leading-relaxed">
            四柱推命・風水・西洋占星術・算命学・数秘術
            <br />
            5種類の占い鑑定アーカイブ
          </p>
        </div>
      </section>

      {/* Fortune type grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-xs tracking-[0.3em] text-[#14A085] uppercase mb-2 anim-fade">
          Categories
        </p>
        <h2 className="text-2xl font-bold text-stone-800 mb-8 anim-up">占い種類から探す</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {FORTUNE_TYPES.map(({ href, en, label, desc }, i) => (
            <Link
              key={href}
              href={href}
              className={`card-teal shimmer-hover bg-white rounded-xl p-4 text-center ${ANIM_DELAYS[Math.min(i, 3)]}`}
            >
              <p className="text-[10px] font-black tracking-widest text-[#14A085] mb-1">{en}</p>
              <p className="text-sm font-semibold text-stone-800 mb-1">{label}</p>
              <p className="text-[11px] text-stone-400">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Readings list */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex items-baseline gap-3 mb-8">
          <p className="text-xs tracking-[0.3em] text-[#14A085] uppercase anim-fade">Recent</p>
          <h2 className="text-2xl font-bold text-stone-800 anim-up">最近の鑑定</h2>
          <span className="text-sm text-stone-400 anim-up">{readings.length} 件</span>
        </div>
        <Suspense fallback={<TabsFallback />}>
          <PersonTabs readings={readings} people={people} />
        </Suspense>
      </section>
    </>
  )
}

function TabsFallback() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-2 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 w-20 bg-stone-100 rounded-full" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 bg-stone-100 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
