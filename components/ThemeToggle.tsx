import { useTheme } from '@/contexts/ThemeContext'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        style={{
          background: 'none',
          border: 'none',
          padding: '0.5rem',
          fontSize: '1.5rem',
          color: 'var(--text-primary)',
        }}
      >
        🌙
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        fontSize: '1.5rem',
        color: 'var(--text-primary)',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

