'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const HeaderBottom = (props: Props) => {
   const [searchValue, setSearchValue] = React.useState('')
   return (
      <div className="border-b-[1px] border-b-neutral-200 px-4 pb-4 pt-3 xl:px-0">
         <div className="container mx-auto flex w-full max-w-[1248px] items-center gap-2">
            <div className="flex flex-shrink-0 items-center">
               <Image
                  className="h-[46px] w-auto"
                  alt="eBay"
                  width={200}
                  height={200}
                  priority
                  src={'/images/logo.svg'}
               />
               <button className="hidden md:flex items-center gap-1.5 px-1.5 pr-3">
                  <div className="leading-1 flex flex-col items-start gap-0 text-start text-xs text-[#707070]">
                     <span>Shop by</span> <span>category</span>
                  </div>
                  <svg
                     width="12"
                     height="6"
                     viewBox="0 0 12 6"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <g clipPath="url(#clip0_1_19)">
                        <path
                           d="M6.11004 6.11117C6.02961 6.11167 5.94987 6.09627 5.87541 6.06585C5.80095 6.03544 5.73323 5.99061 5.67615 5.93394L0.789708 1.0475C0.674634 0.932426 0.609985 0.776351 0.609985 0.613612C0.609985 0.450872 0.674634 0.294797 0.789708 0.179723C0.904783 0.0646482 1.06086 0 1.2236 0C1.38634 0 1.54241 0.0646482 1.65749 0.179723L6.11004 4.639L10.5632 0.179723C10.6783 0.0646482 10.8344 5.25259e-09 10.9971 6.46509e-09C11.1598 7.6776e-09 11.3159 0.0646482 11.431 0.179723C11.5461 0.294797 11.6107 0.450872 11.6107 0.613612C11.6107 0.776351 11.5461 0.932426 11.431 1.0475L6.54393 5.93394C6.48685 5.99061 6.41913 6.03544 6.34467 6.06585C6.27021 6.09627 6.19047 6.11167 6.11004 6.11117Z"
                           fill="black"
                        />
                     </g>
                     <defs>
                        <clipPath id="clip0_1_19">
                           <rect
                              width="11"
                              height="6.11111"
                              fill="white"
                              transform="translate(0.609985)"
                           />
                        </clipPath>
                     </defs>
                  </svg>
               </button>
            </div>
            <div className="flex h-11 flex-1 items-center rounded-full border-2 border-black">
               <div className="flex h-full flex-1 items-center">
                  <div className="flex w-10 flex-shrink-0 items-center justify-end pr-2">
                     <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M3.7941 6.58824C3.7941 4.76894 5.26892 3.29412 7.08821 3.29412C8.90751 3.29412 10.3823 4.76894 10.3823 6.58824C10.3823 8.40753 8.90751 9.88235 7.08821 9.88235C5.26892 9.88235 3.7941 8.40753 3.7941 6.58824ZM14.8623 13.0353L14.8426 13.0259L11.3508 9.56141L11.3273 9.55388C11.9164 8.71435 12.2647 7.69318 12.2647 6.58824C12.2647 3.72988 9.94657 1.41177 7.08821 1.41177C4.22986 1.41177 1.91174 3.72988 1.91174 6.58824C1.91174 9.44659 4.22986 11.7647 7.08821 11.7647C8.1781 11.7647 9.18798 11.4259 10.0228 10.8499L13.5353 14.3624C13.908 14.6824 14.4652 14.6598 14.8124 14.3125C15.1597 13.9652 15.1823 13.408 14.8623 13.0353Z"
                           fill="#707070"
                        />
                     </svg>
                  </div>
                  <div className="h-full flex-1">
                     <input
                        type="text"
                        placeholder="Search for anything"
                        className="h-full w-full flex-1 pr-3 text-sm placeholder:text-[#8F8F8F] focus:outline-none"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                     />
                  </div>
               </div>
               <button
                  type="button"
                  className="hidden h-full min-w-40 cursor-pointer items-center justify-between border-l-[1px] border-l-[#c7c7c7] px-4 md:flex"
               >
                  <span className="text-xs text-[#6D6D6D]">All categories</span>
                  <svg
                     width="8"
                     height="5"
                     viewBox="0 0 8 5"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M4.23455 4.68229C4.07777 4.67917 3.95382 4.62448 3.86111 4.52917L0.619442 1.19583C0.529858 1.1026 0.477254 0.979688 0.472046 0.848958V0.811458C0.477254 0.677604 0.529858 0.554167 0.619442 0.461458C0.813713 0.2625 1.15017 0.263542 1.34236 0.461458L4.22205 3.42344L7.10121 0.460938C7.29496 0.263021 7.6309 0.263021 7.82361 0.460938C7.91527 0.554688 7.96788 0.679167 7.97205 0.811458V0.841667C7.96788 0.977604 7.91475 1.10208 7.82361 1.19583L4.58298 4.52917C4.49027 4.62448 4.36632 4.67917 4.23455 4.68229Z"
                        fill="#767676"
                     />
                  </svg>
               </button>
               <div className="aspect-square h-full p-1 md:hidden">
                  <button className="grid size-full place-items-center rounded-full bg-[#3665F3] hover:bg-[#382aef]">
                     <svg
                        className="size-4"
                        width="800px"
                        height="800px"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M14.5 14.5L10.5 10.5M6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5Z"
                           stroke="#fff"
                        />
                     </svg>
                  </button>
               </div>
            </div>
            <div className="hidden h-[41px] flex-shrink-0 items-center md:flex">
               <button className="h-[41px] w-40 rounded-full bg-[#3665F3] text-sm font-bold text-white duration-75 ease-linear hover:bg-[#382aef]">
                  Search
               </button>
               <Link
                  className="hidden h-full w-[75px] place-items-center text-xs text-[#767676] lg:grid"
                  href={'#'}
               >
                  Advance
               </Link>
            </div>
         </div>
      </div>
   )
}

export default HeaderBottom
