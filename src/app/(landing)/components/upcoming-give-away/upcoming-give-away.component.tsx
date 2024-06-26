'use client'
import { getGiveaways } from "@/actions";
import { Timer } from "@/components/common/timer/timer.component";
import { Button } from "@/components/ui/button/button.component";
import { messages } from "@/shared/constants/messages";
import Image from 'next/image'
import {
  useQuery,
  UseQueryResult
} from '@tanstack/react-query'
import { GiveawayItem } from "@/entities";
import { useCheckOutStore } from "@/store";
import { useRouter } from "next/navigation";

export function GiveAway() {
  const { giveAway: {
    heading,
    subHeading,
    card: {
      heading: cardHeading,
      subHeading: cardSubHeading,
      description,
      author
    },
    winMe
  } } = messages;
  const { setPricingType } = useCheckOutStore();
  const router = useRouter();

  const { data: giveAwayData, isLoading }: UseQueryResult<GiveawayItem> =
    useQuery({
      queryKey: ['upcomingGiveAway'],
      queryFn: () =>
        getGiveaways('large', 'upcoming')
    })

  const handleWin = () => {
    setPricingType("bundle")
    router.push("/#pricing")
  }

  return (
    <section className="py-12 px-[24px] sm:px-[160px] bg-[#F3F3F3]">
      <div className="flex flex-col gap-4 items-center">
        <div className="font-tt-ramillas text-center font-normal sm:font-light sm:text-[48px] text-4xl leading-[43.2px] sm:leading-[57.6px] text-[#171614] px-[26px] sm:px-0">
          {heading}
        </div>

        {giveAwayData && <div className="flex flex-col gap-4 items-center rounded-[24px]">
          <div className="font-tt-ramillas text-center font-normal text-[18px] leading-9 text-[#171614] px-[26px] sm:px-0">
            {subHeading}
          </div>

          <div className=" relative bg-white rounded-[24px] shadow-xl border-[#9CA3AF] overflow-hidden">
            <div className="z-10 opacity-[0.08] absolute bg-[url('/images/giveaway-bg.png')] w-full h-full">

            </div>
            <div className="relative border flex flex-col sm:flex-row gap-12  p-8 rounded-[24px] z-20">
              <div >
                <Image
                  src={giveAwayData?.image ? giveAwayData?.image?.file_url : "/images/bagpack.png"}
                  alt="bagpack"
                  // layout="responsive"
                  width={457}
                  height={399}
                  className="w-auto h-auto sm:min-w-[457px] sm:min-h-[399px] rounded-[24px]"
                />

              </div>
              <div className="sm:pb-0 sm:py-[61.5px] flex flex-col gap-8 items-start">

                <div className="w-full flex flex-col gap-6 sm:gap-2">
                  <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-2 justify-between sm:items-center">
                    <div className="font-semibold text-base sm:text-[30px] leading-9 text-[#171614]">
                      {giveAwayData?.brand}
                    </div>
                    <Timer
                      containerClass="flex flex-row gap-2"
                      boxClass="w-8 h-8 flex flex-col items-center justify-center"
                      textClass="text-center w-[32px] p-[6.43px] text-[14px] leading-[20px] font-semibold text-white rounded-lg bg-[#171614] border border-[#171614]"
                      labelClass="font-normal text-base leading-7"
                      labelPosition="bottom"
                      drawDate={giveAwayData?.draw_time}
                    />
                  </div>
                  <div className="text-[#9CA3AF] font-medium text-base leading-6">
                    {giveAwayData?.prize ? giveAwayData?.prize : cardSubHeading}
                  </div>
                </div>

                <div className="flex flex-col ">
                  <div className="font-medium text-base leading-6 text-[#6B7280]">
                    {giveAwayData?.description ? giveAwayData?.description : description}
                  </div>
                  {/* <div className="font-medium text-base leading-6 text-[#6B7280]">
                    {author}
                  </div> */}
                </div>
                <Button variant="primary" onClick={handleWin}>{winMe}</Button>
              </div>
            </div>

          </div>
        </div>}
      </div>
    </section>
  )
}
