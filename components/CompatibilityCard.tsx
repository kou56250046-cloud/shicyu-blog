import Link from 'next/link'
import Image from 'next/image'
import type { Reading } from '@/lib/readings'

export default function CompatibilityCard({ reading }: { reading: Reading }) {
  return (
    <Link
      href={`/readings/${reading.slug}`}
      className="block bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md hover:border-rose-300 transition-all"
    >
      {/* 2人の名前 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-semibold text-stone-800">{reading.person1}</span>
        <span className="text-stone-400 text-sm">×</span>
        <span className="font-semibold text-stone-800">{reading.person2}</span>
        <span className="ml-auto text-xs text-stone-400">{reading.date}</span>
      </div>

      {/* スクリーンショット2枚 */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[reading.screenshot1, reading.screenshot2].map((src, i) =>
          src ? (
            <div
              key={i}
              className="relative aspect-[3/2] rounded-lg overflow-hidden bg-stone-100 border border-stone-200"
            >
              <Image
                src={src}
                alt={`${i === 0 ? reading.person1 : reading.person2}の命式`}
                fill
                sizes="(max-width: 640px) 45vw, 220px"
                className="object-contain"
              />
            </div>
          ) : (
            <div
              key={i}
              className="aspect-[3/2] rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-xs text-stone-400"
            >
              画像なし
            </div>
          ),
        )}
      </div>

      {/* タグ */}
      {reading.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {reading.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
