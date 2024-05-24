import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { messages } from "@/shared/constants/messages";
import { Bundle } from "./bundles/bundles.component";
import { Subscription } from "./subscriptions.component";
import { Product } from "@/entities";

type PricingTabsProps = {
    products: Array<Product>
}

const { pricing: {
    subscription,
    bundle,
} } = messages;

export default function PricingTabs({
    products
}: PricingTabsProps) {
    const subscriptions = products.filter(product => product.type === "subscription");
    const bundles = products.filter(product => product.type === "bundle");

    return (
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
    )
}
