export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-7 w-28 bg-stone-200 rounded mb-2" />
      <div className="h-4 w-10 bg-stone-200 rounded mb-6" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="h-6 w-24 bg-stone-200 rounded" />
              <div className="h-4 w-8 bg-stone-200 rounded" />
            </div>
            <div className="flex gap-2 mb-3">
              <div className="h-5 w-20 bg-stone-200 rounded-full" />
            </div>
            <div className="border-t border-stone-100 pt-3 flex gap-2">
              <div className="h-5 w-16 bg-stone-200 rounded-full" />
              <div className="h-5 w-20 bg-stone-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
