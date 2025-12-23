interface BlogPost {
  title: string
  date: string
  excerpt?: string
  slug?: string
  externalUrl?: string
  isExternal?: boolean
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const linkUrl = post.isExternal ? post.externalUrl : `/blog/${post.slug}`
  
  return (
    <a
      href={linkUrl}
      target={post.isExternal ? '_blank' : undefined}
      rel={post.isExternal ? 'noopener noreferrer' : undefined}
      style={{
        display: 'block',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '1.5rem',
        backgroundColor: 'var(--bg-secondary)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', flex: 1 }}>
          {post.title}
          {post.isExternal && (
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>↗</span>
          )}
        </h3>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
      </div>
      {post.excerpt && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
          {post.excerpt}
        </p>
      )}
    </a>
  )
}

