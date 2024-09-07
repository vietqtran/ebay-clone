import Image from 'next/image'
import React from 'react'

type Props = {}

const LastBanner = (props: Props) => {
   return (
      <div className="container mx-auto mb-10 grid w-full max-w-7xl items-center justify-center overflow-hidden lg:grid-cols-3 xl:rounded-xl">
         <div className="col-span-3 h-full w-full bg-gray-300 px-8 py-4 pr-10 text-left md:h-full lg:col-span-1">
            <h2 className="text-xl font-semibold text-black md:text-4xl">
               Sneakers for your path
            </h2>
            <h4 className="my-2 text-black md:mb-5 md:mt-3">
               Express yourself with iconic footwear from the best brands.
            </h4>
            <button className="hidden rounded-full border-[1px] border-black bg-transparent px-5 py-2 text-black duration-100 ease-linear hover:bg-black hover:text-white md:block">
               Shop now
            </button>
            <button className="flex items-center gap-3 bg-transparent text-black md:hidden">
               <span>Shop now</span>
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
                     d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
               </svg>
            </button>
         </div>
         <div className="col-span-3 h-full w-full md:size-full md:flex-1 lg:col-span-2">
            <Image
               priority
               src={'/images/home/home-slider-2.webp'}
               alt="home-slider-2"
               className="size-full object-cover"
               width={1000}
               height={1000}
            />
         </div>
      </div>
   )
}

export default LastBanner
