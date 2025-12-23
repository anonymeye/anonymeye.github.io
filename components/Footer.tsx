export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        padding: '2rem 0',
        marginTop: '4rem',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
      }}
    >
      <div className="container">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Built with Next.js
        </p>
      </div>
    </footer>
  )
}

