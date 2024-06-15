"use client";

import * as React from "react";
import { Button, Container, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Spinner } from "@/components";
import { HiArrowUpRight } from "react-icons/hi2";
import { useCheckOutStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { changeBillingPlan, nextBillingCycle } from "@/api/auth";
import { getProductPrice, getProductPriceInfo } from "@/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { Price, Product } from "@/entities";
import { useCurrentSession } from "@/hooks";

export function SubscriptionAction({ subscriptions = [] }: { subscriptions: Array<Product> }) {
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const { products } = useCheckOutStore();
    const { session } = useCurrentSession();

    const selectSubscriptions = products.filter(prod => prod.data.type === "subscription");
    const newSubscription = selectSubscriptions[0];
    const currentSubscription = React.useMemo(() => {
        if(session) {
            return subscriptions.find(sub => session.user.user.metadata.subscribed_products.some(prod => prod.product === sub.id))
        }
    }, [session, subscriptions]);

    const displayPrice = (prices: Price[]) => {
        const { isDiscounted, defaultPrice, discountedPrice } = getProductPrice(prices);

        if (isDiscounted) {
            return discountedPrice
        }

        return defaultPrice
    }

    const { mutate: nextBillingCycleMutate, isPending: isPendingNextBillingCycle, data: nextBillingCycleData } = useMutation({
        mutationFn: (payload: { price: string }) => nextBillingCycle(payload),
        onSuccess(data) {
            setIsDialogOpen(true);
        },
    });

    const { mutateAsync: changeBillingPlanMutate, isPending: IsPendingChangeBillingPlan } = useMutation({
        mutationFn: (payload: { price: string }) => changeBillingPlan(payload),
        onError(error) {
            toast.error("Something went wrong!");
        },
    });

    const handleChangeBillingPlan = () => {
        if (newSubscription) {
            const { discountedPrice, defaultPrice } = getProductPriceInfo(newSubscription.data.prices);

            changeBillingPlanMutate({ price: (!!discountedPrice) ? discountedPrice.id : defaultPrice.id })
                .then(res => {
                    console.log("res: ", res);
                })
        }
    }

    console.log("session: ", session);
    return (
        <Dialog open={isDialogOpen} onOpenChange={state => setIsDialogOpen(state)}>
            <Button
                variant="fatal-outline"
                onClick={() => {
                    if (newSubscription) {
                        const { discountedPrice, defaultPrice } = getProductPriceInfo(newSubscription.data.prices);

                        nextBillingCycleMutate({
                            price: (!!discountedPrice) ? discountedPrice.id : defaultPrice.id
                        })
                    }
                }}
                disabled={isPendingNextBillingCycle}
            >
                <span className="select-none">Continue With Selected</span>
                {isPendingNextBillingCycle ? (
                    <Spinner className="w-4 h-4 ml-3" />
                ) : (
                    <HiArrowUpRight className="ml-3 h-6 w-4" />
                )}
            </Button>
            <DialogContent
                className="w-[329px] sm:w-[442px] z-[999999] gap-12"
                withClose
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDown={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="font-normal text-[32px] leading-[38.4px]">Change tier to <span className="text-[#A38D6F]">{newSubscription?.data.name.toUpperCase()}</span>?</DialogTitle>
                </DialogHeader>

                <div className="font-normal">
                    <p>
                        By upgrading you will be immediately upgraded to the {newSubscription?.data.name.toUpperCase()} benefits and entries and the cost will pro-rate to the new subscription. Your next billing cycle will be on {format(nextBillingCycleData?.next_cycle ?? new Date(), "MM/dd/yyyy")}.
                    </p>

                    <div className="flex justify-center gap-8 text-4xl mt-4">
                        <p className="line-through">${currentSubscription && displayPrice(currentSubscription.prices)}</p>
                        <p className="text-[#A38D6F]">${newSubscription && displayPrice(newSubscription.data.prices)}</p>
                    </div>
                </div>

                <DialogClose className="hidden" ref={triggerRef} />
                <DialogFooter className="justify-between gap-4">
                    <Button
                        full
                        variant="fatal-outline"
                        onClick={() => setIsDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        full
                        disabled={IsPendingChangeBillingPlan}
                        onClick={handleChangeBillingPlan}
                    >
                        Confirm
                        {IsPendingChangeBillingPlan && <Spinner className="w-4 h-4 ml-4" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}