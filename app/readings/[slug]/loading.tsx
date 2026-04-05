export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
      {/* パンくず */}
      <div className="h-3 w-40 bg-stone-200 rounded mb-6" />

      {/* ヘッダー */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 mb-6">
        <div className="h-6 w-2/3 bg-stone-200 rounded mb-4" />
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-3 w-12 bg-stone-200 rounded mb-1" />
              <div className="h-4 w-20 bg-stone-200 rounded" />
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-3 border-t border-stone-100">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 w-24 bg-stone-200 rounded-full" />
          ))}
        </div>
      </div>

      {/* スクリーンショット */}
      <div className="w-full aspect-[3/2] bg-stone-200 rounded-xl mb-6" />

      {/* 本文 */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-stone-200 rounded ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`}
          />
        ))}
      </div>
    </div>
  )
}
