export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-7 w-32 bg-stone-200 rounded mb-2" />
      <div className="h-4 w-16 bg-stone-200 rounded mb-6" />
      <div className="flex gap-2 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-8 w-20 bg-stone-200 rounded-full" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="h-5 bg-stone-200 rounded w-3/4 mb-3" />
            <div className="h-3 bg-stone-200 rounded w-1/4 mb-4" />
            <div className="flex gap-2">
              <div className="h-5 w-20 bg-stone-200 rounded-full" />
              <div className="h-5 w-24 bg-stone-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
