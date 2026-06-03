import Layout from '../../components/Layout'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { getAllContent, getContentBySlug, PageData } from '../../lib/content'
import { GetStaticPaths, GetStaticProps } from 'next'

interface PostProps {
  post: PageData
}

export default function Post({ post }: PostProps) {
  return (
    <Layout title={`${post.title} | My Website`} description={post.heading}>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <header className="mb-10">
          <time className="text-xs text-stone-400 uppercase tracking-wide">
            {new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2 mb-6 leading-tight">
            {post.heading}
          </h1>
          {post.photo && (
            <Image
              src={post.photo}
              alt={post.title}
              width={800}
              height={450}
              className="rounded-xl shadow-md w-full object-cover"
            />
          )}
        </header>

        {/* Body */}
        <div className="prose-blog">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllContent('posts')
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getContentBySlug('posts', params!.slug as string)
  if (!post) return { notFound: true }
  return { props: { post } }
}
