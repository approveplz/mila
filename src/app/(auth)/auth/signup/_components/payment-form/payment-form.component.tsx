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
    const { nextStep } = useStepperContext();
    const stripe = useStripe();
    const elements = useElements();
    
    return (
        <form className="flex flex-col gap-6">
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

            {/* <Button type="submit" disabled={false}>Pay</Button> */}
            <Button type="button" disabled={false} onClick={nextStep}>Next</Button>
        </form>
    )
}
