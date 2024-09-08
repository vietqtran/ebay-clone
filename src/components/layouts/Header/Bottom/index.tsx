'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ShopByCategory from './ShopByCategory'

type Props = {}

const HeaderBottom = (props: Props) => {
   const [searchValue, setSearchValue] = React.useState('')
   return (
      <div className="z-10 px-4 pb-1.5 pt-3 xl:px-0">
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
               <ShopByCategory />
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
                  className="hidden h-full min-w-40 cursor-pointer items-center justify-between border-l-[1px] border-l-[#c7c7c7] md:flex"
               >
                  <select
                     name="category"
                     className="line-clamp-1 h-full w-[90%] max-w-40 truncate px-4 text-xs text-[#6D6D6D] focus:outline-none"
                  >
                     <option value="0">All Categories</option>
                     <option value="20081">Antiques</option>
                     <option value="550">Art</option>
                     <option value="2984">Baby</option>
                     <option value="267">Books</option>
                     <option value="12576">Business &amp; Industrial</option>
                     <option value="625">Cameras &amp; Photo</option>
                     <option value="15032">
                        Cell Phones &amp; Accessories
                     </option>
                     <option value="11450">
                        Clothing, Shoes &amp; Accessories
                     </option>
                     <option value="11116">Coins &amp; Paper Money</option>
                     <option value="1">Collectibles</option>
                     <option value="58058">
                        Computers/Tablets &amp; Networking
                     </option>
                     <option value="293">Consumer Electronics</option>
                     <option value="14339">Crafts</option>
                     <option value="237">Dolls &amp; Bears</option>
                     <option value="11232">DVDs &amp; Movies</option>
                     <option value="6000">eBay Motors</option>
                     <option value="45100">Entertainment Memorabilia</option>
                     <option value="172008">Gift Cards &amp; Coupons</option>
                     <option value="26395">Health &amp; Beauty</option>
                     <option value="11700">Home &amp; Garden</option>
                     <option value="281">Jewelry &amp; Watches</option>
                     <option value="11233">Music</option>
                     <option value="619">Musical Instruments &amp; Gear</option>
                     <option value="1281">Pet Supplies</option>
                     <option value="870">Pottery &amp; Glass</option>
                     <option value="10542">Real Estate</option>
                     <option value="316">Specialty Services</option>
                     <option value="888">Sporting Goods</option>
                     <option value="64482">
                        Sports Mem, Cards &amp; Fan Shop
                     </option>
                     <option value="260">Stamps</option>
                     <option value="1305">Tickets &amp; Experiences</option>
                     <option value="220">Toys &amp; Hobbies</option>
                     <option value="3252">Travel</option>
                     <option value="1249">Video Games &amp; Consoles</option>
                     <option value="99">Everything Else</option>
                  </select>
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
