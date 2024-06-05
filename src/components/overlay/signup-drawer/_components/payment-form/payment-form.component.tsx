"use client";

import * as React from "react";
import { Button, Input, Label } from '@/components';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { StripeElementStyleVariant } from '@stripe/stripe-js';
import { useStepperContext } from '../stepper/stepper.context';
import { confirmMembership, generateMembership, latestInvoicePaymentStatus, markLatestInvoicePaid } from '@/api/auth';
import { useAuthStore, useCheckOutStore } from '@/store';
import { useFormContext } from 'react-hook-form';
import { getProductPriceInfo, setFormError, withAsync } from '@/utils';
import { Session } from 'next-auth';
import { useMutation } from "@tanstack/react-query";
import { serialize } from "object-to-formdata";
import * as actions from "@/actions";
import { useFormState } from "react-dom";

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

export function PaymentForm({ session }: { session: Session | null }) {
    const { products } = useCheckOutStore();
    const { nextStep } = useStepperContext();
    const { authUser } = useAuthStore();
    const isLoading = React.useRef(false);
    const stripe = useStripe();
    const elements = useElements();

    const couponForm = useFormContext<{ coupon: string, hasCompletedMemberShip: boolean }>();
    const [resultAuthFormAction, authFormAction] = useFormState(actions.authSignIn, {
        status: 'idle',
        error: ''
    });

    const setLoading = (status: boolean) => {
        isLoading.current = status;
    }

    const { mutate: checkInvoicePaymentStatusMutate } = useMutation({
        mutationFn: (payload: { secret: string, userId: string }) => latestInvoicePaymentStatus(payload).then(res => {
            if (res.is_paid) {
                return res;
            } else {
                throw new Error("User is inactive")
            }
        }),
        async onSuccess(data, variables) {
            if (authUser) {
                authFormAction(serialize({
                    email: authUser.email,
                    password: authUser.password,
                    redirect: false
                }));
            }
        },
        retry(failureCount, error) {
            if (failureCount > 3) return false;

            return true;
        },
        retryDelay: 2000
    });

    const { mutate: markLatestInvoicePaidMutate } = useMutation({
        mutationFn: (payload: { secret: string, userId: string }) => markLatestInvoicePaid(payload),
        onSuccess(data, variables) {
            checkInvoicePaymentStatusMutate(variables);
        },
    });

    const { mutate: latestInvoicePaymentStatusMutate } = useMutation({
        mutationFn: (payload: { secret: string, userId: string }) => latestInvoicePaymentStatus(payload),
        async onSuccess(data, variables) {
            if (data.is_paid) {
                if (authUser) {
                    authFormAction(serialize({
                        email: authUser.email,
                        password: authUser.password,
                        redirect: false
                    }));
                }
            } else {
                markLatestInvoicePaidMutate(variables)
            }
        },
    });

    console.log(isLoading)

    const handlePayment = async () => {
        if (!stripe || !elements) {
            return;
        }

        if (authUser) {
            setLoading(true);

            const payload = {
                coupon: couponForm.getValues("coupon") || null,
                user: authUser.id,
                prices: products
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

            if (couponForm.getValues("hasCompletedMemberShip")) {
                generateMembership({ ...payload, payment_method: paymentMethod?.id })
                    .then(async (res) => {
                        const { error, paymentIntent } = await stripe.confirmCardPayment(res.client_secret, {
                            payment_method: {
                                card: elements.getElement(CardNumberElement)!
                            }
                        })

                        if (error) {
                            console.log("error: ", error);
                            setLoading(false);
                        } else {
                            latestInvoicePaymentStatusMutate({ userId: authUser.id, secret: process.env.NEXT_PUBLIC_API_SECRET! })
                        }
                    })
                    .catch(err => {
                        console.log("err: ", err);
                        setLoading(false);
                    })
            } else {
                confirmMembership(payload)
                    .then(async (res) => generateMembership({ ...payload, payment_method: paymentMethod?.id }))
                    .then(async (res) => {
                        const { error, paymentIntent } = await stripe.confirmCardPayment(res.client_secret, {
                            payment_method: {
                                card: elements.getElement(CardNumberElement)!
                            }
                        })

                        if (error) {
                            setLoading(false);
                        } else {
                            latestInvoicePaymentStatusMutate({ userId: authUser.id, secret: process.env.NEXT_PUBLIC_API_SECRET! })
                        }
                    })
                    .catch(err => {
                        const errors = err.response.data;

                        if (errors && typeof errors === "object") {
                            Object.entries(errors).forEach((error) => {
                                const [key, val] = error as [K, [string]];

                                if (key === "coupon") {
                                    couponForm.setError(key, {
                                        message: val[0]
                                    });
                                }
                            });
                        }

                        setLoading(false);
                    })
            }
        }
    }

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
            <div>
                <div className="block sm:hidden text-center">
                    <h6 className="text-2xl font-normal">Select payment method</h6>
                    <p className="text-lg leading-[27px] font-normal">You will be charged $99.96</p>
                </div>
            </div>

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

            <Button
                type="button"
                disabled={isLoading.current}
                onClick={handlePayment}
            >
                Pay
            </Button>
        </form>
    )
}
