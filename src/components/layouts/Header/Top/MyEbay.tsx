import React from 'react'

type Props = {}

const MyEbay = (props: Props) => {
   return (
      <div className="group relative flex cursor-pointer items-center gap-1 text-xs after:absolute after:top-2.5 after:h-4 after:w-full">
         <div className="absolute -left-4 top-[calc(100%+10px)] hidden w-[200px] rounded-lg bg-white px-2 py-3 pb-4 shadow-popup group-hover:block">
            <div className="rounded-xl p-2 font-medium hover:bg-gray-100">
               Summary
            </div>
            <div className="rounded-xl p-2 font-medium hover:bg-gray-100">
               Recently Viewed
            </div>
            <div className="rounded-xl p-2 font-medium hover:bg-gray-100">
               Bids/Offers
            </div>
            <div className="rounded-xl p-2 font-medium hover:bg-gray-100">
               Watchlist
            </div>
            <div className="rounded-xl p-2 font-medium hover:bg-gray-100">
               Purchase History
            </div>
            <div className="rounded-xl p-2 font-medium hover:bg-gray-100">
               Buy Again
            </div>
            <div className="rounded-xl p-2 font-medium hover:bg-gray-100">
               Selling
            </div>
            <div className="rounded-xl p-2 font-medium hover:bg-gray-100">
               Saved Searches
            </div>
            <div className="rounded-xl p-2 font-medium hover:bg-gray-100">
               Saved Sellers
            </div>
            <div className="rounded-xl p-2 font-medium hover:bg-gray-100">
               Messages
            </div>
         </div>
         <span>My eBay</span>
         <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <g clipPath="url(#clip0_1_72)">
               <path
                  d="M5.37993 5.00005C5.31412 5.00045 5.24888 4.98785 5.18796 4.96297C5.12704 4.93809 5.07163 4.90141 5.02493 4.85505L1.02693 0.857046C0.932777 0.762894 0.879883 0.635197 0.879883 0.502046C0.879883 0.368895 0.932777 0.241198 1.02693 0.147046C1.12108 0.052894 1.24878 0 1.38193 0C1.51508 0 1.64278 0.052894 1.73693 0.147046L5.37993 3.79555L9.02343 0.147046C9.11758 0.052894 9.24528 4.29757e-09 9.37843 5.28962e-09C9.51158 6.28167e-09 9.63928 0.052894 9.73343 0.147046C9.82758 0.241198 9.88047 0.368895 9.88047 0.502046C9.88047 0.635197 9.82758 0.762894 9.73343 0.857046L5.73493 4.85505C5.68822 4.90141 5.63282 4.93809 5.5719 4.96297C5.51097 4.98785 5.44574 5.00045 5.37993 5.00005Z"
                  fill="black"
               />
            </g>
            <defs>
               <clipPath id="clip0_1_72">
                  <rect
                     width="9"
                     height="5"
                     fill="white"
                     transform="translate(0.879883)"
                  />
               </clipPath>
            </defs>
         </svg>
      </div>
   )
}

export default MyEbay
