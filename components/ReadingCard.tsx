import Link from 'next/link'
import type { Reading } from '@/lib/readings'

const TYPE_CONFIG: Record<string, { en: string; cls: string }> = {
  individual:    { en: 'BAZI',        cls: 'bg-[#f0fafa] text-[#0D7377]' },
  compatibility: { en: 'COMPAT',      cls: 'bg-rose-50 text-rose-600' },
  fuusui:        { en: 'FENG SHUI',   cls: 'bg-[#f0fafa] text-[#0D7377]' },
  astrology:     { en: 'ASTROLOGY',   cls: 'bg-violet-50 text-violet-700' },
  sanmei:        { en: 'SANMEI',      cls: 'bg-orange-50 text-orange-700' },
  numerology:    { en: 'NUMEROLOGY',  cls: 'bg-sky-50 text-sky-700' },
}

export default function ReadingCard({ reading }: { reading: Reading }) {
  const cfg = TYPE_CONFIG[reading.type]

  return (
    <Link
      href={`/readings/${reading.slug}`}
      className="card-teal shimmer-hover block bg-white rounded-xl p-5 group h-full"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="text-sm font-semibold text-stone-800 leading-snug group-hover:text-[#0D7377] transition-colors">
          {reading.title}
        </h2>
        {cfg && (
          <span className={`shrink-0 text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider ${cfg.cls}`}>
            {cfg.en}
          </span>
        )}
      </div>

      <p className="text-xs text-stone-400 mb-3">{reading.date}</p>

      <div className="flex flex-wrap gap-1.5">
        {reading.nikushi && <Chip label="日主" value={reading.nikushi} />}
        {reading.kakukyoku && <Chip label="格局" value={reading.kakukyoku} />}
        {reading.youjin && <Chip label="用神" value={reading.youjin} />}
        {reading.chuseiStar && <Chip label="中心星" value={reading.chuseiStar} />}
        {reading.sunSign && <Chip label="太陽" value={reading.sunSign} />}
        {reading.ascendant && <Chip label="AS" value={reading.ascendant} />}
        {reading.kuaNumber != null && <Chip label="卦数" value={String(reading.kuaNumber)} />}
        {reading.group && <Chip label="" value={reading.group} />}
        {reading.lifePathNumber != null && <Chip label="LP" value={String(reading.lifePathNumber)} />}
      </div>

      <p className="mt-3 text-right text-[#14A085] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        詳しく見る →
      </p>
    </Link>
  )
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-xs bg-[#f0fafa] text-[#0D7377] px-2 py-0.5 rounded-full border border-[#c8eeec]">
      {label ? `${label}: ${value}` : value}
    </span>
  )
}
