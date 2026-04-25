import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getReport, getAllReportSlugs } from '@/lib/reports'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllReportSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const report = await getReport(slug)
  if (!report) return {}
  return { title: report.title }
}

export default async function ReportDetailPage({ params }: Props) {
  const { slug } = await params
  const report = await getReport(slug)
  if (!report) notFound()

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">

      {/* パンくず */}
      <nav className="text-xs text-stone-400 mb-6 flex items-center gap-1">
        <Link href="/realestate" className="hover:text-[#0D7377]">物件探し</Link>
        <span>/</span>
        <span className="text-stone-600 truncate">{report.title}</span>
      </nav>

      {/* ヘッダー */}
      <header className="bg-white rounded-xl border border-stone-200 p-6 mb-6">
        <p className="text-xs font-bold tracking-[0.2em] text-[#0D7377] uppercase mb-2">
          Real Estate Report
        </p>
        <h1 className="text-xl font-bold text-stone-800 mb-1 leading-snug">{report.title}</h1>
        {report.subtitle && (
          <p className="text-sm text-stone-500 mb-4">{report.subtitle}</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {report.target && <InfoCard icon="👨‍👩‍👧" label="鑑定対象" value={report.target} />}
          {report.recommendation && <InfoCard icon="📍" label="最推奨エリア" value={report.recommendation} accent />}
          {report.moveDate && <InfoCard icon="📦" label="引越し予定" value={report.moveDate} />}
          {report.purchaseTarget && <InfoCard icon="🏡" label="購入目標" value={report.purchaseTarget} />}
        </div>

        <div className="flex flex-wrap gap-2 pt-3 border-t border-stone-100 text-xs">
          {report.budget && (
            <span className="bg-stone-50 border border-stone-200 text-stone-600 px-2 py-1 rounded-full">
              💰 予算: {report.budget}
            </span>
          )}
          {report.grandparentsA && (
            <span className="bg-stone-50 border border-stone-200 text-stone-600 px-2 py-1 rounded-full">
              🏠 父方: {report.grandparentsA}
            </span>
          )}
          {report.grandparentsB && (
            <span className="bg-stone-50 border border-stone-200 text-stone-600 px-2 py-1 rounded-full">
              🏠 母方: {report.grandparentsB}
            </span>
          )}
          <span className="bg-stone-50 border border-stone-200 text-stone-400 px-2 py-1 rounded-full">
            鑑定日: {report.date}
          </span>
        </div>

        {report.areas && report.areas.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {report.areas.map((area) => (
              <span
                key={area}
                className="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full"
              >
                {area}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* レポート本文 */}
      <div
        className="prose-reading bg-white rounded-xl border border-stone-200 p-6 sm:p-10"
        dangerouslySetInnerHTML={{ __html: report.content }}
      />

      {/* 戻るリンク */}
      <div className="mt-6 text-center">
        <Link
          href="/realestate"
          className="inline-block text-sm text-[#0D7377] hover:underline"
        >
          ← 物件探し一覧に戻る
        </Link>
      </div>
    </article>
  )
}

function InfoCard({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: string
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className={`rounded-xl border p-3 ${accent ? 'border-[#0D7377] bg-teal-50' : 'border-stone-200 bg-stone-50'}`}>
      <p className="text-lg mb-1">{icon}</p>
      <p className="text-[10px] text-stone-400 mb-0.5">{label}</p>
      <p className={`text-sm font-bold leading-snug ${accent ? 'text-[#0D7377]' : 'text-stone-700'}`}>
        {value}
      </p>
    </div>
  )
}
