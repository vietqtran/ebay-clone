import ExploreCategories from './ExploreCategories'
import HomeSlider from './Slider'
import LastBanner from './LastBanner'
import Link from 'next/link'
import React from 'react'
import RecentlyView from './RecentlyView'
import RecommendCategory from './RecommendCategory'
import RecommendSeller from './RecommendSeller'
import Searched from './Searched'

interface Props {}

const HomePage = (props: Props) => {
   return (
      <div className="w-full">
         <div className="hide-scrollbar flex h-8 w-full items-center justify-start gap-3 overflow-auto whitespace-nowrap px-5 text-xs text-[#555] lg:justify-center">
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
         <RecentlyView />
         <Searched />
         <ExploreCategories />
         <RecommendSeller />
         <RecommendCategory />
         <LastBanner />
      </div>
   )
}

export default HomePage
