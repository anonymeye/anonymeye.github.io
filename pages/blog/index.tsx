import Head from 'next/head'
import { getSortedPosts, BlogPost } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'

interface BlogPageProps {
  posts: BlogPost[]
}

export default function Blog({ posts }: BlogPageProps) {
  return (
    <>
      <Head>
        <title>Blog | Portfolio</title>
        <meta name="description" content="Blog posts and interesting articles" />
      </Head>

      <div className="container">
        <section className="section" style={{ paddingTop: '4rem' }}>
          <h1 className="section-title">Blog</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Thoughts, learnings, and interesting articles I've come across on my journey 
            from mobile to backend and AI engineering.
          </p>

          {posts.length === 0 ? (
            <div
              style={{
                padding: '3rem',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
              }}
            >
              <p>No blog posts yet. Check back soon!</p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Add markdown files to <code>content/blog/</code> or edit <code>content/blog/external-links.json</code>
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const posts = getSortedPosts()
  return {
    props: {
      posts,
    },
  }
}

