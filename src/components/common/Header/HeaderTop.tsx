import Link from 'next/link'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'

type Props = {}

const HeaderTop = (props: Props) => {
   return (
      <div className="w-full whitespace-nowrap border-b-[1px] border-b-neutral-200 px-4 xl:px-0">
         <div className="container mx-auto flex w-full max-w-[1248px] items-center justify-between gap-10">
            <div className="flex h-8 items-center gap-6">
               <div className="flex items-center gap-1 text-xs">
                  <span>Hi!</span>
                  <Link href={'/signin'} className="text-link">
                     Sign in
                  </Link>
                  <span className="hidden md:block"> or </span>
                  <Link className="text-link hidden md:block" href={'/signin'}>
                     Register
                  </Link>
               </div>
               <div className="hidden text-xs md:block">
                  <Link href={'#'}>Daily Deals</Link>
               </div>
               <div className="hidden text-xs md:block">
                  <Link href={'#'}>Help & Contact</Link>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex cursor-pointer items-center gap-1 text-xs">
                  <ReactCountryFlag
                     style={{
                        fontSize: '2em'
                     }}
                     countryCode="VN"
                     svg
                  />
                  <span>Ship to</span>
               </div>
               <div className="hidden cursor-pointer text-xs md:block">
                  <Link href={'#'}>Sell</Link>
               </div>
               <div className="hidden items-center gap-1 text-xs md:flex">
                  <span>Watchlist</span>
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
               <div className="flex items-center gap-1 text-xs">
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
               <div className="flex items-center">
                  <div className="hidden w-11 cursor-pointer items-center justify-center md:flex">
                     <svg
                        width="24"
                        height="20"
                        viewBox="0 0 24 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fillRule="evenodd"
                           clipRule="evenodd"
                           d="M8.99993 6.98212C9.00956 4.78121 10.7967 3 12.9999 3C15.2031 3 16.9902 4.78121 16.9999 6.98213C16.9997 6.98808 16.9997 6.99403 16.9997 7V9.66154C16.9997 10.0605 17.1058 10.4523 17.3071 10.7968L18.9593 13.6241C19.0567 13.7908 18.9365 14.0002 18.7434 14.0002L13.0003 14L7.25633 14.0002C7.0633 14.0002 6.94308 13.7908 7.04048 13.6241L8.69271 10.7968C8.894 10.4523 9.00009 10.0605 9.00009 9.66154V7C9.00009 6.99403 9.00003 6.98807 8.99993 6.98212ZM7.00009 7C7.00009 3.68629 9.68618 1 12.9999 1C16.3136 1 18.9999 3.68629 18.9999 7L18.9997 9.66154C18.9997 9.70587 19.0115 9.7494 19.0338 9.78768L20.6861 12.615C21.5626 14.115 20.4807 16.0003 18.7434 16.0002L15.9999 16.0001C15.9998 17.6569 14.6567 19 12.9999 19C11.3431 19 9.99996 17.6569 9.99989 16.0001L7.25642 16.0002C5.51907 16.0003 4.43714 14.115 5.3137 12.615L6.96593 9.78768C6.9883 9.7494 7.00009 9.70587 7.00009 9.66154V7ZM11.9999 16H12.9997H13.9999C13.9999 16.5523 13.5522 17 12.9999 17C12.4476 17 11.9999 16.5523 11.9999 16Z"
                           fill="#191919"
                        />
                     </svg>
                  </div>
                  <div className="flex w-11 cursor-pointer items-center justify-center">
                     <div className="flex w-11 items-center justify-center">
                        <svg
                           width="24"
                           height="21"
                           viewBox="0 0 24 21"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <g clip-path="url(#clip0_1_92)">
                              <path
                                 fillRule="evenodd"
                                 clipRule="evenodd"
                                 d="M4.23628 4.49999H3C2.44771 4.49999 2 4.05228 2 3.49999C2 2.94771 2.44771 2.49999 3 2.49999H4.96947C5.42767 2.48561 5.85407 2.79636 5.96967 3.25462L6.85471 6.49975H19C19.6537 6.49975 20.1411 7.14595 19.9615 7.77447L18.376 13.3239C18.008 14.6118 16.8308 15.4998 15.4914 15.4998H9.5276C8.17475 15.4998 6.98927 14.5943 6.63331 13.2891L4.23628 4.49999ZM8.56284 12.7629L7.40017 8.49975H17.6743L16.4529 12.7745C16.3303 13.2038 15.9379 13.4998 15.4914 13.4998H9.5276C9.07665 13.4998 8.68149 13.1979 8.56284 12.7629Z"
                                 fill="#191919"
                              />
                              <path
                                 d="M10 19C10 19.8284 9.32843 20.5 8.5 20.5C7.67157 20.5 7 19.8284 7 19C7 18.1716 7.67157 17.5 8.5 17.5C9.32843 17.5 10 18.1716 10 19Z"
                                 fill="#191919"
                              />
                              <path
                                 d="M16.5 20.5C17.3284 20.5 18 19.8284 18 19C18 18.1716 17.3284 17.5 16.5 17.5C15.6716 17.5 15 18.1716 15 19C15 19.8284 15.6716 20.5 16.5 20.5Z"
                                 fill="#191919"
                              />
                           </g>
                           <defs>
                              <clipPath id="clip0_1_92">
                                 <rect
                                    width="23"
                                    height="20"
                                    fill="white"
                                    transform="translate(0.5 0.5)"
                                 />
                              </clipPath>
                           </defs>
                        </svg>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeaderTop
