export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-7 w-36 bg-stone-200 rounded mb-2" />
      <div className="h-4 w-12 bg-stone-200 rounded mb-6" />
      <div className="grid gap-4 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-5 w-20 bg-stone-200 rounded" />
              <div className="h-4 w-4 bg-stone-200 rounded" />
              <div className="h-5 w-20 bg-stone-200 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-[3/2] bg-stone-200 rounded-lg" />
              <div className="aspect-[3/2] bg-stone-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
