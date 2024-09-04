import React from 'react'
import Header from '../common/Header'

type Props = {
   children: React.ReactNode
}

const DefaultLayout = ({ children }: Props) => {
   return (
      <main className="size-full">
         <Header />
         {children}
      </main>
   )
}

export default DefaultLayout
