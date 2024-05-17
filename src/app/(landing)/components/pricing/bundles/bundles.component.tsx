'use client'
import { HiArrowUpRight } from "react-icons/hi2";
import { messages } from "@/shared/constants/messages";
import { useEffect, useState } from "react";
import { BundleCard } from "./card.component";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';


export function Bundle() {

  const { pricing: {
    bundleData: {
      bundleA,
      bundleB,
      bundleC,
      bundleD,
      bundleE,
      bundleF,
      clear
    },
    continueWithSelected
  } } = messages;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <section className="flex flex-col items-center gap-12 bg-[#F3F3F3] mt-12">
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="font-medium text-primary text-lg leading-7">
          {clear}
        </div>
        {isMobile ?
          <Swiper
            style={{
              paddingBottom: "48px"
            }}
            slidesPerView={1.2}
            pagination={{ clickable: true }}
            spaceBetween={16}
            modules={[Pagination]}
            className="mySwiper"
          >

            <SwiperSlide className="rounded-[24px]">
              <BundleCard cardData={bundleA} />
            </SwiperSlide>
            <SwiperSlide className="rounded-[24px] w-[334px]">
              <BundleCard cardData={bundleB} />
            </SwiperSlide>
            <SwiperSlide className="rounded-[24px] w-[334px]">
              <BundleCard cardData={bundleC} />
            </SwiperSlide>
            <SwiperSlide className="rounded-[24px] w-[334px]">
              <BundleCard cardData={bundleD} />
            </SwiperSlide>
            <SwiperSlide className="rounded-[24px] w-[334px]">
              <BundleCard cardData={bundleE} />
            </SwiperSlide>
            <SwiperSlide className="rounded-[24px] w-[334px]">
              <BundleCard cardData={bundleF} />
            </SwiperSlide>

          </Swiper>
          : <div className="grid grid-cols-3 gap-8">
            <BundleCard cardData={bundleA} />
            <BundleCard cardData={bundleB} />
            <BundleCard cardData={bundleC} />
            <BundleCard cardData={bundleD} />
            <BundleCard cardData={bundleE} />
            <BundleCard cardData={bundleF} />
          </div>}

      </div>

      <div className="bg-[#171614] py-3 px-6 items-center rounded-[30px] cursor-pointer flex flex-row gap-2">
        <span className="font-medium text-white text-base leading-6">{continueWithSelected} </span> <HiArrowUpRight size={24} color="white" />
      </div>
    </section>
  )
}