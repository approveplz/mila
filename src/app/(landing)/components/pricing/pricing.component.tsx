'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { messages } from "@/shared/constants/messages";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useState } from "react";
import { Subscription } from "./subscriptions.component";



export function Pricing() {

  const frequencies = [
    { label: 'Monthly' },
    { label: 'Annually' },
  ]

  const { pricing: {

    headingA,
    headingB,
    description,
    subscription,
    bundle,
    clearSelection,
    continueWithSelected
  } } = messages;

  const [frequency, setFrequency] = useState(frequencies[0])


  return (
    <section className="py-[66px] px-16 flex flex-col items-center gap-12 bg-[#F3F3F3]">

      <div className="flex flex-col gap-6 items-center">
        <div>
          <span className="font-tt-ramillas font-normal text-5xl leading-[57.6px]">{headingA}</span> <span className="italic font-tt-ramillas font-normal text-5xl leading-[57.6px]">{headingB}</span>
        </div>

        <div className="font-normal text-lg leading-7 text-[#000000] text-center px-[300px]">
          {description}
        </div>
      </div>



      <Tabs defaultValue="subscription">
        <TabsList className="flex flex-row justify-center">
          <div className="bg-white rounded-[30px] p-1">
            <TabsTrigger value="subscription">{subscription}</TabsTrigger>
            <TabsTrigger value="bundle">{bundle}</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="subscription">
          <Subscription />
        </TabsContent>
        <TabsContent value="bundle">
          <Subscription />
        </TabsContent>
      </Tabs>



      <div className="bg-[#171614] py-3 px-6 items-center rounded-[30px] cursor-pointer flex flex-row gap-2">
        <span className="font-medium text-white text-base leading-6">{continueWithSelected} </span> <ArrowUpRight size={24} color="white" />
      </div>


    </section>
  )
}
