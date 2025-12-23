import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navigation() {
  return (
    <nav
      style={{
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--bg-primary)',
        zIndex: 100,
        backdropFilter: 'blur(10px)',
        opacity: 0.95,
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Portfolio
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
          <Link href="/projects" style={{ color: 'var(--text-secondary)' }}>Projects</Link>
          <Link href="/blog" style={{ color: 'var(--text-secondary)' }}>Blog</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

