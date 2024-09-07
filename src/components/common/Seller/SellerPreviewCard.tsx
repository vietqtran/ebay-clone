import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const SellerPreviewCard = (props: Props) => {
   const [isSaved, setIsSaved] = React.useState(false)
   return (
      <div className="flex w-full cursor-pointer flex-col gap-2">
         <div className="relative grid aspect-square w-full grid-cols-2 gap-0.5 overflow-hidden rounded-lg">
            <Link href={'#'} target="_blank">
               <Image
                  width={500}
                  height={500}
                  priority
                  className="h-full w-full object-cover"
                  src="/images/product/product-1.png"
                  alt="category"
               />
            </Link>
            <Link href={'#'} target="_blank">
               <Image
                  width={500}
                  height={500}
                  priority
                  className="h-full w-full object-cover"
                  src="/images/product/product-1.png"
                  alt="category"
               />
            </Link>
            <Link href={'#'} target="_blank">
               <Image
                  width={500}
                  height={500}
                  priority
                  className="h-full w-full object-cover"
                  src="/images/product/product-1.png"
                  alt="category"
               />
            </Link>
            <Link href={'#'} target="_blank">
               <Image
                  width={500}
                  height={500}
                  priority
                  className="h-full w-full object-cover"
                  src="/images/product/product-1.png"
                  alt="category"
               />
            </Link>
         </div>
         <div className="flex h-11 items-center gap-2">
            <div className="size-[34px] overflow-hidden rounded-full border-[1px] border-gray-200">
               <Image
                  width={500}
                  height={500}
                  priority
                  className="h-full w-full object-cover"
                  src="/images/product/product-1.png"
                  alt="category"
               />
            </div>
            <div className="flex flex-1 flex-col items-start text-sm">
               <p className="line-clamp-1 text-start text-base font-semibold">
                  seller seller seller seller seller seller seller seller seller
                  seller seller seller seller
               </p>
               <p>999.999 followers</p>
            </div>
            <button
               onClick={() => setIsSaved(!isSaved)}
               className="flex items-center gap-1 text-blue-600 duration-75 ease-linear active:scale-95"
            >
               {!isSaved ? (
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
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                     />
                  </svg>
               ) : (
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="currentColor"
                     className="size-4"
                  >
                     <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
               )}
               <span className="text-sm">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
         </div>
      </div>
   )
}

export default SellerPreviewCard
