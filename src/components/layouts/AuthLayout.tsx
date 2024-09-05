'use client'

import React, { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import AuthFooter from './Footer/AuthFooter'
import AuthHeader from './Header/AuthHeader'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { useAppSelector } from '@/hooks/useRedux'

type Props = {
   children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
   const pathName = usePathname()
   const { push } = useRouter()
   const { currentRegisterForm, user } = useAppSelector(state => state.auth)
   const isSignIn = useMemo(() => pathName.includes('signin'), [pathName])

   if (user) {
      push('/')
      return null
   }

   return (
      <main className="flex size-full min-h-screen flex-col">
         <AuthHeader page={isSignIn ? 'signin' : 'register'} />
         <div className="container mx-auto max-w-screen-2xl flex-1">
            <div className="flex size-full items-start justify-center">
               <div
                  className={twMerge(
                     'hidden h-[826px] w-[714px] pl-5 xl:block',
                     isSignIn && 'order-2 pl-0 pr-5'
                  )}
               >
                  <Image
                     className="h-full w-full rounded-2xl object-cover"
                     src={
                        currentRegisterForm === 'personal'
                           ? '/images/auth/register.webp'
                           : '/images/auth/register-business.jpg'
                     }
                     width={1000}
                     height={1000}
                     alt=""
                     priority
                  />
               </div>
               <div
                  className={twMerge(
                     'flex flex-1 items-start justify-center px-5 pt-14',
                     isSignIn && 'order-1'
                  )}
               >
                  <div className="w-full max-w-[410px]">{children}</div>
               </div>
            </div>
         </div>
         <AuthFooter />
      </main>
   )
}

export default AuthLayout
