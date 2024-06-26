'use client'

import { Timer } from "@/components/common/timer/timer.component";
import { Button } from "@/components/ui/button/button.component";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {
  useQuery,
  UseQueryResult
} from '@tanstack/react-query'
import { GiveawayItem } from "@/entities";
import { getGiveaways } from "@/actions";
import { useRouter } from "next/navigation";
import { useCheckOutStore } from "@/store";


export function NextGiveAway() {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { setPricingType } = useCheckOutStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { data: giveAwayData, isLoading }: UseQueryResult<GiveawayItem> =
    useQuery({
      queryKey: ['upcomingGiveAway'],
      queryFn: () =>
        getGiveaways('large', 'upcoming')
    })
  
  const handleWin = () => {
    setPricingType("bundle")
    router.push("/giveaways/#pricing")
  }

  return (
    <section className="py-[64px] sm:py-[112px] px-[24px] sm:px-[160px] bg-[#F3F3F3]">
      <div className="flex flex-col gap-8 sm:gap-12 items-center">
        <div className="font-tt-ramillas text-center font-normal sm:font-light sm:text-5xl text-[28px] leading-[33px] sm:leading-[72px] text-[#171614] px-[26px] sm:px-0">
          NEXT Major Giveaway
        </div>

        {giveAwayData && <div className="flex flex-col gap-12 items-center rounded-[24px] border-[3px] border-primary w-full sm:h-[416px]">

          <div className="w-full relative bg-white rounded-[24px] shadow-xl border-[#9CA3AF] overflow-hidden">
            <div className="z-10 opacity-[0.08] absolute bg-[url('/images/giveaway-bg.png')] w-full h-full">

            </div>
            <div className="relative border flex flex-col sm:flex-row z-20">
              <div className="w-full sm:w-1/2 h-full">
                <Image
                  src={giveAwayData?.image ? giveAwayData?.image?.file_url : "/images/giveaway-backpack.png"}
                  alt="giveaway-backpack"
                  // layout="responsive"
                  width={656}
                  height={399}
                  className="object-cover"
                />

              </div>
              <div className="p-8 flex flex-col gap-4 items-start sm:w-1/2 w-full">
                <div className="bg-primary border border-[#9CA3AF] px-2 rounded-[16px] w-fit">
                  <div className="font-semibold text-base leading-6 text-[#FFFFFF]">MAJOR</div>
                </div>
                <div className="w-full flex flex-col gap-4">

                  <div className="w-full flex flex-col sm:flex-row gap-6 justify-between sm:items-center ">
                    <div title={giveAwayData?.brand} className="font-bold text-[38px] leading-9 text-[#171614] line-clamp-1 overflow-hidden">
                      {giveAwayData?.brand}
                    </div>


                    <Timer
                      containerClass="flex flex-row gap-2"
                      boxClass="w-[34px] h-[34px] rounded-lg flex flex-col items-center justify-center"
                      textClass="text-center w-[32px] p-[6.43px] text-[14px] leading-[20px] font-semibold text-white rounded-lg bg-primary border border-primary"
                      labelClass="font-normal text-base leading-7"
                      labelPosition="bottom"
                      drawDate={giveAwayData?.draw_time}
                    />
                  </div>
                  <div className="text-[#6B7280] font-medium text-[30px] leading-9">
                    {giveAwayData?.prize ? giveAwayData?.prize : 'Backpack'}
                  </div>
                </div>

                {!isMobile && <div id="collpasable" className="flex flex-col gap-8 items-start w-full">

                  <div className="flex flex-col ">
                    <div title={giveAwayData?.description} className="font-normal text-base leading-6 text-[#171614] sm:line-clamp-5 sm:overflow-hidden">
                     {giveAwayData?.description ? giveAwayData?.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'}
                    </div>
                    {/* <div className="font-nomral text-base leading-6 text-[#171614]">
                      minim veniam.
                    </div> */}
                  </div>

                  {/* <div className="flex flex-col gap-[10px]">

                    <div className="flex flex-row gap-8 items-center">
                      <HiOutlineShoppingBag className="text-[#6B7280]" size={24} />
                      <div className="font-medium text-[14px] leading-[20px] text-[#6B7280]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </div>
                    </div>

                    <div className="flex flex-row gap-8 items-center">
                      <HiOutlineShoppingBag className="text-[#6B7280]" size={24} />
                      <div className="font-medium text-[14px] leading-[20px] text-[#6B7280]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </div>
                    </div>

                    <div className="flex flex-row gap-8 items-center">
                      <HiOutlineShoppingBag className="text-[#6B7280]" size={24} />
                      <div className="font-medium text-[14px] leading-[20px] text-[#6B7280]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </div>
                    </div>

                  </div> */}
                </div>}

                {
                  isMobile && !isCollapsed &&
                  <div id="collpasable" className="flex flex-col gap-8 items-start w-full">

                    <div className="flex flex-col ">
                      <div className="font-normal text-base leading-6 text-[#171614]">
                      {giveAwayData?.description ? giveAwayData?.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'}

                      </div>
                      {/* <div className="font-nomral text-base leading-6 text-[#171614]">
                        minim veniam.
                      </div> */}
                    </div>

                    {/* <div className="flex flex-col gap-[10px]">

                      <div className="flex flex-row gap-8 items-center">
                        <HiOutlineShoppingBag className="text-[#6B7280]" size={24} />
                        <div className="font-medium text-[14px] leading-[20px] text-[#6B7280]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                        </div>
                      </div>

                      <div className="flex flex-row gap-8 items-center">
                        <HiOutlineShoppingBag className="text-[#6B7280]" size={24} />
                        <div className="font-medium text-[14px] leading-[20px] text-[#6B7280]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                        </div>
                      </div>

                      <div className="flex flex-row gap-8 items-center">
                        <HiOutlineShoppingBag className="text-[#6B7280]" size={24} />
                        <div className="font-medium text-[14px] leading-[20px] text-[#6B7280]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                        </div>
                      </div>

                    </div> */}
                  </div>
                }

                {isMobile && <div>
                  {isCollapsed ? <div className="font-semibold text-base leading-[24px] underline" onClick={toggleCollapse}> See more </div> :
                    <div className="font-semibold text-base leading-[24px] underline" onClick={toggleCollapse}> See less</div>}
                </div>
                }
                <Button variant="primary" onClick={handleWin}>Win me</Button>
              </div>
            </div>

          </div>
        </div>}
      </div>
    </section>
  )
}
