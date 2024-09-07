'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import { FreeMode } from 'swiper/modules'
import Link from 'next/link'
import ProductCard from '../common/Product/ProductCard'
import React from 'react'

type Props = {}

const RecommendCategory = (props: Props) => {
   return (
      <div className="container mx-auto mb-10 w-full max-w-7xl px-5">
         <div className="mb-6 flex w-full items-center justify-between">
            <div className="flex flex-col items-start">
               <Link
                  href={'#'}
                  className="text-2xl font-semibold hover:underline"
               >
                  Cell Phone Chargers & Holders
               </Link>
               <span className="text-sm text-[#707070]">
                  Recommended for you
               </span>
            </div>
            <Link href={'#'} className="text-sm underline hover:opacity-70">
               See all
            </Link>
         </div>
         <div className="mt-5 w-full">
            <Swiper
               spaceBetween={16}
               slidesPerView={4.5}
               freeMode={true}
               modules={[FreeMode]}
               breakpoints={{
                  0: {
                     slidesPerView: 2.5
                  },
                  1024: {
                     slidesPerView: 4.5
                  }
               }}
               className="mySwiper relative w-full hover:cursor-grab active:cursor-grabbing"
            >
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
               <SwiperSlide>
                  <ProductCard />
               </SwiperSlide>
            </Swiper>
         </div>
      </div>
   )
}

export default RecommendCategory
