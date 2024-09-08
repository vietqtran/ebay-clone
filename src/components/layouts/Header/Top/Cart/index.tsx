'use client'

import CartItem from './Item'
import React from 'react'
import SimpleBar from 'simplebar-react'

type Props = {}

const Cart = (props: Props) => {
   return (
      <div className="flex w-11 cursor-pointer items-center justify-center">
         <div className="group relative flex w-11 items-center justify-center after:absolute after:-bottom-3 after:right-0 after:h-3 after:w-full">
            <div className="relative">
               <div className="absolute -top-0.5 left-1/2 grid h-4 place-items-center rounded-full bg-red-500 px-1">
                  <span className="text-xs font-semibold leading-none text-white">
                     99+
                  </span>
               </div>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
               </svg>
            </div>

            <div className="absolute right-0 top-[calc(100%+10px)] hidden w-[320px] cursor-default flex-col rounded-lg bg-white py-4 shadow-popup group-hover:flex">
               <h3 className="mb-4 px-4 font-semibold">Shopping cart</h3>
               <SimpleBar style={{ maxHeight: '500px' }}>
                  <CartItem />
                  <CartItem />
                  <CartItem />
                  <CartItem />
                  <CartItem />
                  <CartItem />
                  <CartItem />
                  <CartItem />
                  <CartItem />
               </SimpleBar>
               <div className="mt-3 flex items-center justify-between border-y-[1px] border-y-[#cfcfcf] bg-[#e6e6e6] p-4">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-semibold">
                     4,957,852.50 VND
                  </span>
               </div>
               <div className="flex flex-col gap-2 p-4 pb-0">
                  <button className="w-full rounded-md bg-blue-500 px-4 py-2.5 text-sm text-white hover:bg-blue-600">
                     Checkout
                  </button>
                  <button className="w-full rounded-md border-[1px] border-blue-500 px-4 py-2.5 text-sm text-blue-500 hover:bg-neutral-200 hover:bg-white">
                     View cart
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Cart
