'use client'
import { Button } from "@/components";
import { messages } from "@/shared/constants/messages";
import { useState } from "react";

import { HiCheck } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";
import { HiOutlineGift } from "react-icons/hi2";
import { HiMiniPlus } from "react-icons/hi2";
import { HiMiniMinus } from "react-icons/hi2";

type benefit = {
  benefit: string,
  included: boolean
}

type bundleCard = {
  cardData: {
    entry: string,
    cost: string,
    benefits: benefit[]
  },
}

export function BundleCard({ cardData}: bundleCard) {

  const [counter, setCounter] = useState<number>(0)

  const { pricing: {
    bundleData: {
      oneOff,
      draw,
      select,
    }
  } } = messages;

  return (

    <div className={`relative overflow-hidden bg-white rounded-[24px] border-[#CDCDCD]`}>

      <div className="flex flex-col items-left gap-8  px-6 py-8 border-2 rounded-[24px]  sm:w-[416px] ">

        <div className="flex flex-col items-left">

          <div className="flex flex-row gap-2 items-center">

            <HiOutlineGift size={24} color="#BE7B62" />
            <span className="font-tt-ramillas text-4xl font-bold leading-[46.8px] text-primary">{cardData?.entry}</span>

          </div>
          <div className="font-medium text-base leading-6 text-[#171614]">
            {draw}
          </div>
        </div>

        <div className="flex flex-col gap-6 items-left w-full">
          <div className="flex flex-col items-left">
            <div className="font-light text-5xl leading-[40px]">
              {cardData?.cost}
            </div>
            <div className="font-normal text-base leading-[48px]">
              {oneOff}
            </div>
          </div>

          <div className="flex flex-col items-left gap-1">
            {
              cardData?.benefits.map((benefit: benefit, index: number) => (
                <div key={index} className="flex flex-row gap-[7px] items-center">
                  {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black"/>}
                  <div className="font-normal text-base leading-6">
                    {benefit?.benefit}
                  </div>
                </div>
              ))
            }

          </div>
        </div>

        <div className="w-full flex justify-between ">
          <Button className="w-[88px] h-[40px]" variant="tertiary">{select}</Button>

          <div className="flex flex-row gap-2 items-center">
            <div>
              <HiMiniMinus
                onClick={() => {
                  if (counter > 0)
                    setCounter(counter - 1)
                }}
                className="cursor-pointer"
                size={24} />
            </div>

            <div className="border border-[#171614] rounded-[10px] py-2 px-3">
              {counter < 10 ? `0${counter}` : counter}
            </div>

            <div>
              <HiMiniPlus
                onClick={() => {
                  setCounter(counter + 1)
                }}
                className="cursor-pointer"
                size={24} />
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}