'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '/', label: '四柱推命' },
  { href: '/fuusui', label: '風水' },
  { href: '/astrology', label: '占星術' },
  { href: '/sanmei', label: '算命学' },
  { href: '/numerology', label: '数秘術' },
  { href: '/compatibility', label: '相性鑑定' },
  { href: '/people', label: '人物一覧' },
  { href: '/realestate', label: '物件探し' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'border-b border-gray-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-black tracking-[0.2em] text-[#0D7377] uppercase hover:text-[#14A085] transition-colors"
        >
          FORTUNE ARCHIVE
        </Link>
        <nav className="flex items-center">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#0D7377]'
                    : 'text-gray-500 hover:text-[#14A085]'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#14A085] rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
