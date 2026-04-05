import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllReadings, getAllPeople } from '@/lib/readings'
import PersonTabs from '@/components/PersonTabs'

export const metadata: Metadata = {
  title: '鑑定一覧',
}

export default async function HomePage() {
  const [readings, people] = await Promise.all([getAllReadings(), getAllPeople()])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800">鑑定一覧</h1>
        <p className="text-sm text-stone-500 mt-1">{readings.length} 件</p>
      </div>
      <Suspense fallback={<TabsFallback />}>
        <PersonTabs readings={readings} people={people} />
      </Suspense>
    </div>
  )
}

function TabsFallback() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-2 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-8 w-20 bg-stone-200 rounded-full" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-stone-200 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
