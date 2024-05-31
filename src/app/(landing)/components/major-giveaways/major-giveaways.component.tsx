'use client'
import { messages } from "@/shared/constants/messages";
import { HiOutlineGift } from "react-icons/hi2";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Timer } from "@/components/common/timer/timer.component";
import {
  useQuery,
  UseQueryResult
} from '@tanstack/react-query'
import { getGiveaways } from "@/actions";
import { GiveawayItem } from "@/entities";
import { useCheckOutStore } from "@/store";
import { useWidth } from "@/hooks";
import useCalculateEntries from "@/hooks/useEntries";
import { Session } from "next-auth";

export default function MajorGiveaways({ session }: { session: Session | null }) {
  const { majorGiveaways: {
    heading, subHeading
  } } = messages;

  const { products } = useCheckOutStore();
  const pricingType = useCheckOutStore((state) => state.pricingType);

  const { width } = useWidth();

  const { data: giveAwayData, isLoading }: UseQueryResult<GiveawayItem[]> =
    useQuery({
      queryKey: ['majorGiveAways'],
      queryFn: () =>
        getGiveaways('large', 'major')
    })

  const entries = useCalculateEntries(pricingType as "subscription" | "bundle", products);
  const isLoggedIn = !!session;

  useEffect(() => {
    if (giveAwayData && pricingType === 'bundle') {
      useCheckOutStore.getState().setClosestGiveAwayDate(giveAwayData[0]?.draw_time);
    }
  }, [giveAwayData, pricingType])



  return (
    <section className={`${width < 640 ? '!py-[33px]' : 'py-[66px]'} py-[66px] ${width < 640 ? 'px-6' : 'px-16'} flex flex-col items-center gap-12 bg-[#F3F3F3]`}>

      <div className="font-tt-ramillas text-center font-normal text-4xl sm:text-5xl leading-[43.2px] sm:leading-[57.6px] text-[#171614] px-[50px] sm:px-[410px]">
        {heading}
      </div>

      <div className="font-tt-ramillas text-primary font-normal text-[30px] sm:text-5xl leading-9 sm:leading-[57.6px]">
        {subHeading}
      </div>

      {width < 640 && giveAwayData &&
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
          {giveAwayData?.map((giveAway, index) => (
            <SwiperSlide key={index} className="rounded-[20px]">
              <div
                className="relative border-2 shadow-lg border-[#E5E7EB] bg-white flex flex-col items-left sm:flex-row rounded-[20px]"
              >
                {pricingType === 'bundle' && index !== 0 && <div className="absolute w-full h-full z-30 bg-[#17161440] opacity-75 rounded-[20px]"></div>}

                <Image
                  src={giveAway?.image ? giveAway?.image?.file_url : "/images/bagpack-2.jpeg"}
                  alt="bagpack"
                  // layout="responsive"
                  width={319}
                  height={280}
                  className={`!rounded-t-[20px]`}
                />

                {!isLoggedIn && products?.length > 0 &&
                  entries > 0 &&
                  ((pricingType === "bundle" && index === 0) || pricingType !== "bundle") &&
                  <div className="absolute top-4 left-4 flex flex-row gap-2 bg-[#EFECE5] py-2 px-4 rounded-[20px]">
                    <HiOutlineGift size={24} color="#B06E6A" />
                    <div className="font-semibold text-base leading text-primary">
                      {entries} entries
                    </div>
                  </div>}

                {isLoggedIn &&
                  ((pricingType === "bundle" && index === 0) || pricingType !== "bundle") &&
                  <div className="absolute top-4 left-4 flex flex-row gap-2 bg-[#EFECE5] py-2 px-4 rounded-[20px]">
                    <HiOutlineGift size={24} color="#B06E6A" />
                    <div className="font-semibold text-base leading text-primary">
                      {session?.user?.user?.metadata?.total_entries_count} entries
                    </div>
                  </div>}

                <div className="py-8 px-6 flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-[30px] leading-9 text-[#171614]">
                      {giveAway?.brand}
                    </div>
                    <div className="font-normal text-lg leading-[28px]">
                      {giveAway?.description ? giveAway?.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'}

                    </div>
                  </div>

                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div>

                      <Timer
                        containerClass="flex flex-row gap-1"
                        boxClass="flex flex-col gap-[6px] items-center justify-center"
                        textClass="text-[30px] leading-9 font-semibold text-[#171614] rounded-lg bg-white border border-[#171614] p-[5px]"
                        labelClass="font-normal text-lg leading-7"
                        labelPosition="bottom"
                        drawDate={giveAway?.draw_time}
                      />

                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      }

      {
        width >= 640 && <div className="flex flex-wrap gap-8 max-w-[1440px] ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {giveAwayData && giveAwayData?.map((giveAway, index) => (
              <div key={index} className="relative shadow-lg bg-white flex flex-col xl:flex-row !h-[280] rounded-[20px]" >
                {pricingType === 'bundle' && index !== 0 && <div className="absolute w-full h-full z-30 bg-[#17161440] opacity-75 rounded-[20px]"></div>}

                <Image
                  src={giveAway?.image ? giveAway?.image?.file_url : "/images/bagpack-2.jpeg"}
                  alt="bagpack"
                  // layout="responsive"
                  width={319}
                  height={280}
                  className="!w-[319px] !min-h-[280px] !rounded-l-[20px]"
                />

                {!isLoggedIn && products?.length > 0 &&
                  entries > 0 &&
                  ((pricingType === "bundle" && index === 0) || pricingType !== "bundle")
                  && <div className="absolute top-4 left-4  flex flex-row gap-2 bg-[#EFECE5] py-2 px-4 rounded-[20px]">
                    <HiOutlineGift size={24} color="#B06E6A" />
                    <div className="font-semibold text-base leading text-primary">
                      {entries} entries
                    </div>
                  </div>}


                {isLoggedIn &&
                  ((pricingType === "bundle" && index === 0) || pricingType !== "bundle")
                  && <div className="absolute top-4 left-4  flex flex-row gap-2 bg-[#EFECE5] py-2 px-4 rounded-[20px]">
                    <HiOutlineGift size={24} color="#B06E6A" />
                    <div className="font-semibold text-base leading text-primary">
                      {session?.user?.user?.metadata?.total_entries_count} entries
                    </div>
                  </div>}



                <div className="py-8 px-6 flex flex-col gap-8">

                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-[30px] leading-9 text-[#171614]">
                      {giveAway?.brand}
                    </div>
                    <div className="font-normal text-lg leading-[28px]">
                      {giveAway?.description ? giveAway?.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'}
                    </div>
                  </div>

                  <div className="flex flex-row gap-2">
                    <div>

                      <Timer
                        containerClass="flex flex-row gap-2"
                        boxClass="flex flex-col gap-[6px] items-center justify-center"
                        textClass="text-[30px] leading-9 font-semibold text-[#171614] rounded-lg bg-white border border-[#171614] p-[6.43px]"
                        labelClass="font-normal text-lg leading-7"
                        labelPosition="bottom"
                        drawDate={giveAway?.draw_time}
                      />
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
