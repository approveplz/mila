import {
    Button,
    Input,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Spinner
} from "@/components";
import {
    HiMinus,
    HiPlus
} from "react-icons/hi2";
import { useStepperContext } from "../stepper/stepper.context";
import { useFormContext } from "react-hook-form";
import { useAuthStore, useCheckOutStore } from "@/store";
import { confirmMembership } from '@/api/auth';
import { getProductPrice, getProductPriceInfo, setFormError } from "@/utils";
import { Price, Product } from "@/entities";
import { CheckoutProduct } from "@/store/checkout/checkout.types";
import { useMutation } from "@tanstack/react-query";
import { isApiError } from "@/api";
import { toast } from "sonner";
import { ConfirmMembershipPayload } from "@/api/auth/auth.types";

type CouponFormData = {
    coupon: string
    isCouponApplied: boolean
}

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

function PriceSelector({ prices, view }: { prices: Array<Price>, view: (price: number) => React.ReactNode }) {
    const { isDiscounted, defaultPrice, discountedPrice } = getProductPrice(prices);

    return (
        <>
            {view(isDiscounted ? discountedPrice : defaultPrice)}
        </>
    )
}

export function PaymentList() {
    const { nextStep } = useStepperContext();
    const { authUser } = useAuthStore();
    const { products, increaseProductQuantity, decreaseProductQuantity, removeProduct } = useCheckOutStore();
    const form = useFormContext<CouponFormData>();

    const { mutate, isPending, isSuccess, data, reset } = useMutation({
        mutationFn: (payload: ConfirmMembershipPayload) => confirmMembership(payload),
        onSuccess(data, variables, context) {
            form.setValue("isCouponApplied", true);
        },
        onError(error, variables, context) {
            if (isApiError(error) && error.response) {
                setFormError<CouponFormData>(error.response.data, form.setError)
            } else {
                toast.error("Something went wrong!");
            }
        },
        mutationKey: ["ApplyCoupon"]
    })

    const subscriptions = products.filter(product => product.data.type === "subscription");
    const bundles = products.filter(product => product.data.type === "bundle");

    const handleRemoveCoupon = () => {
        reset();
    }

    const onSubmit = (values: CouponFormData) => {
        if (authUser) {
            mutate({
                coupon: form.getValues("coupon") || null,
                user: authUser.id,
                prices: products
                    // .map(product => product.data.prices[0])
                    // .map(price => ({
                    //     price: price.id,
                    //     quantity: 1
                    // }))
                    .map(product => {
                        const { discountedPrice, defaultPrice } = getProductPriceInfo(product.data.prices);

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
            })
        }
    }

    return (
        <article className="flex flex-col justify-between h-full">
            <header className="block sm:hidden text-center">
                <h6 className="text-2xl font-normal">Select payment method</h6>
                <p className="text-lg leading-[27px] font-normal">You will be charged ${calculateTotal(products)}</p>
            </header>

            <main>
                <table className="w-full">
                    <tbody>
                        {/* Subscriptions */}
                        {subscriptions.length > 0 && (
                            <>
                                {subscriptions.map(subscription => (
                                    <tr key={subscription.id}>
                                        <td className="font-semibold py-2 w-full">{subscription.data.name}</td>
                                        <td className="align-middle" valign="middle" align="right">
                                            {bundles.length > 0 && (
                                                <Button className="w-6 h-5 p-1 mt-1" variant="fatal" onClick={() => removeProduct(subscription.id)}>
                                                    <HiMinus />
                                                </Button>
                                            )}
                                        </td>
                                        <PriceSelector
                                            prices={subscription.data.prices}
                                            view={price => (
                                                <td className="font-normal py-2" align="right">
                                                    <div className="flex items-center w-full justify-end">
                                                        {/* <p>10</p> */}
                                                        <p>${price}</p>
                                                    </div>
                                                </td>
                                            )}
                                        />
                                    </tr>
                                ))}

                                <tr>
                                    <td colSpan={3} className="pt-2 pb-8">
                                        {data ? (
                                            <Button
                                                variant="fatal"
                                                className="mt-2"
                                                onClick={handleRemoveCoupon}
                                                type="button"
                                                full
                                            >
                                                Remove Coupon
                                            </Button>
                                        ) : (
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                                    <FormField
                                                        control={form.control}
                                                        name="coupon"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel htmlFor="coupon">Subscription Coupon Code</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        id="coupon"
                                                                        placeholder="e.g.35639234"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <Button
                                                        variant="fatal"
                                                        className="mt-2"
                                                        type="submit"
                                                        disabled={isPending}
                                                        full
                                                    >
                                                        Apply Coupon
                                                        {isPending && <Spinner className="w-4 h-4 ml-4" />}
                                                    </Button>
                                                </form>
                                            </Form>
                                        )}
                                    </td>
                                </tr>
                            </>
                        )}

                        {/* Bundles */}
                        {bundles.map(bundle => (
                            <tr key={bundle.id}>
                                <td className="font-semibold py-2">{bundle.data.number_of_entries} Entries</td>
                                <td className="align-middle py-2" valign="middle" align="right">
                                    <Button className="mt-1 p-1 gap-1 cursor-default" variant="fatal">
                                        <HiMinus className="cursor-pointer" onClick={() => decreaseProductQuantity(bundle.id)} />
                                        <span className="font-medium text-sm">{bundle.quantity}</span>
                                        <HiPlus className="cursor-pointer" onClick={() => increaseProductQuantity(bundle.id)} />
                                    </Button>
                                </td>
                                <PriceSelector
                                    prices={bundle.data.prices}
                                    view={price => <td className="font-normal py-2" align="right">${(price * bundle.quantity).toFixed(2)}</td>}
                                />
                            </tr>
                        ))}

                        {/* Total */}
                        <tr>
                            <td className="py-2" colSpan={3}>
                                <hr />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold pt-2" colSpan={2}>TOTAL:</td>
                            <td className="font-bold pt-2" align="right">${data ? data.total : calculateTotal(products)}</td>
                        </tr>
                    </tbody>
                </table>
            </main>

            <footer className="block sm:hidden">
                <Button
                    full
                    onClick={nextStep}
                >
                    Proceed to payment
                </Button>
            </footer>
        </article>
    )
}
