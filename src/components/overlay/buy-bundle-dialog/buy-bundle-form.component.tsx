"use client";

import * as React from "react";
import { Button, Input, Label, Spinner } from '@/components';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { Stripe, StripeElement, StripeElementStyleVariant, StripeElements } from '@stripe/stripe-js';
import { confirmMembership, generateMembership, latestInvoicePaymentStatus, markLatestInvoicePaid } from '@/api/auth';
import { useAuthStore, useCheckOutStore } from '@/store';
import { useFormContext } from 'react-hook-form';
import { getProductPriceInfo, setFormError, withAsync } from '@/utils';
import { Session } from 'next-auth';
import { useMutation } from "@tanstack/react-query";
import { serialize } from "object-to-formdata";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { useAuthContext } from "@/components/provider/auth/auth.component";
import { User } from "@/entities";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { toast } from "sonner";

type K = keyof {};

const inputStylesBase: StripeElementStyleVariant = {
    fontSize: "14px",
    color: "#171614",
    fontFamily: "Inter",
    fontWeight: 400,
    "::placeholder": {
        color: "#9CA3AF",
        fontFamily: "Inter",
        fontWeight: 400
    }
}

const LoaderButton = React.memo(({ onClick }: { onClick: () => void }) => {
    const { promiseInProgress } = usePromiseTracker();
    const [isDisabled, setIsDisabled] = React.useState(false);

    React.useEffect(() => {
        if (isDisabled) {
            const timer = setTimeout(() => {
                setIsDisabled(false);
            }, 3000); 
            
            return () => clearTimeout(timer);
        }
    }, [isDisabled]);

    return (
        <Button
            type="button"
            disabled={promiseInProgress || isDisabled}
            onClick={() => {
                setIsDisabled(true);
                onClick()
            }}
        >
            Pay
            {(promiseInProgress || isDisabled) && <Spinner className="w-4 h-4 ml-4" />}
        </Button>
    )
});

LoaderButton.displayName = "LoaderButton";

const PaymentFormGroup = React.memo(({
    actions,
    paymentCallBack
}: {
    actions: (handlePayment: () => void) => React.ReactNode,
    paymentCallBack: (stripe: Stripe, elements: StripeElements) => void
}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = React.useCallback(() => {
        if (!stripe || !elements) {
            return;
        }

        paymentCallBack(stripe, elements)
    }, [stripe, elements, paymentCallBack])

    return (
        <>
            <div className="flex flex-col gap-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <Label htmlFor="card">Credit card number</Label>
                    <Input
                        id="card"
                        as={(props) => (
                            <CardNumberElement
                                {...props}
                                options={{
                                    style: {
                                        base: inputStylesBase
                                    }
                                }}
                            />
                        )}
                    />
                </div>

                <div className="flex gap-6 w-full">
                    <div className="flex-1">
                        <Label htmlFor="expiration">Expiration date</Label>
                        <Input
                            id="expiration"
                            as={(props) => (
                                <CardExpiryElement
                                    {...props}
                                    options={{
                                        style: {
                                            base: inputStylesBase
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                            id="cvv"
                            as={(props) => (
                                <CardCvcElement
                                    {...props}
                                    options={{
                                        style: {
                                            base: inputStylesBase
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            {actions(handlePayment)}
        </>
    )
}, (prevProps, nextProps) => {
    return prevProps.actions === nextProps.actions && prevProps.paymentCallBack === nextProps.paymentCallBack;
});

PaymentFormGroup.displayName = "PaymentFormGroup";

export function PaymentForm() {
    const { authUser } = useAuthStore();

    const { mutate: checkInvoicePaymentStatusMutate, mutateAsync: checkInvoicePaymentStatusAsyncMutate } = useMutation({
        mutationFn: (payload: { secret: string, userId: string }) => latestInvoicePaymentStatus(payload).then(res => {
            if (res.is_paid) {
                return res;
            } else {
                throw new Error("User is inactive")
            }
        }),
        async onSuccess(data, variables) {
            if (authUser) {
                return null;
            }
        },
        retry(failureCount, error) {
            if (failureCount > 3) return false;

            return true;
        },
        retryDelay: 2000
    });

    const { mutate: markLatestInvoicePaidMutate, mutateAsync: markLatestInvoicePaidAsyncMutate } = useMutation({
        mutationFn: (payload: { secret: string, userId: string }) => markLatestInvoicePaid(payload),
        onSuccess(data, variables) {
            return checkInvoicePaymentStatusAsyncMutate(variables).then(res => res.is_paid);
        },
    });

    const { mutate: latestInvoicePaymentStatusMutate, mutateAsync: latestInvoicePaymentStatusAsyncMutate } = useMutation({
        mutationFn: (payload: { secret: string, userId: string }) => latestInvoicePaymentStatus(payload),
        async onSuccess(data, variables) {
            if (data.is_paid) {
                if (authUser) {
                    return null;
                }
            } else {
                return markLatestInvoicePaidAsyncMutate(variables).then(res => res.processing)
            }
        },
    });

    const getProductsPrices = React.useCallback(() => {
        return useCheckOutStore.getState().products
            .map(product => {
                const { discountedPrice, defaultPrice } = getProductPriceInfo(product.data.prices)

                if (!!discountedPrice) {
                    return {
                        price: discountedPrice.id,
                        quantity: product.quantity
                    }
                } else {
                    return {
                        price: defaultPrice.id,
                        quantity: product.quantity
                    }
                }
            })
    }, [])

    const onPayment = React.useCallback(async (stripe: Stripe, elements: StripeElements) => {
        
    }, [])

    const renderActions = React.useCallback((handlePayment: () => void) => (
        <LoaderButton onClick={handlePayment} />
    ), []);

    return (
        <form className="flex flex-col flex-1 w-full sm:flex-initial justify-center gap-6">
            <div>
                <div className="block sm:hidden text-center">
                    <h6 className="text-2xl font-normal">Select payment method</h6>
                    <p className="text-lg leading-[27px] font-normal">You will be charged $99.96</p>
                </div>
            </div>

            <PaymentFormGroup
                paymentCallBack={onPayment}
                actions={renderActions}
            />
        </form>
    )
}
