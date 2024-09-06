import Link from 'next/link'
import React from 'react'
import HomeSlider from './Slider'
import ExploreCategories from './ExploreCategories'

interface Props {}

const HomePage = (props: Props) => {
   return (
      <div className="w-full">
         <div className="flex h-8 w-full items-center justify-center gap-3 whitespace-nowrap px-5 text-xs text-[#555]">
            <Link href={'#'}>Explore (New!)</Link>
            <Link href={'#'}>Saved</Link>
            <Link href={'#'}>Electronics</Link>
            <Link href={'#'}>Motors</Link>
            <Link href={'#'}>Fashion</Link>
            <Link href={'#'}>Collectibles and Art</Link>
            <Link href={'#'}>Sports</Link>
            <Link href={'#'}>Health & Beauty</Link>
            <Link href={'#'}>Industrial equipment</Link>
            <Link href={'#'}>Home & Garden</Link>
            <Link href={'#'}>Deals</Link>
            <Link href={'#'}>Sell</Link>
         </div>
         <HomeSlider />
         <ExploreCategories />
      </div>
   )
}

export default HomePage
