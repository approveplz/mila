"use client";

import * as React from "react";
import { Button, Container, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Drawer, DrawerContent, Spinner } from "@/components";
import { HiArrowUpRight } from "react-icons/hi2";
import { useCheckOutStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { changeBillingPlan, checkInvoicePaymentStatus, nextBillingCycle } from "@/api/auth";
import { getProductPrice, getProductPriceInfo } from "@/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { Price, Product } from "@/entities";
import { useCurrentSession } from "@/hooks";
import { GetCheckInvoicePaymentStatusParams } from "@/api/auth/auth.types";
import { BuyBundlePayment } from "@/components/overlay/buy-subscription-dialog/buy-bundle-payment.component";

const tiersOrder = ['free', 'bronze', 'silver', 'gold'];
// {tiersOrder.indexOf(type as string) > tiersOrder.indexOf(subscribedProduct.tier) ? "Upgrade" : "Downgrade"}

export function SubscriptionAction({ subscriptions = [] }: { subscriptions: Array<Product> }) {
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [paymentClientSecret, setPaymentClientSecret] = React.useState<string | null>(null);
    const { products } = useCheckOutStore();
    const { session } = useCurrentSession();
    const [showPaymentDialog, setShowPaymentDialog] = React.useState(false);

    const selectSubscriptions = products.filter(prod => prod.data.type === "subscription");
    const newSubscription = selectSubscriptions[0];
    const currentSubscription = React.useMemo(() => {
        if (session) {
            if (session.user.user.metadata.subscribed_products.length > 0) {
                return subscriptions.find(sub => session.user.user.metadata.subscribed_products.some(prod => prod.product === sub.id))
            } else {
                return subscriptions.find(sub => sub.tier === "free");
            }
        }
    }, [session, subscriptions]);

    const changePlanType = React.useMemo(() => {
        if (currentSubscription && newSubscription) {
            if (tiersOrder.indexOf(newSubscription.data.tier as string) < tiersOrder.indexOf(currentSubscription.tier as string)) {
                return "downgrade";
            }

            return "upgrade";
        }
    }, [currentSubscription, newSubscription])

    const displayPrice = (prices: Price[]) => {
        const { isDiscounted, defaultPrice, discountedPrice } = getProductPrice(prices);

        if (isDiscounted) {
            return discountedPrice
        }

        return defaultPrice
    }

    const { mutate: checkInvoicePaymentStatusMutate, isPending: IsPendingCheckInvoicePaymentStatus } = useMutation({
        mutationFn: (params: GetCheckInvoicePaymentStatusParams) => checkInvoicePaymentStatus(params).then(res => {
            if (res.is_paid) {
                return res;
            } else {
                throw new Error("User is inactive")
            }
        }),
        onSuccess(data, variables, context) {
            toast("Successfully upgraded subscription")
            setIsDialogOpen(false);
            window.location.reload()
        },
        onError(error, variables, context) {
            setIsDialogOpen(false);
            toast.error("Error occurred while upgrading subscription")
        },
        retry(failureCount, error) {
            if (failureCount > 15) return false;

            return true;
        },
        retryDelay: 2000
    })

    const { mutate: nextBillingCycleMutate, isPending: isPendingNextBillingCycle, data: nextBillingCycleData } = useMutation({
        mutationFn: (payload: { price: string }) => nextBillingCycle(payload),
        onSuccess(data) {
            setIsDialogOpen(true);
        },
        onError(error) {
            toast.error("Something went wrong!");
        },
    });

    const { mutateAsync: changeBillingPlanMutate, isPending: IsPendingChangeBillingPlan } = useMutation({
        mutationFn: (payload: { price: string }) => changeBillingPlan(payload),
        onError(error) {
            setIsDialogOpen(false);
            toast.error("Something went wrong!");
        },
    });

    const handleChangeBillingPlan = () => {
        if (newSubscription) {
            const { discountedPrice, defaultPrice } = getProductPriceInfo(newSubscription.data.prices);

            changeBillingPlanMutate({ price: (!!discountedPrice) ? discountedPrice.id : defaultPrice.id })
                .then(res => {
                    if (res.operation === "subscription") {
                        if (res.client_secret) {
                            setIsDialogOpen(false);
                            setShowPaymentDialog(true);
                            setPaymentClientSecret(res.client_secret)
                        }
                    }

                    if (res.operation === "upgrade") {
                        if (res.client_secret) {
                            setIsDialogOpen(false);
                            setShowPaymentDialog(true);
                            setPaymentClientSecret(res.client_secret)
                        } else if (res.invoice) {
                            checkInvoicePaymentStatusMutate({ invoiceId: res.invoice })
                        }
                    }

                    if (res.operation === "downgrade") {
                        setIsDialogOpen(false);
                        toast("The plan is scheduled for a downgrade");
                        // window.location.reload();
                    }

                    if (res.operation === "no_change") {
                        setIsDialogOpen(false);
                        toast.error("The plan is already scheduled");
                        // window.location.reload();
                    }
                })
        }
    }

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={state => setIsDialogOpen(state)}>
                {selectSubscriptions.length > 0 && (
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
                )}
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
                            By {changePlanType === "downgrade" ? "downgrading" : "upgrading"} {" "}
                            {changePlanType === "downgrade" ? `you will be scheduled to downgrade to ${newSubscription?.data.name.toUpperCase()} benefits at the end of your current billing cycle.` : `you will be immediately upgraded to the ${newSubscription?.data.name.toUpperCase()} benefits and entries and the cost will pro-rate to the new subscription.`}
                            Your next billing cycle will be on {format(nextBillingCycleData?.next_cycle ?? new Date(), "MM/dd/yyyy")}.
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
                            disabled={IsPendingChangeBillingPlan || IsPendingCheckInvoicePaymentStatus}
                            onClick={handleChangeBillingPlan}
                        >
                            Confirm
                            {(IsPendingChangeBillingPlan || IsPendingCheckInvoicePaymentStatus) && <Spinner className="w-4 h-4 ml-4" />}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Drawer
                dismissible={false}
                nested={true}
                open={showPaymentDialog}
                onOpenChange={(state) => {
                    setShowPaymentDialog(state)

                    if (state === false) {
                        window.location.reload()
                    }
                }}
            >
                <DrawerContent className="bg-white h-full rounded-none z-[9999] max-h-screen">
                    {paymentClientSecret && <BuyBundlePayment clientSecret={paymentClientSecret} />}
                </DrawerContent>
            </Drawer>
        </>
    )
}