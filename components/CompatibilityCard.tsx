import Link from 'next/link'
import Image from 'next/image'
import type { Reading } from '@/lib/readings'

export default function CompatibilityCard({ reading }: { reading: Reading }) {
  const hasSS1 = !!reading.screenshot1
  const hasSS2 = !!reading.screenshot2

  return (
    <Link
      href={`/readings/${reading.slug}`}
      className="card-teal shimmer-hover block bg-white rounded-xl p-5 group"
    >
      {/* 2人の名前 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-semibold text-stone-800 group-hover:text-[#0D7377] transition-colors">
          {reading.person1}
        </span>
        <span className="text-[#14A085] font-bold">×</span>
        <span className="font-semibold text-stone-800 group-hover:text-[#0D7377] transition-colors">
          {reading.person2}
        </span>
        <span className="ml-auto text-xs text-stone-400">{reading.date}</span>
      </div>

      {/* スクリーンショット（画像がある場合のみ表示） */}
      {(hasSS1 || hasSS2) && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[reading.screenshot1, reading.screenshot2].map((src, i) =>
            src ? (
              <div
                key={i}
                className="relative aspect-[3/2] rounded-lg overflow-hidden bg-stone-50 border border-[#e0f5f3]"
              >
                <Image
                  src={src}
                  alt={`${i === 0 ? reading.person1 : reading.person2}の命式`}
                  fill
                  sizes="(max-width: 640px) 45vw, 220px"
                  className="object-contain"
                />
              </div>
            ) : null,
          )}
        </div>
      )}

      {/* タグ */}
      {reading.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {reading.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[#f0fafa] text-[#0D7377] px-2 py-0.5 rounded-full border border-[#c8eeec]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="mt-3 text-right text-[#14A085] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        詳しく見る →
      </p>
    </Link>
  )
}
