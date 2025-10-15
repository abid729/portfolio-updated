import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Muhammad Abid - Full-Stack Developer',
  description: 'Portfolio of Muhammad Abid - Sr. Laravel, PHP, React & Next.js Developer with 4+ years of experience',
  keywords: ['Muhammad Abid', 'Full-Stack Developer', 'Laravel', 'React', 'Next.js', 'PHP', 'Web Development'],
  authors: [{ name: 'Muhammad Abid' }],
  creator: 'Muhammad Abid',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Muhammad Abid - Full-Stack Developer',
    description: 'Portfolio of Muhammad Abid - Sr. Laravel, PHP, React & Next.js Developer',
    siteName: 'Muhammad Abid Portfolio',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

