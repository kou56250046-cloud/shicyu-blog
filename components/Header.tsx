import Link from 'next/link'

const navLinks = [
  { href: '/', label: '四柱推命' },
  { href: '/fuusui', label: '風水' },
  { href: '/astrology', label: '占星術' },
  { href: '/sanmei', label: '算命学' },
  { href: '/numerology', label: '数秘術' },
  { href: '/compatibility', label: '相性鑑定' },
  { href: '/people', label: '人物一覧' },
]

export default function Header() {
  return (
    <header className="bg-indigo-950 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-base font-semibold tracking-wide hover:text-indigo-200 transition-colors"
        >
          ☯ 四柱推命鑑定
        </Link>
        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 text-sm rounded-md hover:bg-indigo-800 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
