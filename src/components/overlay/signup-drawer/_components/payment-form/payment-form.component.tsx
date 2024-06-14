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
import { Stripe, StripeElementStyleVariant, StripeElements } from '@stripe/stripe-js';
import { useStepperContext } from '../stepper/stepper.context';
import { generateMembership, latestInvoicePaymentStatus, markLatestInvoicePaid } from '@/api/auth';
import { useAuthStore, useCheckOutStore } from '@/store';
import { useFormContext } from 'react-hook-form';
import { getProductPrice, getProductPriceInfo } from '@/utils';
import { Session } from 'next-auth';
import { useMutation } from "@tanstack/react-query";
import { serialize } from "object-to-formdata";
import { useAuthContext } from "@/components/provider/auth/auth.component";
import { Product, User } from "@/entities";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { toast } from "sonner";
import { CheckoutProduct } from "@/store/checkout/checkout.types";
import useTotalAmount from "@/hooks/useTotalAmount";
import { sendGTMEvent } from '@next/third-parties/google'


type K = keyof {};

function calculateTotal(products: Array<CheckoutProduct>) {
    const getPrice = (prices: Product["prices"]) => {
        const actualPrice = getProductPrice(prices);

        if (actualPrice.isDiscounted) {
            return actualPrice.discountedPrice
        } else {
            return actualPrice.defaultPrice
        }
    }

    return products.reduce((accumulator, currentValue) => (getPrice(currentValue.data.prices) * currentValue.quantity) + accumulator, 0).toFixed(2);
}

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

const Header = React.memo(() => {
    const { products } = useCheckOutStore();

    return (
        <div>
            <div className="block sm:hidden text-center">
                <h6 className="text-2xl font-normal">Select payment method</h6>
                <p className="text-lg leading-[27px] font-normal">You will be charged ${calculateTotal(products)}</p>
            </div>
        </div>
    )
});

Header.displayName = "Header";

const LoaderButton = React.memo(({ onClick }: { onClick: () => void }) => {
    const { promiseInProgress } = usePromiseTracker();
    const [isDisabled, setIsDisabled] = React.useState(false);
    const { totalAmount } = useTotalAmount();

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

                sendGTMEvent({ event: 'add_payment_info', value: { value: totalAmount, currency: 'USD' } });
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

export function PaymentForm({ session }: { session: Session | null }) {
    const { nextStep } = useStepperContext();
    const { authUser } = useAuthStore();
    const isLoading = React.useRef(false);
    const { authFormAction, resultAuthFormAction } = useAuthContext();

    const { watch, setError } = useFormContext<{ coupon: string }>();
    const coupon = watch("coupon")
    const setCouponError = React.useCallback((key: K, message: string) => {
        setError(key, { message });
    }, [setError]);

    const setLoading = (status: boolean) => {
        isLoading.current = status;
    }

    const { mutateAsync: checkInvoicePaymentStatusAsyncMutate } = useMutation({
        mutationFn: (payload: { secret: string, userId: string }) => latestInvoicePaymentStatus(payload).then(res => {
            if (res.is_paid) {
                return res;
            } else {
                throw new Error("User is inactive")
            }
        }),
        async onSuccess(data, variables) {
            if (authUser) {
                const res = await authFormAction(serialize({
                    email: authUser.email,
                    password: authUser.password,
                    redirect: false
                }));

                return res;
            }
        },
        retry(failureCount, error) {
            if (failureCount > 15) {
                toast.error("Something went wrong!");
                return false;
            };

            return true;
        },
        retryDelay: 2000
    });

    const { mutateAsync: markLatestInvoicePaidAsyncMutate } = useMutation({
        mutationFn: (payload: { secret: string, userId: string }) => markLatestInvoicePaid(payload),
        onSuccess(data, variables) {
            return checkInvoicePaymentStatusAsyncMutate(variables).then(res => res.is_paid);
        },
    });

    const { mutateAsync: latestInvoicePaymentStatusAsyncMutate } = useMutation({
        mutationFn: (payload: { secret: string, userId: string }) => latestInvoicePaymentStatus(payload),
        async onSuccess(data, variables) {
            if (data.is_paid) {
                if (authUser) {
                    const res = await authFormAction(serialize({
                        email: authUser.email,
                        password: authUser.password,
                        redirect: false
                    }));

                    return res;
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
        if (authUser) {
            const payload = {
                coupon: coupon || null,
                user: authUser.id,
                prices: getProductsPrices()
            }

            // create a payment method
            const { paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardNumberElement)!,
                // billing_details: {
                //     name,
                //     email,
                // },
            })

            trackPromise(generateMembership({ ...payload, payment_method: paymentMethod?.id })
                .then(async (res) => {
                    const { error, paymentIntent } = await stripe.confirmCardPayment(res.client_secret, {
                        payment_method: {
                            card: elements.getElement(CardNumberElement)!
                        }
                    })

                    if (error) {
                        toast.error(error.message)
                    } else {
                        return latestInvoicePaymentStatusAsyncMutate({ userId: authUser.id, secret: process.env.NEXT_PUBLIC_API_SECRET! })
                    }
                })
                .then(res => res?.is_paid)
                .catch(err => {
                    if (err && typeof err === "object") {
                        if (coupon) {
                            Object.entries(err).forEach((error) => {
                                const [key, val] = error as [K, [string]];

                                if (key === "coupon") {
                                    setCouponError(key, val[0]);
                                }
                            });
                        }
                    }
                }))
        }
    }, [authUser, latestInvoicePaymentStatusAsyncMutate, getProductsPrices, coupon, setCouponError])

    const renderActions = React.useCallback((handlePayment: () => void) => (
        <LoaderButton onClick={handlePayment} />
    ), []);

    React.useEffect(() => {
        if (resultAuthFormAction) {
            if (resultAuthFormAction.status === "success") {
                setLoading(false);
                nextStep();
            } else if (resultAuthFormAction.status === "failed") {
                setLoading(false);
            }
        }
    }, [resultAuthFormAction, nextStep])

    return (
        <form className="flex flex-col flex-1 w-full sm:flex-initial justify-center gap-6">
            <Header />

            <PaymentFormGroup
                paymentCallBack={onPayment}
                actions={renderActions}
            />
        </form>
    )
}
