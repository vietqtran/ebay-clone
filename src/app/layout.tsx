import './globals.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Electronics, Cars, Fashion, Collectibles & More | eBay',
   icons: {
      shortcut: '/favicon.ico',
      href: '/favicon.ico',
      icon: '/favicon.ico'
   },
   description:
      "Buy & sell electronics, cars, clothes, collectibles & more on eBay, the world's online marketplace. Top brands, low prices & free shipping on many items."
}

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body className={inter.className}>{children}</body>
      </html>
   )
}
