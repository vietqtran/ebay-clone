import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'

type Props = {
   children: React.ReactNode
}

const DefaultLayout = ({ children }: Props) => {
   return (
      <main className="size-full">
         <Header />
         <div className="size-full min-h-screen">{children}</div>
         <Footer />
      </main>
   )
}

export default DefaultLayout
