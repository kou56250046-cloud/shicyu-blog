import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getReading, getAllReadingSlugs } from '@/lib/readings'

type Props = { params: Promise<{ slug: string }> }

// ─── 静的生成 ──────────────────────────────
export async function generateStaticParams() {
  return getAllReadingSlugs().map((slug) => ({ slug }))
}

// ─── 動的メタデータ ────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const reading = await getReading(slug)
  if (!reading) return {}
  return {
    title: reading.title,
    description: `${reading.person ?? `${reading.person1}・${reading.person2}`} の四柱推命鑑定（${reading.date}）`,
  }
}

// ─── ページ ────────────────────────────────
export default async function ReadingPage({ params }: Props) {
  const { slug } = await params
  const reading = await getReading(slug)
  if (!reading) notFound()

  const isCompatibility = reading.type === 'compatibility'

  const TYPE_BADGE: Record<string, { label: string; className: string }> = {
    compatibility: { label: '相性鑑定', className: 'bg-rose-100 text-rose-600' },
    fuusui: { label: '風水', className: 'bg-emerald-100 text-emerald-700' },
    astrology: { label: '占星術', className: 'bg-violet-100 text-violet-700' },
    sanmei: { label: '算命学', className: 'bg-orange-100 text-orange-700' },
    numerology: { label: '数秘術', className: 'bg-sky-100 text-sky-700' },
  }

  const TYPE_HREF: Record<string, string> = {
    individual: '/',
    compatibility: '/compatibility',
    fuusui: '/fuusui',
    astrology: '/astrology',
    sanmei: '/sanmei',
    numerology: '/numerology',
  }

  const TYPE_LABEL: Record<string, string> = {
    individual: '四柱推命',
    compatibility: '相性鑑定',
    fuusui: '風水',
    astrology: '占星術',
    sanmei: '算命学',
    numerology: '数秘術',
  }

  const typeBadge = TYPE_BADGE[reading.type]
  const breadcrumbHref = TYPE_HREF[reading.type] ?? '/'
  const breadcrumbLabel = TYPE_LABEL[reading.type] ?? '鑑定一覧'

  return (
    <article className="max-w-3xl mx-auto">
      {/* パンくず */}
      <nav className="text-xs text-stone-400 mb-6 flex items-center gap-1">
        <Link href={breadcrumbHref} className="hover:text-indigo-600">{breadcrumbLabel}</Link>
        <span>/</span>
        <span className="text-stone-600">{reading.title}</span>
      </nav>

      {/* ヘッダー情報 */}
      <header className="bg-white rounded-xl border border-stone-200 p-6 mb-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h1 className="text-xl font-bold text-stone-800 leading-snug">
            {reading.title}
          </h1>
          {typeBadge && (
            <span className={`shrink-0 text-xs px-2 py-1 rounded-full ${typeBadge.className}`}>
              {typeBadge.label}
            </span>
          )}
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm mb-4">
          {reading.birthDate && <InfoRow label="生年月日" value={reading.birthDate} />}
          {reading.birthTime && <InfoRow label="出生時刻" value={reading.birthTime} />}
          {reading.gender && <InfoRow label="性別" value={reading.gender} />}
          {reading.relationship && <InfoRow label="続柄" value={reading.relationship} />}
          {reading.birthPlace && <InfoRow label="出生地" value={reading.birthPlace} />}
          {reading.kuaNumber != null && <InfoRow label="卦数" value={String(reading.kuaNumber)} />}
          {reading.group && <InfoRow label="命卦グループ" value={reading.group} />}
          <InfoRow label="鑑定日" value={reading.date} />
        </dl>

        <div className="flex flex-wrap gap-2 pt-3 border-t border-stone-100">
          {reading.nikushi && <Badge label="日主" value={reading.nikushi} color="indigo" />}
          {reading.kakukyoku && <Badge label="格局" value={reading.kakukyoku} color="amber" />}
          {reading.youjin && <Badge label="用神" value={reading.youjin} color="teal" />}
          {reading.sunSign && <Badge label="太陽" value={reading.sunSign} color="amber" />}
          {reading.moonSign && <Badge label="月" value={reading.moonSign} color="indigo" />}
          {reading.ascendant && <Badge label="AS" value={reading.ascendant} color="violet" />}
          {reading.chuseiStar && <Badge label="中心星" value={reading.chuseiStar} color="orange" />}
          {reading.guardianGod && <Badge label="守護神" value={reading.guardianGod} color="teal" />}
          {reading.lifePathNumber != null && <Badge label="ライフパス" value={String(reading.lifePathNumber)} color="sky" />}
          {reading.destinyNumber != null && <Badge label="ディスティニー" value={String(reading.destinyNumber)} color="violet" />}
          {reading.tags?.map((tag) => (
            <span key={tag} className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* スクリーンショット */}
      {isCompatibility ? (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {reading.screenshot1 && (
            <ScreenshotImage src={reading.screenshot1} alt={`${reading.person1}の命式`} />
          )}
          {reading.screenshot2 && (
            <ScreenshotImage src={reading.screenshot2} alt={`${reading.person2}の命式`} />
          )}
        </div>
      ) : (
        reading.screenshot && (
          <div className="mb-6">
            <ScreenshotImage
              src={reading.screenshot}
              alt={`${reading.person}の鑑定`}
              priority
            />
          </div>
        )
      )}

      {/* 鑑定本文 */}
      <div
        className="prose-reading bg-white rounded-xl border border-stone-200 p-6 sm:p-8"
        dangerouslySetInnerHTML={{ __html: reading.content }}
      />
    </article>
  )
}

// ─── サブコンポーネント ─────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-stone-400">{label}</dt>
      <dd className="font-medium text-stone-700">{value}</dd>
    </div>
  )
}

function Badge({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: 'indigo' | 'amber' | 'teal' | 'orange' | 'violet' | 'sky'
}) {
  const styles = {
    indigo: 'bg-indigo-50 text-indigo-700',
    amber: 'bg-amber-50 text-amber-700',
    teal: 'bg-teal-50 text-teal-700',
    orange: 'bg-orange-50 text-orange-700',
    violet: 'bg-violet-50 text-violet-700',
    sky: 'bg-sky-50 text-sky-700',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[color]}`}>
      {label}: {value}
    </span>
  )
}

function ScreenshotImage({
  src,
  alt,
  priority = false,
}: {
  src: string
  alt: string
  priority?: boolean
}) {
  return (
    <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 768px"
        className="object-contain"
        priority={priority}
      />
    </div>
  )
}
