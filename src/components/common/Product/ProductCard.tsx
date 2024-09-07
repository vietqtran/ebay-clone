import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {}

const ProductCard = (props: Props) => {
   const [isLiked, setIsLiked] = React.useState(false)

   return (
      <Link
         href={'#'}
         target="_blank"
         className="flex size-full h-full flex-col justify-between gap-2 sm:gap-4"
      >
         <div className="relative aspect-square w-full overflow-hidden rounded-xl">
            <button
               onClick={e => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
               }}
               className={twMerge(
                  'absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-white/80 duration-75 ease-linear hover:scale-105 hover:bg-white active:scale-95',
                  isLiked && 'bg-white'
               )}
            >
               {!isLiked ? (
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth="1.5"
                     stroke="currentColor"
                     className="size-5"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                     />
                  </svg>
               ) : (
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     className="size-5 fill-red-600"
                  >
                     <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
               )}
            </button>
            <Image
               className="h-full w-full object-cover"
               width={500}
               height={500}
               src="/images/product/product-1.png"
               alt=""
            />
         </div>
         <div className="h-10 text-left text-sm">
            <p className="line-clamp-2 whitespace-break-spaces hover:underline">
               Apple iPhone 11 | 64GB | Black | Unlocked | FaceID | True Tone |
               82% Batt | Used
            </p>
         </div>
         <div className="flex flex-col items-start gap-1">
            <p className="whitespace-nowrap text-sm font-semibold sm:text-base">
               4,957,852.50 VND
            </p>
            <p className="whitespace-nowrap text-xs font-normal text-[#707070] line-through">
               3,957,852.50 VND
            </p>
         </div>
      </Link>
   )
}

export default ProductCard
