'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";




export function Promotions() {

  return (
    <section>
      <div className="h-[267px] relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
          modules={[Pagination, Navigation]}
          className="promotions"
        >
          {[1, 2, 3, 4].map(item => (
            <SwiperSlide key={item} className='relative'>

              <div className='sm:absolute flex sm:flex-col flex-row justify-center items-center gap-2 w-full sm:w-[174px] sm:h-[223px] bg-[#171614] py-[22px] px-6 sm:py-6 sm:px-8 sm:rounded-[24px] sm:top-6 sm:right-28'>
                <div className='font-tt-ramillas text-2xl text-[#FFFFFF]'>ITALIC</div>
                <div className='font-normal leading-[26px] text-[19px] sm:leading-8 sm:text-2xl text-[#FFFFFF]'>UPTO</div>
                <div className='font-black text-[38.79px] leading-[38.79px] sm:text-5xl sm:leading-[48px] text-[#FFFFFF]'>50% OFF</div>
              </div>

              <Image
                src="/images/promotions.png"
                alt="promotions"
                // layout="cover"
                width={319}
                height={267}
                className={`w-full`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="hidden sm:flex arrow-left absolute top-[124px] z-20 left-6 p-2 bg-[#FFFFFF] shadow-lg rounded-full"><HiArrowSmallLeft size={24} /></button>
        <button className="hidden sm:flex arrow-right absolute top-[124px] z-20 right-6 p-2 bg-[#FFFFFF] shadow-lg rounded-full"><HiArrowSmallRight size={24} /></button>
      </div>

    </section>
  )
}
