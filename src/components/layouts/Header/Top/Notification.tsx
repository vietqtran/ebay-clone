import React from 'react'

type Props = {}

const Notification = (props: Props) => {
   return (
      <div className="hidden w-11 cursor-pointer items-center justify-center md:flex">
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
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
               />
            </svg>
         </div>
      </div>
   )
}

export default Notification
