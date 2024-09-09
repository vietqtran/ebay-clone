import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
   page: 'signin' | 'register' | 'verify'
}

const AuthHeader = ({ page }: Props) => {
   return (
      <header className="flex items-center justify-between p-4">
         <Image
            src={'/images/logo.svg'}
            width={200}
            height={200}
            alt="eBay"
            priority
            className="h-12 w-auto"
         />
         {page === 'register' ? (
            <div className="text-sm">
               <span className="text-[#707070]">Already have an account? </span>
               <Link href={'/signin'} className="underline">
                  Sign in
               </Link>
            </div>
         ) : (
            <div></div>
         )}
      </header>
   )
}

export default AuthHeader
