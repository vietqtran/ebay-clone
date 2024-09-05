import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
   return (
      <footer className="bg-[#f7f7f7] text-xs py-3 px-8 border-t-[1px] border-t-[#cccccc] w-full">
         <div className="w-full container mx-auto max-w-[1268px]">
            <div className="size-full md:flex hidden mb-16 items-start justify-between">
               <div className="flex flex-col gap-5 pt-2">
                  <div className="flex flex-col gap-3">
                     <h3 className="font-semibold">Buy</h3>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Registration
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        eBay Money Back Guarantee
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Bidding & buying help
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Stores
                     </Link>
                  </div>
               </div>
               <div className="flex flex-col gap-10 pt-2">
                  <div className="flex flex-col gap-3">
                     <h3 className="font-semibold">Sell</h3>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Start selling
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Learn to sell
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Affiliates
                     </Link>
                  </div>
                  <div className="flex flex-col gap-3">
                     <h3 className="font-semibold">Tools & apps</h3>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Developers
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        eBay Money Back Guarantee
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Security center
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Site map
                     </Link>
                  </div>
               </div>
               <div className="flex flex-col gap-5 pt-2">
                  <div className="flex flex-col gap-3">
                     <h3 className="font-semibold">Stay connected</h3>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        eBay's Blogs
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        <svg
                           className="mr-1 mb-0.5 size-4 inline"
                           fill="#707070"
                           width="800px"
                           height="800px"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg"
                           data-name="Layer 1"
                        >
                           <path d="M20.9,2H3.1A1.1,1.1,0,0,0,2,3.1V20.9A1.1,1.1,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H17.3c-1.26,0-1.5.6-1.5,1.47v1.93h3l-.39,3H15.8V22h5.1A1.1,1.1,0,0,0,22,20.9V3.1A1.1,1.1,0,0,0,20.9,2Z" />
                        </svg>
                        Facebook
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        <svg
                           className="mr-1 mb-0.5 size-[18px] inline"
                           fill="#707070"
                           width="800px"
                           height="800px"
                           viewBox="-1.5 0 19 19"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M15.917 1.666v15.833H.083V1.666zM13.743 6.02a4.702 4.702 0 0 1-1.353.37 2.365 2.365 0 0 0 1.036-1.303 4.725 4.725 0 0 1-1.496.572 2.359 2.359 0 0 0-4.017 2.149 6.685 6.685 0 0 1-4.856-2.462 2.357 2.357 0 0 0 .728 3.146 2.339 2.339 0 0 1-1.067-.295v.03a2.359 2.359 0 0 0 1.89 2.311 2.362 2.362 0 0 1-1.064.04 2.36 2.36 0 0 0 2.202 1.637 4.733 4.733 0 0 1-2.928 1.01 4.838 4.838 0 0 1-.562-.034 6.702 6.702 0 0 0 10.318-5.647c0-.102-.002-.203-.007-.304a4.785 4.785 0 0 0 1.176-1.22z" />
                        </svg>
                        Twitter
                     </Link>
                  </div>
               </div>
               <div className="flex flex-col gap-5 pt-2">
                  <div className="flex flex-col gap-3">
                     <h3 className="font-semibold">About eBay</h3>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Company info
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        News
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Investors
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Careers
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Government relations
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Advertise with us
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Policies
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Verified Rights Owner (VeRO) Program
                     </Link>
                  </div>
               </div>
               <div className="flex flex-col gap-10 pt-2">
                  <div className="flex flex-col gap-3">
                     <h3 className="font-semibold">Help & Contact</h3>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Seller Information Center
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Contact us
                     </Link>
                  </div>
                  <div className="flex flex-col gap-3">
                     <h3 className="font-semibold">Community</h3>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Announcements
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        Discussion boards
                     </Link>
                     <Link
                        href={'#'}
                        className="text-[#707070] hover:underline hover:cursor-pointer"
                     >
                        eBay Giving Works
                     </Link>
                  </div>
               </div>
            </div>

            <div className="size-full md:hidden mb-10 flex items-center gap-x-10 gap-y-3 pt-10 whitespace-nowrap flex-wrap">
               <Link
                  href={'#'}
                  className="text-[#707070] hover:underline hover:cursor-pointer"
               >
                  About eBay
               </Link>
               <Link
                  href={'#'}
                  className="text-[#707070] hover:underline hover:cursor-pointer"
               >
                  Announcements
               </Link>
               <Link
                  href={'#'}
                  className="text-[#707070] hover:underline hover:cursor-pointer"
               >
                  Community
               </Link>
               <Link
                  href={'#'}
                  className="text-[#707070] hover:underline hover:cursor-pointer"
               >
                  Security Center
               </Link>
               <Link
                  href={'#'}
                  className="text-[#707070] hover:underline hover:cursor-pointer"
               >
                  Seller Information Center
               </Link>
               <Link
                  href={'#'}
                  className="text-[#707070] hover:underline hover:cursor-pointer"
               >
                  Policies
               </Link>
               <Link
                  href={'#'}
                  className="text-[#707070] hover:underline hover:cursor-pointer"
               >
                  Affiliates
               </Link>
               <Link
                  href={'#'}
                  className="text-[#707070] hover:underline hover:cursor-pointer"
               >
                  Help & Contact
               </Link>
               <Link
                  href={'#'}
                  className="text-[#707070] hover:underline hover:cursor-pointer"
               >
                  Site Map
               </Link>
            </div>

            <div className="w-full pb-10 text-[#707070] text-[11px]">
               <span className="font-semibold text-black">
                  Copyright © 1995-2024 eBay Inc. All Rights Reserved.
               </span>
               {` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  Accessibility
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  User Agreement
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  Privacy
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  User Agreement
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  Consumer Health Data
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  Payments Terms of Use
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  Cookies
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  CA Privacy Notice
               </Link>
               ,{` `}
               <Link
                  href={'#'}
                  className="text-[#707070] underline hover:cursor-pointer"
               >
                  Your Privacy Choices and AdChoice
               </Link>
            </div>
         </div>
      </footer>
   )
}

export default Footer
