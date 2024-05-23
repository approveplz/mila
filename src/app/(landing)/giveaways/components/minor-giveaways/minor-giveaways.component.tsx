'use client'

import { messages } from "@/shared/constants/messages";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { HiMiniArrowRight } from "react-icons/hi2";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Timer } from "@/components/common/timer/timer.component";

export function MinorGiveaways() {
  const { minorGiveways: {
    title,
    cards
  } } = messages;

  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <section className={`sm:py-20 px-6 flex flex-col justify-center w-full items-center gap-12 ${isMobile ? 'bg-[#F3F3F3]' : 'bg-white'}`}>

      <div className={`font-tt-ramillas font-normal text-[30px] sm:text-5xl leading-9 sm:leading-[57.6px] ${isMobile ? 'text-[#171614]' : 'text-primary'}`}>
        {title}
      </div>

      <div className="max-w-full flex flex-col gap-3 items-center">
        {!isMobile ? <div className="grid grid-cols-4 gap-6">
          {cards?.map((card, index) => (
            <div key={index} className="relative flex-shrink-0 shadow-lg rounded-[30px] w-[310px] flex flex-col gap-4">

              <div className="absolute bg-white rounded-full px-2 top-4 right-4 ">
                <div className="font-semibold text-base leading-6">
                  {card?.entry}
                </div>
              </div>

              <Image
                src="/images/bagpack-2.jpeg"
                alt="bagpack"
                layout="responsive"
                width={240}
                height={210}
                className="w-full h-full !rounded-t-[30px]"
              />

              <div className="flex flex-col gap-6 px-6 pb-6">
                <div className="flex flex-col gap-4">
                  <div className="font-extrabold text-[32px] leading-[26px] text-[#171614]">
                    YETI
                  </div>

                  <div className="font-semibold text-base leading-6 text-[#6B7280]">
                    Backpack
                  </div>
                </div>

                <Timer
                  containerClass="flex flex-row gap-2"
                  boxClass="w-[34px] h-[34px] rounded-lg bg-[#6B7280] flex flex-row items-center justify-center"
                  textClass="text-[14px] leading-[20px] font-semibold text-white"
                  labelClass=""
                  labelPosition="none"
                />


                <div className="font-normal text-[14px] leading-[20px] text-[#171614]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </div>
              </div>
            </div>
          ))}
        </div> :

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
            {cards?.map((card, index) => (
              <SwiperSlide key={index} className="rounded-[20px]">
                <div key={index} className="relative overflow-hidden flex-shrink-0 shadow-lg rounded-[20px] flex flex-col gap-6 border border-[#9CA3AF]">

                  <div className="z-10 opacity-[0.08] absolute bg-[url('/images/giveaway-bg.png')] w-full h-full">

                  </div>




                  <div className="absolute bg-white rounded-full px-2 top-4 left-[10px]">
                    <div className="font-semibold text-base leading-6">
                      {card?.entry}
                    </div>
                  </div>

                  <Image
                    src="/images/bagpack-2.jpeg"
                    alt="bagpack"
                    layout="responsive"
                    width={240}
                    height={210}
                    className="w-full !h-[328px] !rounded-t-[20px]"
                  />

                  <div className="z-20 flex flex-col gap-6 px-6 pb-6">
                    <div className="bg-[#D1D5DB] border border-[#9CA3AF] px-2 rounded-[16px] w-fit">
                      <div className="font-semibold text-base leading-6">MINOR</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="font-black text-[32px] leading-[26px] text-[#171614]">
                        YETI
                      </div>

                      <div className="font-semibold text-base leading-6 text-[#6B7280]">
                        Backpack
                      </div>
                    </div>

                    <div className="flex flex-row gap-2">
                      <div className="w-[34px] h-[34px] rounded-lg bg-[#D1D5DB] flex flex-row items-center justify-center">
                        <div className="text-[14px] leading-[20px] font-semibold text-[#171614]">
                          00
                        </div>
                      </div>
                      <div className="w-[34px] h-[34px] rounded-lg bg-[#D1D5DB] flex flex-row items-center justify-center">
                        <div className="text-[14px] leading-[20px] font-semibold text-[#171614]">
                          00
                        </div>
                      </div>
                      <div className="w-[34px] h-[34px] rounded-lg bg-[#D1D5DB] flex flex-row items-center justify-center">
                        <div className="text-[14px] leading-[20px] font-semibold text-[#171614]">
                          00
                        </div>
                      </div>
                      <div className="w-[34px] h-[34px] rounded-lg bg-[#D1D5DB] flex flex-row items-center justify-center">
                        <div className="text-[14px] leading-[20px] font-semibold text-[#171614]">
                          00
                        </div>
                      </div>
                    </div>


                    {!isCollapsed && <div className="font-normal text-[14px] leading-[20px] text-[#171614]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                    </div>}

                    {isCollapsed ? <div className="font-semibold text-base leading-[24px] underline" onClick={toggleCollapse}> See more </div> :
                      <div className="font-semibold text-base leading-[24px] underline" onClick={toggleCollapse}> See less</div>}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        }


      </div>
      {!isMobile && <div className="hidden sm:flex flex-row gap-2 items-center">
        <HiMiniArrowLeft className="w-[20px] font-bold cursor-pointer" />

        <div className="text-base leading-6 font-normal text-[#171614] rounded-lg border border-[#171614] px-2 py-1">
          01
        </div>

        <HiMiniArrowRight className="w-[20px] font-bold cursor-pointer" />

      </div>}

    </section>
  )
}
