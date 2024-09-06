'use client'

import React from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'

interface Props {}

const HomeSlider = (props: Props) => {
   return (
      <div className="container mx-auto mb-10 h-[350px] w-full max-w-[1330px] md:h-[330px]">
         <Swiper
            centeredSlides={true}
            loop={true}
            autoplay={{
               delay: 2200,
               disableOnInteraction: true
            }}
            navigation={{
               enabled: true,
               prevEl: '.prev-home-slider',
               nextEl: '.next-home-slider'
            }}
            modules={[Navigation, Autoplay]}
            id="home-slider"
            className="mySwiper relative size-full xl:rounded-xl"
         >
            <div
               style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px' }}
               className="prev-home-slider absolute left-4 top-1/2 z-10 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white duration-75 ease-linear hover:scale-105 active:scale-95"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-4"
               >
                  <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
               </svg>
            </div>
            <div
               style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px' }}
               className="prev-home-slider absolute right-4 top-1/2 z-10 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white duration-75 ease-linear hover:scale-105 active:scale-95"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-4"
               >
                  <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
               </svg>
            </div>
            <SwiperSlide>
               <div className="flex size-full flex-col items-center justify-center md:flex-row">
                  <div className="h-full w-full bg-red-500 px-8 py-4 pr-10 text-left md:h-full md:w-[330px] xl:w-[400px]">
                     <h2 className="text-xl font-semibold text-black md:text-4xl">
                        Reawaken your passion for collections
                     </h2>
                     <h4 className="my-2 text-black md:mb-5 md:mt-3">
                        Explore a variety of unique cards on eBay.
                     </h4>
                     <button className="hidden rounded-full border-[1px] border-black bg-transparent px-5 py-2 text-black duration-100 ease-linear hover:bg-black hover:text-white md:block">
                        Find yours
                     </button>
                     <button className="flex items-center gap-3 bg-transparent text-black md:hidden">
                        <span>Find yours</span>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke-width="1.5"
                           stroke="currentColor"
                           className="size-6"
                        >
                           <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                           />
                        </svg>
                     </button>
                  </div>
                  <div className="w-full md:size-full md:flex-1">
                     <Image
                        priority
                        src={'/images/home/home-slider-1.webp'}
                        alt="home-slider-1"
                        className="size-full object-cover"
                        width={1000}
                        height={1000}
                     />
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex size-full flex-col items-center justify-center md:flex-row">
                  <div className="h-full w-full bg-blue-500 px-8 py-4 pr-10 text-left md:h-full md:w-[330px] xl:w-[400px]">
                     <h2 className="text-xl font-semibold text-black md:text-4xl">
                        Reawaken your passion for collections
                     </h2>
                     <h4 className="my-2 text-black md:mb-5 md:mt-3">
                        Explore a variety of unique cards on eBay.
                     </h4>
                     <button className="hidden rounded-full border-[1px] border-black bg-transparent px-5 py-2 text-black duration-100 ease-linear hover:bg-black hover:text-white md:block">
                        Find yours
                     </button>
                     <button className="flex items-center gap-3 bg-transparent text-black md:hidden">
                        <span>Find yours</span>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke-width="1.5"
                           stroke="currentColor"
                           className="size-6"
                        >
                           <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                           />
                        </svg>
                     </button>
                  </div>
                  <div className="w-full md:size-full md:flex-1">
                     <Image
                        priority
                        src={'/images/home/home-slider-2.webp'}
                        alt="home-slider-2"
                        className="size-full object-cover"
                        width={1000}
                        height={1000}
                     />
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex size-full flex-col items-center justify-center md:flex-row">
                  <div className="h-full w-full bg-green-500 px-8 py-4 pr-10 text-left md:h-full md:w-[330px] xl:w-[400px]">
                     <h2 className="text-xl font-semibold text-black md:text-4xl">
                        Reawaken your passion for collections
                     </h2>
                     <h4 className="my-2 text-black md:mb-5 md:mt-3">
                        Explore a variety of unique cards on eBay.
                     </h4>
                     <button className="hidden rounded-full border-[1px] border-black bg-transparent px-5 py-2 text-black duration-100 ease-linear hover:bg-black hover:text-white md:block">
                        Find yours
                     </button>
                     <button className="flex items-center gap-3 bg-transparent text-black md:hidden">
                        <span>Find yours</span>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke-width="1.5"
                           stroke="currentColor"
                           className="size-6"
                        >
                           <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                           />
                        </svg>
                     </button>
                  </div>
                  <div className="w-full md:size-full md:flex-1">
                     <Image
                        priority
                        src={'/images/home/home-slider-1.webp'}
                        alt="home-slider-1"
                        className="size-full object-cover"
                        width={1000}
                        height={1000}
                     />
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex size-full flex-col items-center justify-center md:flex-row">
                  <div className="h-full w-full bg-yellow-500 px-8 py-4 pr-10 text-left md:h-full md:w-[330px] xl:w-[400px]">
                     <h2 className="text-xl font-semibold text-black md:text-4xl">
                        Reawaken your passion for collections
                     </h2>
                     <h4 className="my-2 text-black md:mb-5 md:mt-3">
                        Explore a variety of unique cards on eBay.
                     </h4>
                     <button className="hidden rounded-full border-[1px] border-black bg-transparent px-5 py-2 text-black duration-100 ease-linear hover:bg-black hover:text-white md:block">
                        Find yours
                     </button>
                     <button className="flex items-center gap-3 bg-transparent text-black md:hidden">
                        <span>Find yours</span>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke-width="1.5"
                           stroke="currentColor"
                           className="size-6"
                        >
                           <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                           />
                        </svg>
                     </button>
                  </div>
                  <div className="w-full md:size-full md:flex-1">
                     <Image
                        priority
                        src={'/images/home/home-slider-2.webp'}
                        alt="home-slider-2"
                        className="size-full object-cover"
                        width={1000}
                        height={1000}
                     />
                  </div>
               </div>
            </SwiperSlide>
         </Swiper>
      </div>
   )
}

export default HomeSlider
