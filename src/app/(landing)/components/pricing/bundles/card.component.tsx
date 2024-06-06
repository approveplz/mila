import { Button } from "@/components";
import { messages } from "@/shared/constants/messages";
import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

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
    entry: number,
    cost: number,
    benefits: benefit[]
    selected: boolean,
    quantity: number,
    duration: number,
    onSelect: () => void
    onIncrease: () => void
    onDecrease: () => void
    session: Session | null
    cardId: string
  },
}

const bundleCardClasses = cva("relative py-8 px-6 rounded-3xl shadow-lg z-20 sm:min-w-[350px] w-full", {
  variants: {
    selected: {
      true: "border-4 border-primary bg-white",
      false: "price-card before:rounded-3xl before:-z-10"
    }
  }
})

export function BundleCard({ cardData, selected }: bundleCard & VariantProps<typeof bundleCardClasses>) {
  const { pricing: {
    bundleData: {
      oneOff,
      draw,
      select,
    }
  } } = messages;

  const isLoggedIn = !!cardData?.session;

  const [isCardSelected, selectIsCardSelected] = useState<boolean>(false)
  const [qunatity, setQuantity] = useState<number>(0)

  useEffect(() => {
    if (isLoggedIn && cardData?.session) {
      cardData?.session?.user?.user?.metadata?.subscribed_products?.forEach((item) => {
        if (item.product === cardData?.cardId) {
          selectIsCardSelected(true)
          setQuantity(item.quantity)
        }
      })
    }
  }, [cardData?.session])

  return (
    <figure
      className={cn(bundleCardClasses({ selected: (isLoggedIn && isCardSelected) || (!isLoggedIn && selected) }))}>
      <div className="flex flex-col items-left gap-6">
        <div className="flex flex-col items-left ">
          <div className="flex flex-row gap-2 items-center select-none">
            <HiOutlineGift size={24} color="#BE7B62" />
            <span className="font-tt-ramillas text-[30px] sm:text-4xl font-bold leading-[46.8px] text-primary">{cardData?.entry} Entries</span>
          </div>
          {/* <div className="select-none font-medium text-base leading-6 text-[#171614]">
            {draw}
          </div> */}
        </div>

        <div className="flex flex-col gap-6 items-left w-full">
          <div className="flex flex-col items-left">
            <div className="select-none font-light text-5xl leading-[48px]">
              ${cardData?.cost}
            </div>
            <div className="select-none font-normal text-base leading-6">
              {oneOff}
            </div>
            {cardData?.benefits.map((benefit: benefit, index: number) => (
              <div key={index} className="flex flex-row gap-[7px] items-center">
                <div className="font-normal text-base leading-6 select-none">
                  {benefit?.benefit.includes('{access_duration}') ? benefit?.benefit.replace('{access_duration}', cardData.duration.toString()) : benefit?.benefit}
                </div>
              </div>
            ))}
          </div>

          {/* <div className="flex flex-col items-left gap-1 select-none">
            {cardData?.benefits.map((benefit: benefit, index: number) => (
              <div key={index} className="flex flex-row gap-[7px] items-center">
                {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                <div className="font-normal text-base leading-6">
                  {benefit?.benefit.includes('{access_duration}') ? benefit?.benefit.replace('{access_duration}', cardData.duration.toString()) : benefit?.benefit}
                </div>
              </div>
            ))}
          </div> */}
        </div>

        <div className="w-full flex justify-between">
          {!isLoggedIn && <Button
            className="px-5 py-2 select-none"
            variant={cardData.selected ? "primary" : "tertiary"}
            onClick={cardData.onSelect}
          >
            {cardData.selected ? "Selected" : "Select"}
          </Button>}

          {cardData.selected && !isLoggedIn && (
            <div className="flex flex-row gap-2 items-center">
              <div>
                <HiMiniMinus
                  onClick={cardData.onDecrease}
                  className="cursor-pointer"
                  size={24} />
              </div>

              <div className="select-none border border-[#171614] rounded-[10px] py-2 px-3">
                {cardData.quantity < 10 ? `0${cardData.quantity}` : cardData.quantity}
              </div>

              <div>
                <HiMiniPlus
                  onClick={cardData.onIncrease}
                  className="cursor-pointer"
                  size={24} />
              </div>
            </div>
          )}


          {(isLoggedIn && isCardSelected) &&
            <Button
              className="px-5 py-2"
              variant="primary"
            >
              Selected
            </Button>
          }

          {(isLoggedIn && isCardSelected) &&
            <div className="flex flex-row gap-2 items-center">
              <div className="border border-[#171614] rounded-[10px] py-2 px-3">
                {qunatity}
              </div>
            </div>}
        </div>
      </div>
    </figure>
  )
}