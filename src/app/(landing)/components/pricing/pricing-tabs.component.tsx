'use client'
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { messages } from "@/shared/constants/messages";
import { Bundle } from "./bundles/bundles.component";
import { Product } from "@/entities";
import { useCheckOutStore } from "@/store";
import { Session } from "next-auth";
import dynamic from "next/dynamic";

const Subscription = dynamic(() => import("./subscriptions.component"), {
    ssr: false
})

type PricingTabsProps = {
    products: Array<Product>
    session: Session | null
}

const { pricing: {
    subscription,
    bundle,
} } = messages;

export default function PricingTabs({
    products,
    session
}: PricingTabsProps) {
    const subscriptions = products.filter(product => product.type === "subscription");
    const bundles = products.filter(product => product.type === "bundle");
    const pricingType = useCheckOutStore((state) => state.pricingType);

    return (
        <Tabs defaultValue={pricingType} className="w-full">
            <TabsList className="flex flex-row justify-center">
                <div className="bg-white rounded-[30px] p-1">
                    <TabsTrigger onClick={() => {
                        useCheckOutStore.getState().setPricingType("subscription");
                    }} value="subscription">{subscription}</TabsTrigger>
                    <TabsTrigger onClick={() => {
                        useCheckOutStore.getState().setPricingType("bundle");
                    }} value="bundle">{bundle}</TabsTrigger>
                </div>
            </TabsList>
            <TabsContent value="subscription">
                <Subscription session={session} subscriptions={subscriptions} />
            </TabsContent>
            <TabsContent value="bundle">
                <Bundle session={session} bundles={bundles} />
            </TabsContent>
        </Tabs>
    )
}
