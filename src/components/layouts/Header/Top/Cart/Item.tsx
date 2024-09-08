'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const CartItem = (props: Props) => {
   return (
      <div className="flex w-full items-start gap-3 whitespace-normal px-4">
         <div className="size-14 flex-shrink-0 overflow-hidden rounded-md border-[1px] border-gray-300">
            <Image
               width={300}
               height={300}
               src={'/images/product/product-1.png'}
               alt="product"
               className="h-full w-full object-cover"
            />
         </div>
         <div className="flex flex-1 flex-col">
            <Link
               href={'#'}
               target="_blank"
               title={
                  ' Apple iPhone 11 | 64GB | Black | Unlocked | FaceID | True Tone | 82% Batt | Used'
               }
               className="mb-1.5 line-clamp-1 w-full text-sm hover:underline"
            >
               Apple iPhone 11 | 64GB | Black | Unlocked | FaceID | True Tone |
               82% Batt | Used
            </Link>
            <div className="flex items-center justify-between">
               <span className="text-sm font-semibold">4,957,852.50 VND</span>
               <span className="whitespace-nowrap text-sm text-[#707070]">
                  Qty: 2
               </span>
            </div>
            <span className="text-xs font-medium text-[#707070]">
               + VND 300,000
            </span>
            <div className="peer flex w-full justify-end text-[#707070]">
               <button
                  onClick={e => {
                     e.stopPropagation()
                  }}
                  className="rounded-full p-1 duration-75 ease-linear hover:scale-105 hover:bg-neutral-200 active:scale-95"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth="1.5"
                     stroke="currentColor"
                     className="size-4"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                     />
                  </svg>
               </button>
            </div>
         </div>
      </div>
   )
}

export default CartItem
