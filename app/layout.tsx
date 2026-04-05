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
      <body className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
        <Header />
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="text-center text-xs text-stone-400 py-6 border-t border-stone-200">
          © 2026 四柱推命鑑定ブログ — Five Agents × Claude Code
        </footer>
      </body>
    </html>
  )
}
