'use client'

import React from 'react'
import Link from 'next/link'
import { FaHome, FaBox, FaShoppingCart, FaUser } from 'react-icons/fa'
import { useAppSelector } from '@/hooks/useRedux'
import Image from 'next/image'

const Sidebar: React.FC = () => {
    const {vendor} = useAppSelector(state => state.auth)
   return (
      <div className="flex h-screen w-64 flex-col bg-gray-800 p-4 text-white">
         <div className='grid place-items-center gap-4'>
            <Image
               src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${vendor?.logo_url}`}
               alt="logo"
               width={100}
               height={100}
               className="aspect-square rounded-full ring-1 ring-neutral-100"
            />
            <div className="mb-6 truncate text-2xl font-bold">
               {vendor?.business_name}
            </div>
         </div>
         <nav>
            <ul className="space-y-4">
               <li className="flex cursor-pointer items-center space-x-2">
                  <FaHome />
                  <Link href="/vendor">
                     <span className="ml-2">Dashboard</span>
                  </Link>
               </li>
               <li className="flex cursor-pointer items-center space-x-2">
                  <FaBox />
                  <Link href="/vendor/products">
                     <span className="ml-2">Products</span>
                  </Link>
               </li>
               <li className="flex cursor-pointer items-center space-x-2">
                  <FaShoppingCart />
                  <Link href="/vendor/orders">
                     <span className="ml-2">Orders</span>
                  </Link>
               </li>
               <li className="flex cursor-pointer items-center space-x-2">
                  <FaUser />
                  <Link href="/vendor/profile">
                     <span className="ml-2">Profile</span>
                  </Link>
               </li>
            </ul>
         </nav>
      </div>
   )
}

export default Sidebar
