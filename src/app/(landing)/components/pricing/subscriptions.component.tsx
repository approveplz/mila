'use client'
import { Button } from "@/components";
import { messages } from "@/shared/constants/messages";
import { ArrowUpRight, Check, Gift, X } from "@phosphor-icons/react";


export function Subscription() {

  const { pricing: {
    subscriptionData: {
      free,
      bronze,
      silver,
      gold,
      days,
      getMessageA,
      getMessageB,
      select
    },
    continueWithSelected,
    clearSelection,
  } } = messages;


  return (
    <section className="flex flex-col items-center gap-12 bg-[#F3F3F3] mt-12">
      <div className="flex flex-col items-center gap-6">
        <div className="font-medium text-primary text-lg leading-7">
          {clearSelection}
        </div>

        <div className="flex flex-row gap-8">

          <div className="relative overflow-hidden bg-white rounded-[24px]  border-[#CDCDCD]">

            <div className="z-10 bg-cover opacity-[0.03] absolute bg-[url('/images/giveaway-bg.png')] w-full h-full">

            </div>

            <div className="z-20 flex flex-col items-left gap-8  py-8 border-2 rounded-[24px]  w-[304px] h-[579px]">

              <div className="flex flex-col items-center px-6">

                <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                  {free?.title}
                </div>

                <div className="flex flex-col gap-8 items-center pt-10 w-full">
                  <div className="flex flex-col items-center">
                    <div className="font-semibold text-4xl leading-[40px]">
                      {free?.amount}
                    </div>
                    <div className="font-normal text-base leading-6">
                      {days}
                    </div>
                  </div>

                  <hr className=" w-full border-t border-[#D1D5DB]" />

                  <div className="flex flex-col gap-2 items-center">

                    <div className="font-normal text-base leading-6">

                      {getMessageA}
                    </div>

                    <div className="flex flex-row gap-2 items-center">


                      <Gift size={24} color="#BE7B62" />
                      <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{free?.entry}</span>

                    </div>

                    <div className="font-normal text-base leading-6">

                      {getMessageB}
                    </div>

                  </div>

                </div>
              </div>
              <div className="flex flex-col items-left gap-1 px-6">
                {
                  free?.benefits.map((benefit, index) => (
                    <div key={index} className="flex flex-row gap-[7px] items-center">
                      {benefit?.included ? <Check size={16} color="black" weight="bold" /> : <X size={16} color="black" weight="bold" />}
                      <div className="font-normal text-base leading-6">
                        {benefit?.benefit}
                      </div>
                    </div>
                  ))
                }

              </div>

              <div className="px-6 w-full flex flex-col">
                <Button variant="tertiary">{select}</Button>
              </div>



            </div>

          </div>

          <div className="relative overflow-hidden bg-[#EFECE5] rounded-[24px] border-2  border-primary">

            <div className="z-10 bg-cover opacity-[0.03] absolute bg-[url('/images/giveaway-bg.png')] w-full h-full">

            </div>

            <div className="z-20 flex flex-col items-left gap-8  py-8 border-2 rounded-[24px]  w-[304px] h-[579px]">

              <div className="flex flex-col items-center px-6">

                <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                  {bronze?.title}
                </div>

                <div className="flex flex-col gap-8 items-center w-full mt-1">
                  <div className="flex flex-col items-center">

                    <div className="font-semibold text-[30px] leading-9 text-[#C7B8A3] line-through">
                      {bronze?.oldPrice}
                    </div>


                    <div className="font-semibold text-4xl leading-[40px]">
                      {bronze?.price}
                    </div>
                    <div className="font-normal text-base leading-6">
                      {days}
                    </div>
                  </div>

                  <hr className=" w-full border-t border-[#D1D5DB]" />

                  <div className="flex flex-col gap-2 items-center">

                    <div className="font-normal text-base leading-6">

                      {getMessageA}
                    </div>

                    <div className="flex flex-row gap-2 items-center">


                      <Gift size={24} color="#BE7B62" />
                      <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{bronze?.entry}</span>

                    </div>

                    <div className="font-normal text-base leading-6">

                      {getMessageB}
                    </div>

                  </div>

                </div>
              </div>
              <div className="flex flex-col items-left gap-1 px-3">
                {
                  bronze?.benefits.map((benefit, index) => (
                    <div key={index} className="flex flex-row gap-[7px] items-center">
                      {benefit?.included ? <Check size={16} color="black" weight="bold" /> : <X size={16} color="black" weight="bold" />}
                      <div className="font-normal text-base leading-6">
                        {benefit?.benefit}
                      </div>
                    </div>
                  ))
                }

              </div>

              <div className="px-6 w-full flex flex-col">
                <Button variant="primary">{select}</Button>
              </div>



            </div>

          </div>

          <div className="relative overflow-hidden bg-[#DFD7C9] rounded-[24px]  border-[#CDCDCD]">

            <div className="z-10 bg-cover opacity-[0.03] absolute bg-[url('/images/giveaway-bg.png')] w-full h-full">

            </div>

            <div className="z-20 flex flex-col items-left gap-8  py-8 border-2 rounded-[24px]  w-[304px] h-[579px]">

              <div className="flex flex-col items-center px-6">

                <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                  {silver?.title}
                </div>

                <div className="flex flex-col gap-8 items-center w-full mt-1">
                  <div className="flex flex-col items-center">

                    <div className="font-semibold text-[30px] leading-9 text-[#C7B8A3] line-through">
                      {silver?.oldPrice}
                    </div>


                    <div className="font-semibold text-4xl leading-[40px]">
                      {silver?.price}
                    </div>
                    <div className="font-normal text-base leading-6">
                      {days}
                    </div>
                  </div>

                  <hr className=" w-full border-t border-[#9CA3AF]" />

                  <div className="flex flex-col gap-2 items-center">

                    <div className="font-normal text-base leading-6">

                      {getMessageA}
                    </div>

                    <div className="flex flex-row gap-2 items-center">


                      <Gift size={24} color="#BE7B62" />
                      <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{silver?.entry}</span>

                    </div>

                    <div className="font-normal text-base leading-6">

                      {getMessageB}
                    </div>

                  </div>

                </div>
              </div>
              <div className="flex flex-col items-left gap-1 px-3">
                {
                  silver?.benefits.map((benefit, index) => (
                    <div key={index} className="flex flex-row gap-[7px] items-center">
                      {benefit?.included ? <Check size={16} color="black" weight="bold" /> : <X size={16} color="black" weight="bold" />}
                      <div className="font-normal text-base leading-6">
                        {benefit?.benefit}
                      </div>

                    </div>
                  ))
                }

              </div>

              <div className="px-6 w-full flex flex-col">
                <Button variant="tertiary">{select}</Button>
              </div>



            </div>

          </div>


          <div className="relative overflow-hidden bg-[#C7B8A3] rounded-[24px]  border-[#CDCDCD]">

            <div className="z-10 bg-cover opacity-[0.03] absolute bg-[url('/images/giveaway-bg.png')] w-full h-full">

            </div>

            <div className="z-20 flex flex-col items-left gap-8  py-8 border-2 rounded-[24px]  w-[304px] h-[579px]">

              <div className="flex flex-col items-center px-6">

                <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                  {gold?.title}
                </div>

                <div className="flex flex-col gap-8 items-center w-full mt-1">
                  <div className="flex flex-col items-center">

                    <div className="font-semibold text-[30px] leading-9 text-[#C7B8A3] line-through">
                      {gold?.oldPrice}
                    </div>


                    <div className="font-semibold text-4xl leading-[40px]">
                      {gold?.price}
                    </div>
                    <div className="font-normal text-base leading-6">
                      {days}
                    </div>
                  </div>

                  <hr className=" w-full border-t border-[#D1D5DB]" />

                  <div className="flex flex-col gap-2 items-center">

                    <div className="font-normal text-base leading-6">

                      {getMessageA}
                    </div>

                    <div className="flex flex-row gap-2 items-center">


                      <Gift size={24} color="#BE7B62" />
                      <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{gold?.entry}</span>

                    </div>

                    <div className="font-normal text-base leading-6">

                      {getMessageB}
                    </div>

                  </div>

                </div>
              </div>
              <div className="flex flex-col items-left gap-1 px-3">
                {
                  gold?.benefits.map((benefit, index) => (
                    <div key={index} className="flex flex-row gap-[7px] items-center">
                      {benefit?.included ? <Check size={16} color="black" weight="bold" /> : <X size={16} color="black" weight="bold" />}
                      <div className="font-normal text-base leading-6">
                        {benefit?.benefit}
                      </div>

                    </div>
                  ))
                }

              </div>

              <div className="px-6 w-full flex flex-col">
                <Button variant="tertiary">{select}</Button>
              </div>

            </div>

          </div>


        </div>
      </div>

      <div className="bg-[#171614] py-3 px-6 items-center rounded-[30px] cursor-pointer flex flex-row gap-2">
        <span className="font-medium text-white text-base leading-6">{continueWithSelected} </span> <ArrowUpRight size={24} color="white" />
      </div>

    </section>
  )
}