import type { Metadata } from 'next'
import { getAllReports } from '@/lib/reports'

export const metadata: Metadata = {
  title: '物件探し・引越し鑑定',
}

const RANK_COLOR: Record<string, string> = {
  '1': 'bg-amber-400 text-white',
  '2': 'bg-stone-400 text-white',
  '3': 'bg-amber-700 text-white',
}

const AREA_RANK: Record<string, { rank: string; label: string; color: string }> = {
  府中市:    { rank: '2', label: '次点', color: 'border-stone-400 bg-stone-50' },
  稲城市:    { rank: '1', label: '最推奨', color: 'border-amber-400 bg-amber-50' },
  '多摩市（京王永山）': { rank: '3', label: '参考', color: 'border-amber-700 bg-orange-50' },
}

export default async function RealEstatePage() {
  const reports = await getAllReports()
  const report = reports[0] ?? null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* ページヘッダー */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.2em] text-[#0D7377] uppercase mb-1">
          Real Estate Report
        </p>
        <h1 className="text-2xl font-bold text-stone-800 mb-1">物件探し・引越し先 鑑定</h1>
        <p className="text-sm text-stone-500">
          四柱推命・算命学・西洋占星術の統合分析による引越し先・持ち家購入アドバイス
        </p>
      </div>

      {!report ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-4xl mb-4">🏠</p>
          <p className="text-stone-400 text-sm">レポートがまだありません</p>
        </div>
      ) : (
        <>
          {/* サマリーカード */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <SummaryCard label="鑑定対象" value={report.target ?? '—'} icon="👨‍👩‍👧" />
            <SummaryCard label="最推奨エリア" value={report.recommendation ?? '—'} icon="📍" accent />
            <SummaryCard label="引越し予定" value={report.moveDate ?? '—'} icon="📦" />
            <SummaryCard label="購入目標時期" value={report.purchaseTarget ?? '—'} icon="🏡" />
          </div>

          {/* エリアランキング */}
          {report.areas && report.areas.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-3">
                エリア比較ランキング
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {report.areas.map((area) => {
                  const info = AREA_RANK[area]
                  if (!info) return null
                  return (
                    <div
                      key={area}
                      className={`rounded-xl border-2 p-4 ${info.color}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-black w-6 h-6 rounded-full flex items-center justify-center ${RANK_COLOR[info.rank]}`}
                        >
                          {info.rank}
                        </span>
                        <span className="text-xs font-bold text-stone-500">{info.label}</span>
                      </div>
                      <p className="font-bold text-stone-800">{area}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* メタ情報 */}
          <div className="flex flex-wrap gap-3 mb-8">
            <MetaBadge icon="💰" label="予算" value={report.budget ?? '—'} />
            <MetaBadge icon="🏠A" label="父方祖父母" value={report.grandparentsA ?? '—'} />
            <MetaBadge icon="🏠B" label="母方祖父母" value={report.grandparentsB ?? '—'} />
            <MetaBadge icon="📅" label="鑑定日" value={report.date} />
          </div>

          {/* レポート本文 */}
          <div
            className="prose-reading bg-white rounded-xl border border-stone-200 p-6 sm:p-10"
            dangerouslySetInnerHTML={{ __html: report.content }}
          />
        </>
      )}
    </div>
  )
}

function SummaryCard({
  label,
  value,
  icon,
  accent = false,
}: {
  label: string
  value: string
  icon: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        accent
          ? 'border-[#0D7377] bg-teal-50'
          : 'border-stone-200 bg-white'
      }`}
    >
      <p className="text-lg mb-1">{icon}</p>
      <p className="text-xs text-stone-400 mb-0.5">{label}</p>
      <p className={`text-sm font-bold leading-snug ${accent ? 'text-[#0D7377]' : 'text-stone-700'}`}>
        {value}
      </p>
    </div>
  )
}

function MetaBadge({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm">
      <span>{icon}</span>
      <span className="text-stone-400 text-xs">{label}:</span>
      <span className="text-stone-700 font-medium">{value}</span>
    </div>
  )
}
