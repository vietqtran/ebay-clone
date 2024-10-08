'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { setUser, setVendor } from '@/stores/auth/authSlice'

type Props = {}

const UserAuthAction = (props: Props) => {
   const dispatch = useAppDispatch()
   const { user } = useAppSelector(state => state.auth)

   return (
      <div className="group relative flex items-center gap-1 text-xs">
         {user && (
            <div
               style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
               className="absolute left-0 top-[calc(100%+10px)] hidden w-64 rounded-lg bg-white pb-4 shadow-xl group-hover:block"
            >
               <div className="relative z-20 flex w-full items-center justify-start gap-4 p-4 before:absolute before:-top-4 before:left-0 before:z-10 before:h-5 before:w-full">
                  <Image
                     className="size-14 rounded-full ring-1 ring-neutral-200"
                     width={100}
                     height={100}
                     src={user?.avatar_url ?? '/images/user.jpg'}
                     alt="avatar"
                  />
                  <div className="w-full flex-1 truncate">
                     <p className="overflow-hidden truncate text-ellipsis whitespace-nowrap text-sm font-semibold">
                        {user?.name ??
                           `${user?.first_name ?? ''} ${user?.last_name ?? ''}`}
                     </p>
                     <p className="block overflow-hidden truncate text-ellipsis whitespace-nowrap">
                        {user?.email}
                     </p>
                  </div>
               </div>
               <div className="px-2">
                  <button
                     onClick={() => {
                        dispatch(setUser(null))
                        dispatch(setVendor(null))
                     }}
                     className="w-full cursor-pointer rounded-md p-2 text-left text-sm hover:bg-gray-100"
                  >
                     Sign Out
                  </button>
               </div>
            </div>
         )}
         <span>Hi!</span>
         {user === null ? (
            <>
               <Link href={'/signin'} className="text-link">
                  Sign in
               </Link>
               <span className="hidden md:block"> or </span>
               <Link className="text-link hidden md:block" href={'/register'}>
                  Register
               </Link>
            </>
         ) : (
            <div className="relative flex cursor-pointer items-center gap-1">
               <span className="font-semibold">
                  {' '}
                  {user?.name ??
                     `${user?.first_name ?? ''} ${user?.last_name ?? ''}`}
               </span>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-4"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
               </svg>
            </div>
         )}
      </div>
   )
}

export default UserAuthAction
