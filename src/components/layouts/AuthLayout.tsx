'use client'

import React from 'react'
import AuthFooter from '../common/Footer/AuthFooter'
import AuthHeader from '../common/Header/AuthHeader'
import { usePathname } from 'next/navigation'

type Props = {
   children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
   const pathName = usePathname()

   return (
      <main className="size-full min-h-screen flex flex-col">
         <AuthHeader
            page={pathName.includes('signin') ? 'signin' : 'register'}
         />
         <div className="flex-1">{children}</div>
         <AuthFooter />
      </main>
   )
}

export default AuthLayout
