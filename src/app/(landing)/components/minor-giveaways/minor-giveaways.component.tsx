import { messages } from "@/shared/constants/messages";
import Image from 'next/image'
import { HiMiniArrowLeft } from "react-icons/hi2";
import { HiMiniArrowRight } from "react-icons/hi2";

export function MinorGiveaways() {
  const { minorGiveways: {
    title,
    cards
  } } = messages;

  return (
    <section className="py-8 flex flex-col justify-center w-full items-center gap-12 bg-[#F3F3F3]">

      <div className="font-tt-ramillas font-normal text-[30px] sm:text-5xl leading-9 sm:leading-[57.6px] text-primary">
        {title}
      </div>

      <div className="max-w-full flex flex-col gap-3 items-center">
        <div className="flex sm:flex-wrap overflow-x-auto max-w-full sm:max-w-[1440px] sm:justify-center items-left  gap-6 px-6 sm:px-16 pb-8 pt-2">
          {cards?.map((card, index) => (
            <div key={index} className="relative flex-shrink-0 shadow-lg rounded-[30px] w-[240px] flex flex-col gap-4">

              <div className="absolute bg-white rounded-full px-2 top-4 left-[123px]  ">
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

              <div className="flex flex-col gap-2 px-4 pb-4">
                <div className="font-bold text-[14px] leading-[20px] text-[#54423A]">
                  {card?.title}
                </div>

                <div className="font-normal text-xs leading-4">
                  {card?.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:flex flex-row gap-2 items-center">
          <HiMiniArrowLeft className="w-[20px] font-bold cursor-pointer" />

          <div className="text-base leading-6 font-normal text-[#171614] rounded-lg border border-[#171614] px-2 py-1">
            01
          </div>

          <HiMiniArrowRight className="w-[20px] font-bold cursor-pointer" />

        </div>
      </div>

    </section>
  )
}
