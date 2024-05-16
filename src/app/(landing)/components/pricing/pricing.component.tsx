'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { messages } from "@/shared/constants/messages";
import { Bundle } from "./bundles/bundles.component";
import { Subscription } from "./subscriptions.component";



export function Pricing() {

  const { pricing: {
    headingA,
    headingB,
    description,
    subscription,
    bundle,
  } } = messages;


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
          <Bundle />
        </TabsContent>
      </Tabs>

    </section>
  )
}
