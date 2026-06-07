import Layout from '../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getAllContent, PageData } from '../lib/content'

interface HomeProps {
  posts: PageData[]
}

export default function Home({ posts }: HomeProps) {
  const [visitorNumber, setVisitorNumber] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/visit', { method: 'GET' })
      .then(r => r.json())
      .then(data => setVisitorNumber(data.count))
      .catch(() => {}) // silently fail if function not available locally
  }, [])

  useEffect(() => {
    let cancelled = false
    import('canvas-confetti').then(({ default: confetti }) => {
      if (cancelled) return
      // First burst
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.55 } })
      // Second burst after a short delay
      setTimeout(() => {
        if (!cancelled) confetti({ particleCount: 80, spread: 120, origin: { y: 0.5 }, angle: 60, startVelocity: 45 })
      }, 300)
      setTimeout(() => {
        if (!cancelled) confetti({ particleCount: 80, spread: 120, origin: { y: 0.5 }, angle: 120, startVelocity: 45 })
      }, 500)
    })
    return () => { cancelled = true }
  }, [])

  return (
    <Layout title="My Website" description="Welcome to my personal blog">
      {/* Hero */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 mb-4">
            Welcome
          </h1>
          <p className="text-lg text-stone-500 max-w-xl mx-auto">
            A personal space to share thoughts, stories, and ideas.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-block bg-amber-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-800 transition-colors"
          >
            Read the Blog
          </Link>

          {visitorNumber && (
            <p className="mt-6 text-sm text-stone-400">
              You are visitor number{' '}
              <span className="font-semibold text-amber-700">#{visitorNumber.toLocaleString()}</span>
            </p>
          )}
        </div>
      </section>

      {/* Recent posts */}
      {posts.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-8">Recent Posts</h2>
          <div className="space-y-10">
            {posts.slice(0, 3).map(post => (
              <article key={post.slug} className="flex flex-col sm:flex-row gap-6">
                {post.photo && (
                  <div className="sm:w-48 sm:flex-shrink-0">
                    <Image
                      src={post.photo}
                      alt={post.title}
                      width={192}
                      height={128}
                      className="rounded-lg object-cover w-full h-36 sm:h-full"
                    />
                  </div>
                )}
                <div>
                  <time className="text-xs text-stone-400 uppercase tracking-wide">
                    {new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <h3 className="text-xl font-serif font-semibold text-stone-900 mt-1 mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-amber-700 transition-colors">
                      {post.heading}
                    </Link>
                  </h3>
                  <Link href={`/blog/${post.slug}`} className="text-sm text-amber-700 hover:underline">
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllContent('posts')
  return { props: { posts } }
}
