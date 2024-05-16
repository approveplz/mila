'use client'
import { messages } from "@/shared/constants/messages";
import { Gift } from "@phosphor-icons/react";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';


export function MajorGiveaways() {
  const { majorGiveaways: {
    heading, subHeading, day, hrs, min, sec, cards
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
    <section className={`${isMobile ? '!py-[33px]' : 'py-[66px]'} py-[66px] ${isMobile ? 'px-6' : 'px-16'} flex flex-col items-center gap-12 bg-[#F3F3F3]`}>

      <div className="font-tt-ramillas text-center font-normal text-4xl sm:text-5xl leading-[43.2px] sm:leading-[57.6px] text-[#171614] px-[50px] sm:px-[410px]">
        {heading}
      </div>

      <div className="font-tt-ramillas text-primary font-normal text-[30px] sm:text-5xl leading-9 sm:leading-[57.6px]">
        {subHeading}
      </div>

      {isMobile &&
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
              <div
                className="relative bg-white flex flex-col items-left sm:flex-row rounded-[20px]"
                style={{
                  boxShadow:
                    '0px 4px 6px -2px rgba(0, 0, 0, 0.13), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Image
                  src="/images/bagpack-2.jpeg"
                  alt="bagpack"
                  layout="responsive"
                  width={319}
                  height={280}
                  className={`max-w-[319px] max-h-[280px] !rounded-t-[20px]`}
                />

                <div className="absolute top-4 left-4 flex flex-row gap-2 bg-[#EFECE5] py-2 px-4 rounded-[20px]">
                  <Gift size={24} color="#B06E6A" />
                  <div className="font-semibold text-base leading text-primary">
                    {card?.entry}
                  </div>
                </div>

                <div className="py-8 px-6 flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-[30px] leading-9 text-[#171614]">
                      {card?.title}
                    </div>
                    <div className="font-normal text-lg leading-[28px]">
                      {card?.description}
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div>

                      <div className="flex flex-row gap-4">
                        <div className=" flex flex-col gap-[6px]  items-center justify-center">
                          <div className="text-[30px] leading-9 font-semibold text-[#171614] rounded-lg bg-white border border-[#171614] p-[6.43px]">
                            00
                          </div>

                          <div className="font-normal text-lg leading-7">
                            {day}
                          </div>
                        </div>

                        <div className=" flex flex-col gap-[6px]  items-center justify-center">
                          <div className="text-[30px] leading-9 font-semibold text-[#171614] rounded-lg bg-white border border-[#171614] p-[6.43px]">
                            00
                          </div>

                          <div className="font-normal text-lg leading-7">
                            {hrs}
                          </div>
                        </div>

                        <div className=" flex flex-col gap-[6px]  items-center justify-center">
                          <div className="text-[30px] leading-9 font-semibold text-[#171614] rounded-lg bg-white border border-[#171614] p-[6.43px]">
                            00
                          </div>

                          <div className="font-normal text-lg leading-7">
                            {min}
                          </div>
                        </div>

                        <div className=" flex flex-col gap-[6px]  items-center justify-center">
                          <div className="text-[30px] leading-9 font-semibold text-[#171614] rounded-lg bg-white border border-[#171614] p-[6.43px]">
                            00
                          </div>

                          <div className="font-normal text-lg leading-7">
                            {sec}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      }

      {
        !isMobile && <div className="flex flex-wrap gap-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards?.map((card, index) => (
              <div key={index} className="relative bg-white flex flex-row rounded-[20px]" style={{ boxShadow: '0px 4px 6px -2px rgba(0, 0, 0, 0.13), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>

                <Image
                  src="/images/bagpack-2.jpeg"
                  alt="bagpack"
                  layout="responsive"
                  width={319}
                  height={280}
                  className="max-w-[319px] max-h-[280px] !rounded-l-[20px]"
                />

                <div className="absolute top-4 left-4  flex flex-row gap-2 bg-[#EFECE5] py-2 px-4 rounded-[20px]">
                  <Gift size={24} color="#B06E6A" />
                  <div className="font-semibold text-base leading text-primary">
                    {card?.entry}
                  </div>
                </div>

                <div className="py-8 px-6 flex flex-col gap-8">

                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-[30px] leading-9 text-[#171614]">
                      {card?.title}
                    </div>
                    <div className="font-normal text-lg leading-[28px]">
                      {card?.description}
                    </div>
                  </div>

                  <div className="flex flex-row gap-2">
                    <div>

                      <div className="flex flex-row gap-2">
                        <div className=" flex flex-col gap-[6px]  items-center justify-center">
                          <div className="text-[30px] leading-9 font-semibold text-[#171614] rounded-lg bg-white border border-[#171614] p-[6.43px]">
                            00
                          </div>

                          <div className="font-normal text-lg leading-7">
                            {day}
                          </div>
                        </div>

                        <div className=" flex flex-col gap-[6px]  items-center justify-center">
                          <div className="text-[30px] leading-9 font-semibold text-[#171614] rounded-lg bg-white border border-[#171614] p-[6.43px]">
                            00
                          </div>

                          <div className="font-normal text-lg leading-7">
                            {hrs}
                          </div>
                        </div>

                        <div className=" flex flex-col gap-[6px]  items-center justify-center">
                          <div className="text-[30px] leading-9 font-semibold text-[#171614] rounded-lg bg-white border border-[#171614] p-[6.43px]">
                            00
                          </div>

                          <div className="font-normal text-lg leading-7">
                            {min}
                          </div>
                        </div>

                        <div className=" flex flex-col gap-[6px]  items-center justify-center">
                          <div className="text-[30px] leading-9 font-semibold text-[#171614] rounded-lg bg-white border border-[#171614] p-[6.43px]">
                            00
                          </div>

                          <div className="font-normal text-lg leading-7">
                            {sec}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      }

    </section >
  )
}
