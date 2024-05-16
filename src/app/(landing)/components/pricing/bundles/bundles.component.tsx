'use client'
import { messages } from "@/shared/constants/messages";
import { ArrowUpRight} from "@phosphor-icons/react";
import { BundleCard } from "./card.component";



export function Bundle() {

  const { pricing: {
    bundleData: {
      bundleA,
      bundleB,
      bundleC,
      bundleD,
      bundleE,
      bundleF,
      oneOff,
      draw,
      select,
      selected,
      clear
    },
    continueWithSelected
  } } = messages;


  return (
    <section className="flex flex-col items-center gap-12 bg-[#F3F3F3] mt-12">
      <div className="flex flex-col items-center gap-6">
        <div className="font-medium text-primary text-lg leading-7">
          {clear}
        </div>

        <div className="grid grid-cols-3 gap-8">
          <BundleCard cardData={bundleA} select={select} draw={draw} oneOff={oneOff} />
          <BundleCard cardData={bundleB} select={select} draw={draw} oneOff={oneOff} />
          <BundleCard cardData={bundleC} select={select} draw={draw} oneOff={oneOff} />
          <BundleCard cardData={bundleD} select={select} draw={draw} oneOff={oneOff} />
          <BundleCard cardData={bundleE} select={select} draw={draw} oneOff={oneOff} />
          <BundleCard cardData={bundleF} select={select} draw={draw} oneOff={oneOff} />
        </div>
      </div>

      <div className="bg-[#171614] py-3 px-6 items-center rounded-[30px] cursor-pointer flex flex-row gap-2">
        <span className="font-medium text-white text-base leading-6">{continueWithSelected} </span> <ArrowUpRight size={24} color="white" />
      </div>
    </section>
  )
}