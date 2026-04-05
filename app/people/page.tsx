import type { Metadata } from 'next'
import { getAllPeople, getReadingsByPerson } from '@/lib/readings'
import PersonCard from '@/components/PersonCard'

export const metadata: Metadata = {
  title: '人物一覧',
}

export default async function PeoplePage() {
  const people = await getAllPeople()

  const peopleWithReadings = await Promise.all(
    people.map(async (person) => ({
      person,
      readings: await getReadingsByPerson(person),
    })),
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800">人物一覧</h1>
        <p className="text-sm text-stone-500 mt-1">{people.length} 人</p>
      </div>

      {people.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-4xl mb-4">👤</p>
          <p className="text-stone-400 text-sm">鑑定記事がまだありません</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {peopleWithReadings.map(({ person, readings }) => (
            <PersonCard key={person} person={person} readings={readings} />
          ))}
        </div>
      )}
    </div>
  )
}
