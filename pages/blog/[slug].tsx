import Head from 'next/head'
import { useRouter } from 'next/router'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import type { BlogPost } from '@/lib/posts'
import { remark } from 'remark'
import html from 'remark-html'

interface BlogPostPageProps {
  post: BlogPost | null
  contentHtml: string
}

export default function BlogPost({ post, contentHtml }: BlogPostPageProps) {
  const router = useRouter()

  if (!post) {
    return (
      <div className="container">
        <section className="section" style={{ paddingTop: '4rem' }}>
          <h1>Post not found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
        </section>
      </div>
    )
  }

  if (post.isExternal && post.externalUrl) {
    // Redirect to external URL
    if (typeof window !== 'undefined') {
      window.location.href = post.externalUrl
    }
    return null
  }

  return (
    <>
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Head>

      <div className="container">
        <article className="section" style={{ paddingTop: '4rem', maxWidth: '800px', margin: '0 auto' }}>
          <button
            onClick={() => router.back()}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              cursor: 'pointer',
              marginBottom: '2rem',
              fontSize: '0.9rem',
            }}
          >
            ← Back to Blog
          </button>

          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>
            {post.title}
          </h1>

          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs().map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  // Process markdown content
  const processedContent = await remark().use(html).process(post.content)
  const contentHtml = processedContent.toString()

  return {
    props: {
      post,
      contentHtml,
    },
  }
}

