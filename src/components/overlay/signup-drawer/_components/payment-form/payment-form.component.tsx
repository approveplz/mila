"use client";

import { Button, Input, Label } from '@/components';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { StripeElementStyleVariant } from '@stripe/stripe-js';
import * as React from "react";
import { useStepperContext } from '../stepper/stepper.context';
import { confirmMembership, generateMembership } from '@/api/auth';
import { useCheckOutStore } from '@/store';
import { useSession } from 'next-auth/react';
import { useFormContext } from 'react-hook-form';

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

export function PaymentForm() {
    const { products } = useCheckOutStore();
    const { nextStep } = useStepperContext();
    const session = useSession();
    const stripe = useStripe();
    const elements = useElements();

    const couponForm = useFormContext<{ coupon: string, hasCompletedMemberShip: boolean }>();

    const handlePayment = async () => {
        if (!stripe || !elements) {
            return;
        }

        if (session.data?.user.user) {
            const payload = {
                coupon: couponForm.getValues("coupon") || null,
                user: session.data?.user.user.id,
                prices: products
                    // .map(product => product.data.prices[0])
                    // .map(price => ({
                    //     price: price.id,
                    //     quantity: 1
                    // }))
                    .map(product => ({
                        price: product.data.prices[0].id,
                        quantity: product.quantity
                    }))
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
                        } else {
                            nextStep();
                        }
                    })
                    .catch(err => {
                        console.log("err: ", err);
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
                            console.log("error: ", error);
                        } else {
                            nextStep();
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
                    })

            }
        }
    }

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
                disabled={false}
                onClick={handlePayment}
            >
                Pay
            </Button>
        </form>
    )
}
