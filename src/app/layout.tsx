import './globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'simplebar-react/dist/simplebar.min.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import ReduxProvider from '@/components/providers/ReduxProvider'
import { Toaster } from 'sonner'
import FullPageLoader from '@/components/common/Loader/FullPageLoader'

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
         <body className={inter.className}>
            <ReduxProvider>
               {children}
               <div id="portal"></div>
               <Toaster
                  richColors
                  position="bottom-right"
                  expand={false}
                  closeButton
               />
               <FullPageLoader />
            </ReduxProvider>
         </body>
      </html>
   )
}
