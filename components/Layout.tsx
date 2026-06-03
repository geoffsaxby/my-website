import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({ children, title = 'My Website', description = 'A personal blog' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Fathom Analytics — replace YOUR_SITE_ID after connecting */}
        {/* <script src="https://cdn.usefathom.com/script.js" data-site="YOUR_SITE_ID" defer></script> */}
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Nav */}
        <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-serif font-bold text-stone-900 hover:text-amber-700 transition-colors">
              My Website
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="text-stone-600 hover:text-amber-700 transition-colors">Home</Link>
              <Link href="/blog" className="text-stone-600 hover:text-amber-700 transition-colors">Blog</Link>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-stone-200 bg-white mt-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center text-stone-400 text-sm">
            © {new Date().getFullYear()} My Website. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  )
}
