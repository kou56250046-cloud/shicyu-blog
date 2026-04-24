import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: '四柱推命鑑定ブログ',
    template: '%s | 四柱推命鑑定ブログ',
  },
  description: '個人・相性の四柱推命鑑定記事',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={notoSansJP.className}>
      <body className="min-h-screen flex flex-col bg-white text-stone-900">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <footer className="bg-[#1A3557] text-white">
          <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black tracking-[0.2em] text-[#4ECDC4] uppercase mb-1">
                FORTUNE ARCHIVE
              </p>
              <p className="text-xs text-gray-400">Five Agents × Claude Code</p>
            </div>
            <p className="text-xs text-gray-400">© 2026 四柱推命鑑定ブログ</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
