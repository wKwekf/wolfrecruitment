import './globals.css'
import { Figtree } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata } from 'next'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
})

export const metadata: Metadata = {
  title: 'Wolf - AI-Recruiting Experten',
  description: 'Wir finden die AI-Experten, die andere übersehen.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Wolf - AI-Recruiting Experten',
    description: 'In 7 Tagen zu deinen passenden AI-Experten. Geprüfte Kandidaten, die deine AI-Vision sofort voranbringen.',
    type: 'website',
    url: 'https://wolfai.de',
    images: [
      {
        url: '/videos/Thumbnail/BayernLB_Thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Wolf - AI-Recruiting Experten'
      }
    ],
    siteName: 'Wolf'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wolf - AI-Recruiting Experten',
    description: 'In 7 Tagen zu deinen passenden AI-Experten. Geprüfte Kandidaten, die deine AI-Vision sofort voranbringen.',
    images: ['/videos/Thumbnail/BayernLB_Thumbnail.png'],
  },
  metadataBase: new URL('https://wolfai.de')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={figtree.variable}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
