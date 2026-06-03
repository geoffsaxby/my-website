import Layout from '../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { getAllContent, PageData } from '../../lib/content'

interface BlogIndexProps {
  posts: PageData[]
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <Layout title="Blog | My Website" description="All blog posts">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-12">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-stone-500 italic">No posts yet — check back soon.</p>
        ) : (
          <div className="space-y-12">
            {posts.map(post => (
              <article key={post.slug} className="border-b border-stone-100 pb-12 last:border-0">
                {post.photo && (
                  <Link href={`/blog/${post.slug}`}>
                    <Image
                      src={post.photo}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="rounded-lg object-cover w-full h-56 mb-5 hover:opacity-90 transition-opacity"
                    />
                  </Link>
                )}
                <time className="text-xs text-stone-400 uppercase tracking-wide">
                  {new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <h2 className="text-2xl font-serif font-semibold text-stone-900 mt-1 mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-amber-700 transition-colors">
                    {post.heading}
                  </Link>
                </h2>
                <Link href={`/blog/${post.slug}`} className="text-sm text-amber-700 hover:underline">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllContent('posts')
  return { props: { posts } }
}
