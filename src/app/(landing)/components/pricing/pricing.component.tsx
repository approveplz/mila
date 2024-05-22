"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { messages } from "@/shared/constants/messages";
import { Bundle } from "./bundles/bundles.component";
import { Subscription } from "./subscriptions.component";
import { Product } from "@/entities";
import { Button } from "@/components";
import { HiArrowUpLeft, HiArrowUpRight } from "react-icons/hi2";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger
} from "@/components";
import { SignUpDrawer } from "@/components";
import { useCheckOutStore } from "@/store";

function SignUpAction() {
  return (
    <Drawer dismissible={false}>
      <DrawerTrigger asChild>
        <Button variant="fatal">
          Continue With Selected
          <HiArrowUpRight className="ml-3 h-6 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white h-full rounded-none">
        <SignUpDrawer />
      </DrawerContent>
    </Drawer>
  )
}

export function Pricing({
  products
}: {
  products: Array<Product>
}) {
  const { products: selectedProducts } = useCheckOutStore();
  const { pricing: {
    headingA,
    headingB,
    description,
    subscription,
    bundle,
  } } = messages;

  const subscriptions = products.filter(product => product.type === "subscription");
  const bundles = products.filter(product => product.type === "bundle");

  return (
    <section className="py-[66px] sm:px-16 px-6 flex flex-col items-center gap-12 bg-[#F3F3F3]">
      <div className="flex flex-col gap-6 items-center">
        <div>
          <span className="font-tt-ramillas font-normal text-4xl leading-[43.2px] sm:text-5xl  sm:leading-[57.6px]">{headingA}</span> <span className="italic font-tt-ramillas font-normal text-4xl leading-[43.2px] sm:text-5xl  sm:leading-[57.6px]">{headingB}</span>
        </div>

        <div className="font-normal text-lg leading-7 text-[#000000] text-center sm:px-[300px]">
          {description}
        </div>
      </div>

      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="flex flex-row justify-center">
          <div className="bg-white rounded-[30px] p-1">
            <TabsTrigger value="subscription">{subscription}</TabsTrigger>
            <TabsTrigger value="bundle">{bundle}</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="subscription">
          <Subscription subscriptions={subscriptions} />
        </TabsContent>
        <TabsContent value="bundle">
          <Bundle bundles={bundles} />
        </TabsContent>
      </Tabs>

      {selectedProducts.length > 0 && (
        <SignUpAction />
      )}
    </section>
  )
}
