'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import { FreeMode } from 'swiper/modules'
import Link from 'next/link'
import React from 'react'
import SellerPreviewCard from '../common/Seller/SellerPreviewCard'

type Props = {}

const RecommendSeller = (props: Props) => {
   return (
      <div className="container mx-auto mb-10 w-full max-w-7xl px-5">
         <div className="mb-6 flex w-full items-center justify-start">
            <Link href={'#'} className="text-2xl font-semibold hover:underline">
               Recommend Seller
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
                     slidesPerView: 1.6
                  },
                  1024: {
                     slidesPerView: 3
                  }
               }}
               className="mySwiper relative w-full hover:cursor-grab active:cursor-grabbing"
            >
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
               <SwiperSlide>
                  <SellerPreviewCard />
               </SwiperSlide>
            </Swiper>
         </div>
      </div>
   )
}

export default RecommendSeller
