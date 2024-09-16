'use client'

import { useAppSelector } from '@/hooks/useRedux'
import Footer from './Footer'
import Header from './Header'
import { useEffect, useState } from 'react'
import { UserRole } from '@/types/user'
import { useRouter } from 'next/navigation'

type Props = {
   children: React.ReactNode
}

const DefaultLayout = ({ children }: Props) => {
   const { push } = useRouter()
   const { user, vendor } = useAppSelector(state => state.auth)
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const checkRole = () => {
         if (user?.role === UserRole.VENDOR && !!vendor) {
            push('/vendor')
            return
         }
         setIsLoading(false)
      }
      checkRole()
   }, [user, vendor])

   return isLoading ? null : (
      <main className="flex size-full flex-col">
         <Header />
         <div className="size-full min-h-screen flex-1">
            <div className="w-full">{children}</div>
         </div>
         <Footer />
      </main>
   )
}

export default DefaultLayout
