import { FLYOUT_CATEGORIES } from '@/constants/header'
import Link from 'next/link'
import React from 'react'

type Props = {}

const ShopByCategory = (props: Props) => {
   return (
      <div className="group relative hidden cursor-pointer items-center gap-1.5 px-1.5 py-1 pr-3 md:flex">
         <div className="leading-1 flex flex-col items-start gap-0 text-start text-xs text-[#707070]">
            <span>Shop by</span> <span>category</span>
         </div>
         <svg
            width="12"
            height="6"
            className="rotate-180 duration-75 ease-linear group-hover:rotate-0"
            viewBox="0 0 12 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <g clipPath="url(#clip0_1_19)">
               <path
                  d="M6.11004 6.11117C6.02961 6.11167 5.94987 6.09627 5.87541 6.06585C5.80095 6.03544 5.73323 5.99061 5.67615 5.93394L0.789708 1.0475C0.674634 0.932426 0.609985 0.776351 0.609985 0.613612C0.609985 0.450872 0.674634 0.294797 0.789708 0.179723C0.904783 0.0646482 1.06086 0 1.2236 0C1.38634 0 1.54241 0.0646482 1.65749 0.179723L6.11004 4.639L10.5632 0.179723C10.6783 0.0646482 10.8344 5.25259e-09 10.9971 6.46509e-09C11.1598 7.6776e-09 11.3159 0.0646482 11.431 0.179723C11.5461 0.294797 11.6107 0.450872 11.6107 0.613612C11.6107 0.776351 11.5461 0.932426 11.431 1.0475L6.54393 5.93394C6.48685 5.99061 6.41913 6.03544 6.34467 6.06585C6.27021 6.09627 6.19047 6.11167 6.11004 6.11117Z"
                  fill="#707070"
               />
            </g>
            <defs>
               <clipPath id="clip0_1_19">
                  <rect
                     width="11"
                     height="6.11111"
                     fill="currentColor"
                     transform="translate(0.609985)"
                  />
               </clipPath>
            </defs>
         </svg>

         <div className="absolute left-0 top-full hidden w-[732px] cursor-default grid-cols-3 gap-x-3 gap-y-7 rounded-xl bg-white px-4 py-6 text-sm shadow-popup group-hover:grid">
            {FLYOUT_CATEGORIES.map(category => (
               <div key={category.key} className="flex flex-col">
                  <h3 className="mb-1 cursor-pointer rounded-md p-1.5 font-medium hover:bg-neutral-100">
                     {category.title}
                  </h3>
                  <ul className="flex flex-col gap-1">
                     {category.items.map(item => (
                        <li key={item.key}>
                           <Link
                              href={'#'}
                              className="block w-full cursor-pointer rounded-md p-1.5 text-[#707070] hover:bg-neutral-100"
                           >
                              {item.title}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
         </div>
      </div>
   )
}

export default ShopByCategory
