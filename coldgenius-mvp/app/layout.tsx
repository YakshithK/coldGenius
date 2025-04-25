import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'ColdGenius - AI-Powered Cold Email Generator',
  description: 'Write personalized, high-converting cold emails in seconds with AI. Perfect for freelancers, job seekers, and entrepreneurs.',
  keywords: ['cold email', 'email generator', 'AI writing', 'outreach', 'sales email'],
  authors: [{ name: 'ColdGenius Team' }],
  openGraph: {
    title: 'ColdGenius - Write Perfect Cold Emails with AI',
    description: 'Generate professional cold emails in seconds. Stand out in inboxes and get more responses.',
    url: 'https://coldgenius.com',
    siteName: 'ColdGenius',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ColdGenius - AI Email Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ColdGenius - AI-Powered Cold Email Generator',
    description: 'Write personalized, high-converting cold emails in seconds with AI.',
    images: ['/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased text-secondary-900 bg-secondary-50">
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
} 