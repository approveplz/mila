'use client'
import { messages } from "@/shared/constants/messages";
import Image from 'next/image'
import { HiMiniArrowLeft } from "react-icons/hi2";
import { HiMiniArrowRight } from "react-icons/hi2";
import {
  useQuery,
  UseQueryResult
} from '@tanstack/react-query'
import { getGiveaways } from "@/actions";
import { GiveawayItem } from "@/entities";
import { useCheckOutStore } from "@/store";
import { useEffect, useState } from "react";
import useCalculateEntries from "@/hooks/useEntries";
import { Session } from "next-auth";

export function MinorGiveaways({ session }: { session: Session | null }) {
  const { minorGiveways: {
    title,
  } } = messages;

  const { data: giveAwayData, isLoading }: UseQueryResult<GiveawayItem[]> =
    useQuery({
      queryKey: ['minorGiveAways'],
      queryFn: () =>
        getGiveaways('small', 'minor')
    })

  const { products } = useCheckOutStore();
  const pricingType = useCheckOutStore((state) => state.pricingType);
  const closestMajorGiveaway = useCheckOutStore(state => state.closestGiveAwayDate)

  const entries = useCalculateEntries(pricingType as "subscription" | "bundle", products);
  const isLoggedIn = !!session;

  const calculateGiveAwayDate = (minorGiveAwayDate: string) => {
    return new Date(minorGiveAwayDate) < new Date(closestMajorGiveaway as string)
  }

  return (
    <section className="py-8 flex flex-col justify-center w-full items-center gap-12 bg-[#F3F3F3]">

      <div className="font-tt-ramillas font-normal text-[30px] sm:text-5xl leading-9 sm:leading-[57.6px] text-primary">
        {title}
      </div>

      {giveAwayData && <div className="max-w-full flex flex-col gap-3 items-center">
        <div className="flex sm:flex-wrap overflow-x-auto max-w-full sm:max-w-[1440px] sm:justify-center items-left  gap-6 px-6 sm:px-16 pb-8 pt-2">
          {giveAwayData?.map((giveAway, index) => (
            <div key={index} className="relative flex-shrink-0 shadow-lg rounded-[30px] w-[240px] flex flex-col gap-4">

              {pricingType === 'bundle' && !calculateGiveAwayDate(giveAway?.draw_time) && <div className="absolute w-full h-full z-30 bg-[#17161440] opacity-75 rounded-[30px]"></div>}


              {!isLoggedIn && products?.length > 0 && entries > 0 && ((pricingType === 'bundle' && calculateGiveAwayDate(giveAway?.draw_time) || pricingType !== "bundle")) && <div className="absolute bg-white rounded-full px-2 top-4 left-[123px]  ">
                <div className="font-semibold text-base leading-6">
                  {entries} {entries > 1 ? 'entries' : 'entry'}
                </div>
              </div>}

              {isLoggedIn && ((pricingType === 'bundle' && calculateGiveAwayDate(giveAway?.draw_time) || pricingType !== "bundle")) && <div className="absolute bg-white rounded-full px-2 top-4 left-[123px]  ">
                <div className="font-semibold text-base leading-6">
                  {session?.user?.user?.metadata?.total_entries_count} {session?.user?.user?.metadata?.total_entries_count > 1 ? 'entries' : 'entry'}
                </div>
              </div>}

              <Image
                src={giveAway?.image ? giveAway?.image?.file_url : "/images/bagpack-2.jpeg"}
                alt="bagpack"
                // layout="responsive"
                width={240}
                height={210}
                className="w-full h-full !rounded-t-[30px]"
              />

              <div className="flex flex-col gap-2 px-4 pb-4">
                <div className="font-bold text-[14px] leading-[20px] text-[#54423A]">
                  {giveAway?.brand}
                </div>

                <div title={giveAway?.description} className="font-normal text-xs leading-4 line-clamp-4 overflow-hidden">
                  {giveAway?.description ? giveAway?.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      }

    </section>
  )
}
