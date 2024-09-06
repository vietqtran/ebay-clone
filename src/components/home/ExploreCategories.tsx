'use client'

import Image from 'next/image'
import React from 'react'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {}

const ExploreCategories = (props: Props) => {
   return (
      <div className="container mx-auto mb-10 w-full max-w-7xl px-5">
         <div className="mb-6 w-full">
            <h2 className="text-2xl font-semibold">Trending on eBay</h2>
         </div>
         <Swiper
            spaceBetween={16}
            slidesPerView={'auto'}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper relative hover:cursor-grab active:cursor-grabbing"
         >
            <SwiperSlide className="!w-fit">
               <CategoryItem />
            </SwiperSlide>
            <SwiperSlide className="!w-fit">
               <CategoryItem />
            </SwiperSlide>
            <SwiperSlide className="!w-fit">
               <CategoryItem />
            </SwiperSlide>
            <SwiperSlide className="!w-fit">
               <CategoryItem />
            </SwiperSlide>
            <SwiperSlide className="!w-fit">
               <CategoryItem />
            </SwiperSlide>
            <SwiperSlide className="!w-fit">
               <CategoryItem />
            </SwiperSlide>
            <SwiperSlide className="!w-fit">
               <CategoryItem />
            </SwiperSlide>
            <SwiperSlide className="!w-fit">
               <CategoryItem />
            </SwiperSlide>
            <SwiperSlide className="!w-fit">
               <CategoryItem />
            </SwiperSlide>
         </Swiper>
      </div>
   )
}

const CategoryItem = () => {
   return (
      <div className="flex h-[216px] w-[164px] flex-col items-center justify-between">
         <div className="aspect-square w-full">
            <Image
               width={500}
               height={500}
               priority
               className="h-full w-full object-contain"
               src="/images/home/category-luxury.png"
               alt="category"
            />
         </div>
         <span className="font-semibold">Luxury</span>
      </div>
   )
}

export default ExploreCategories
