import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// ─────────────────────────────────────────
// 型定義
// ─────────────────────────────────────────

export type ReadingFrontmatter = {
  title: string
  date: string
  person: string
  birthDate?: string
  birthTime?: string
  gender?: '男' | '女'
  relationship?: '本人' | '妻' | '夫' | '子' | '父' | '母' | 'その他'
  type: 'individual' | 'compatibility' | 'fuusui' | 'astrology' | 'sanmei' | 'numerology'
  tags: string[]
  screenshot?: string
  // 四柱推命・算命学
  nikushi?: string
  kakukyoku?: string
  youjin?: string
  // 相性鑑定のみ
  person1?: string
  person2?: string
  screenshot1?: string
  screenshot2?: string
  // 風水
  kuaNumber?: number
  group?: string
  // 西洋占星術
  birthPlace?: string
  sunSign?: string
  moonSign?: string
  ascendant?: string
  // 算命学
  chuseiStar?: string
  guardianGod?: string
  tenchusatsu?: string
  // 数秘術
  lifePathNumber?: number
  destinyNumber?: number
  soulNumber?: number
  personalityNumber?: number
  personalYear2026?: number
}

export type Reading = ReadingFrontmatter & {
  slug: string
  content: string // HTML 変換済み
}

// ─────────────────────────────────────────
// 内部ユーティリティ
// ─────────────────────────────────────────

const readingsDir = path.join(process.cwd(), 'readings')

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '')
}

async function parseReadingFile(filename: string): Promise<Reading> {
  const slug = getSlugFromFilename(filename)
  const fullPath = path.join(readingsDir, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processed = await remark().use(html).process(content)
  const contentHtml = processed.toString()

  return {
    ...(data as ReadingFrontmatter),
    slug,
    content: contentHtml,
  }
}

function getReadingFilenames(): string[] {
  if (!fs.existsSync(readingsDir)) return []
  return fs.readdirSync(readingsDir).filter((f) => f.endsWith('.md'))
}

// ─────────────────────────────────────────
// 公開 API
// ─────────────────────────────────────────

/** 全記事を日付降順で返す */
export async function getAllReadings(): Promise<Reading[]> {
  const filenames = getReadingFilenames()
  const readings = await Promise.all(filenames.map(parseReadingFile))
  return readings.sort((a, b) => (a.date < b.date ? 1 : -1))
}

/** slug から1記事を取得 */
export async function getReading(slug: string): Promise<Reading | null> {
  const filename = `${slug}.md`
  const fullPath = path.join(readingsDir, filename)
  if (!fs.existsSync(fullPath)) return null
  return parseReadingFile(filename)
}

/** generateStaticParams 用に slug 一覧を返す */
export function getAllReadingSlugs(): string[] {
  return getReadingFilenames().map(getSlugFromFilename)
}

/** 人物名で絞り込み（個人鑑定の person フィールドで検索） */
export async function getReadingsByPerson(person: string): Promise<Reading[]> {
  const all = await getAllReadings()
  return all.filter((r) => r.person === person || r.person1 === person || r.person2 === person)
}

/** type === "compatibility" の記事のみ返す */
export async function getCompatibilityReadings(): Promise<Reading[]> {
  const all = await getAllReadings()
  return all.filter((r) => r.type === 'compatibility')
}

/** type === "fuusui" の記事のみ返す */
export async function getFuusuiReadings(): Promise<Reading[]> {
  const all = await getAllReadings()
  return all.filter((r) => r.type === 'fuusui')
}

/** type === "astrology" の記事のみ返す */
export async function getAstrologyReadings(): Promise<Reading[]> {
  const all = await getAllReadings()
  return all.filter((r) => r.type === 'astrology')
}

/** type === "sanmei" の記事のみ返す */
export async function getSanmeiReadings(): Promise<Reading[]> {
  const all = await getAllReadings()
  return all.filter((r) => r.type === 'sanmei')
}

/** type === "numerology" の記事のみ返す */
export async function getNumerologyReadings(): Promise<Reading[]> {
  const all = await getAllReadings()
  return all.filter((r) => r.type === 'numerology')
}

/** 登場する人物名の一覧（重複排除・50音順） */
export async function getAllPeople(): Promise<string[]> {
  const all = await getAllReadings()
  const people = new Set<string>()
  for (const r of all) {
    if (r.type === 'compatibility') {
      if (r.person1) people.add(r.person1)
      if (r.person2) people.add(r.person2)
    } else if (r.person) {
      people.add(r.person)
    }
  }
  return Array.from(people).sort((a, b) => a.localeCompare(b, 'ja'))
}
