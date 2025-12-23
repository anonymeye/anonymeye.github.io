import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt?: string
  content: string
  isExternal?: boolean
  externalUrl?: string
}

export function getSortedPosts(): BlogPost[] {
  // Get file names in /content/blog
  const fileNames = fs.existsSync(postsDirectory)
    ? fs.readdirSync(postsDirectory)
    : []
  
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents)

      // Combine the data with the slug
      return {
        slug,
        content,
        ...data,
      } as BlogPost
    })

  // Also check for external links in a JSON file
  const externalLinksPath = path.join(process.cwd(), 'content/blog/external-links.json')
  let externalLinks: BlogPost[] = []
  
  if (fs.existsSync(externalLinksPath)) {
    try {
      const linksData = JSON.parse(fs.readFileSync(externalLinksPath, 'utf8'))
      externalLinks = linksData.map((link: any) => ({
        ...link,
        isExternal: true,
        slug: `external-${link.date}`,
      }))
    } catch (e) {
      console.error('Error reading external links:', e)
    }
  }

  // Combine and sort posts by date
  const allPosts = [...allPostsData, ...externalLinks]
  
  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.existsSync(postsDirectory)
    ? fs.readdirSync(postsDirectory)
    : []
  
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    ...data,
  } as BlogPost
}

