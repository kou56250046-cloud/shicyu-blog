import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type ReportFrontmatter = {
  title: string
  date: string
  type: string
  target?: string
  areas?: string[]
  recommendation?: string
  budget?: string
  moveDate?: string
  purchaseTarget?: string
  currentAddress?: string
  grandparentsA?: string
  grandparentsB?: string
}

export type Report = ReportFrontmatter & {
  slug: string
  content: string
}

const reportsDir = path.join(process.cwd(), 'reports')

async function parseReportFile(filename: string): Promise<Report> {
  const slug = filename.replace(/\.md$/, '')
  const fullPath = path.join(reportsDir, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const processed = await remark().use(html).process(content)
  return {
    ...(data as ReportFrontmatter),
    slug,
    content: processed.toString(),
  }
}

export async function getAllReports(): Promise<Report[]> {
  if (!fs.existsSync(reportsDir)) return []
  const filenames = fs.readdirSync(reportsDir).filter((f) => f.endsWith('.md'))
  const reports = await Promise.all(filenames.map(parseReportFile))
  return reports.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getReport(slug: string): Promise<Report | null> {
  const filename = `${slug}.md`
  const fullPath = path.join(reportsDir, filename)
  if (!fs.existsSync(fullPath)) return null
  return parseReportFile(filename)
}
