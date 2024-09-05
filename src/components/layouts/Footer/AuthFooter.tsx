import Link from 'next/link'
import React from 'react'

type Props = {}

const AuthFooter = (props: Props) => {
   return (
      <footer className="border-t-[1px] border-t-[#707070] w-full">
         <div className="w-full grid place-items-center p-5">
            <div className="w-full text-center text-[#707070] text-[11px]">
               <span className="font-semibold text-black">
                  Copyright © 1995-2024 eBay Inc. All Rights Reserved.
               </span>
               {` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  Accessibility
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  User Agreement
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  Privacy
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  User Agreement
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  Consumer Health Data
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  Payments Terms of Use
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  Cookies
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  CA Privacy Notice
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  Your Privacy Choices and AdChoice
               </Link>
            </div>
         </div>
      </footer>
   )
}

export default AuthFooter
