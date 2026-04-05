'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-24 text-center">
      <p className="text-5xl font-bold text-stone-200 mb-4">⚠️</p>
      <h2 className="text-lg font-semibold text-stone-700 mb-2">
        記事の読み込みに失敗しました
      </h2>
      <p className="text-sm text-stone-400 mb-8">{error.message}</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-5 py-2 bg-indigo-950 text-white text-sm rounded-lg hover:bg-indigo-800 transition-colors"
        >
          再試行
        </button>
        <Link
          href="/"
          className="px-5 py-2 border border-stone-200 text-stone-600 text-sm rounded-lg hover:bg-stone-50 transition-colors"
        >
          一覧へ戻る
        </Link>
      </div>
    </div>
  )
}
