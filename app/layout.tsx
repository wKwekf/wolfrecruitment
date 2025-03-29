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
  title: 'Wolf - Recruiting ausschließlich für AI-Positionen',
  description: 'Wir finden die AI-Experten, die andere übersehen.',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' }
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicon/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicon/android-chrome-512x512.png',
      },
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest'
      }
    ]
  },
  openGraph: {
    title: 'Wolf - Recruiting ausschließlich für AI-Positionen',
    description: 'In 7 Tagen zu deinen passenden AI-Experten. Geprüfte Kandidaten, die deine AI-Vision sofort voranbringen.',
    type: 'website',
    url: 'https://wolfai.de',
    images: [
      {
        url: 'https://wolfai.de/logos/Logo_Wolf_Preview.png',
        width: 1200,
        height: 630,
        alt: 'Wolf - Recruiting ausschließlich für AI-Positionen'
      }
    ],
    siteName: 'Wolf'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wolf - Recruiting ausschließlich für AI-Positionen',
    description: 'In 7 Tagen zu deinen passenden AI-Experten. Geprüfte Kandidaten, die deine AI-Vision sofort voranbringen.',
    images: ['https://wolfai.de/logos/Logo_Wolf_Preview.png'],
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
