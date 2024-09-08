'use client'

import Cart from './Cart'
import Link from 'next/link'
import MyEbay from './MyEbay'
import Notification from './Notification'
import React from 'react'
import SelectShippingCountry from './SelectShippingCountry'
import UserAuthAction from '../UserAuthAction'

type Props = {}

const HeaderTop = (props: Props) => {
   return (
      <div className="z-20 w-full whitespace-nowrap border-b-[1px] border-b-neutral-200 px-4 xl:px-0">
         <div className="container mx-auto flex w-full max-w-[1248px] items-center justify-between gap-10">
            <div className="flex h-8 items-center gap-6">
               <UserAuthAction />
               <div className="hidden text-xs md:block">
                  <Link href={'#'}>Daily Deals</Link>
               </div>
               <div className="hidden text-xs md:block">
                  <Link href={'#'}>Help & Contact</Link>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <SelectShippingCountry />
               <div className="hidden cursor-pointer text-xs md:block">
                  <Link href={'#'}>Sell</Link>
               </div>
               <MyEbay />
               <div className="flex items-center gap-3">
                  <Notification />
                  <Cart />
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeaderTop
