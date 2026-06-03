import Layout from '../components/Layout'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { getAllContent, getContentBySlug, PageData } from '../lib/content'
import { GetStaticPaths, GetStaticProps } from 'next'

interface PageProps {
  page: PageData
}

export default function Page({ page }: PageProps) {
  return (
    <Layout title={`${page.title} | My Website`} description={page.heading}>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <header className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-6 leading-tight">
            {page.heading}
          </h1>
          {page.photo && (
            <Image
              src={page.photo}
              alt={page.title}
              width={800}
              height={450}
              className="rounded-xl shadow-md w-full object-cover"
            />
          )}
        </header>
        <div className="prose-blog">
          <ReactMarkdown>{page.body}</ReactMarkdown>
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = getAllContent('pages')
  return {
    paths: pages.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = getContentBySlug('pages', params!.slug as string)
  if (!page) return { notFound: true }
  return { props: { page } }
}
