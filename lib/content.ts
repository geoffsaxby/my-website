import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PageData {
  slug: string
  title: string
  heading: string
  photo?: string
  body: string
  published: boolean
  date: string
}

function getContentDir(type: 'pages' | 'posts') {
  return path.join(process.cwd(), 'content', type)
}

export function getAllContent(type: 'pages' | 'posts'): PageData[] {
  const dir = getContentDir(type)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))

  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title || '',
        heading: data.heading || data.title || '',
        photo: data.photo || null,
        body: content,
        published: data.published !== false,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      }
    })
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getContentBySlug(type: 'pages' | 'posts', slug: string): PageData | null {
  const filePath = path.join(getContentDir(type), `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title || '',
    heading: data.heading || data.title || '',
    photo: data.photo || null,
    body: content,
    published: data.published !== false,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
  }
}
