'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import { useWidth } from '@/hooks';




export function Promotions() {

  const { width } = useWidth();

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

          <SwiperSlide className='relative'>
            <Image
              src={width > 640 ? "/images/BannerAmaraSacs(desktop).jpg" : '/images/BannerAmaraSacs(mobile).jpg'}
              alt="promotions"
              layout="fill"
              className={`w-full object-cover`}
            />
          </SwiperSlide>

          <SwiperSlide className='relative'>
            <Image
              src={width > 640 ? "/images/BannerRevival(Desktop).jpg" : '/images/BannerRevival(mobile).jpg'}
              alt="promotions"
              layout="fill"
              className={`w-full object-cover`}
            />
          </SwiperSlide>
        </Swiper>

        <button className="hidden sm:flex arrow-left absolute top-[124px] z-20 left-6 p-2 bg-[#FFFFFF] shadow-lg rounded-full"><HiArrowSmallLeft size={24} /></button>
        <button className="hidden sm:flex arrow-right absolute top-[124px] z-20 right-6 p-2 bg-[#FFFFFF] shadow-lg rounded-full"><HiArrowSmallRight size={24} /></button>
      </div>

    </section>
  )
}
