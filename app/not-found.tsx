import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-6xl font-bold text-stone-200 mb-4">404</p>
      <h2 className="text-xl font-semibold text-stone-700 mb-2">
        ページが見つかりません
      </h2>
      <p className="text-sm text-stone-400 mb-8">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="px-5 py-2 bg-indigo-950 text-white text-sm rounded-lg hover:bg-indigo-800 transition-colors"
      >
        トップへ戻る
      </Link>
    </div>
  )
}
