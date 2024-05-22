import {
    Button,
    Input,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components";
import {
    HiMinus,
    HiPlus
} from "react-icons/hi2";
import { useStepperContext } from "../stepper/stepper.context";
import { useFormContext } from "react-hook-form";
import { useCheckOutStore } from "@/store";
import { confirmMembership, generateMembership } from '@/api/auth';
import { useSession } from "next-auth/react";

type K = keyof {};

export function PaymentList() {
    const { nextStep } = useStepperContext();
    const { products, increaseProductQuantity, decreaseProductQuantity, removeProduct } = useCheckOutStore();
    const form = useFormContext<{
        coupon: string
        hasCompletedMemberShip: boolean
    }>();
    const session = useSession();

    const subscriptions = products.filter(product => product.data.type === "subscription");
    const bundles = products.filter(product => product.data.type === "bundle");

    const handleNext = () => {
        if (session.data?.user.user) {
            const payload = {
                coupon: form.getValues("coupon") || null,
                user: session.data?.user.user.id,
                prices: products
                    .map(product => product.data.prices[0])
                    .map(price => ({
                        price: price.id,
                        quantity: 1
                    }))
            }

            confirmMembership(payload)
                .then(res => {
                    form.setValue("hasCompletedMemberShip", true);
                    nextStep();
                })
                .catch(err => {
                    const errors = err.response.data;

                    if (errors && typeof errors === "object") {
                        Object.entries(errors).forEach((error) => {
                            const [key, val] = error as [K, [string]];

                            if (key === "coupon") {
                                form.setError(key, {
                                    message: val[0]
                                });
                            }
                        });
                    }
                })
        }
    }

    return (
        <article className="flex flex-col justify-between h-full">
            <header className="block sm:hidden text-center">
                <h6 className="text-2xl font-normal">Select payment method</h6>
                <p className="text-lg leading-[27px] font-normal">You will be charged $99.96</p>
            </header>

            <main>
                <table className="w-full">
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
                                    <td className="font-normal py-2" align="right">${subscription.data.prices.sort((a, b) => a.sort_order - b.sort_order)[0]?.unit_amount || 0}</td>
                                </tr>
                            ))}

                            <tr>
                                <td colSpan={3} className="pt-2 pb-8">
                                    <Form {...form}>
                                        <form>
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
                                        </form>
                                    </Form>
                                </td>
                            </tr>
                        </>
                    )}

                    {/* Bundles */}
                    {/* <tr>
                        <td className="font-semibold py-2">45 Entires</td>
                        <td className="align-middle py-2" valign="middle" align="right">
                            <Button className="mt-1 p-1 gap-1 cursor-default" variant="fatal">
                                <HiMinus className="cursor-pointer" />
                                <span className="font-medium text-sm">02</span>
                                <HiPlus className="cursor-pointer" />
                            </Button>
                        </td>
                        <td className="font-normal py-2" align="right">$9.99</td>
                    </tr>
                    <tr>
                        <td className="font-semibold py-2">45 Entires</td>
                        <td className="align-middle py-2" valign="middle" align="right">
                            <Button className="mt-1 p-1 gap-1 cursor-default" variant="fatal">
                                <HiMinus className="cursor-pointer" />
                                <span className="font-medium text-sm">02</span>
                                <HiPlus className="cursor-pointer" />
                            </Button>
                        </td>
                        <td className="font-normal py-2" align="right">$9.99</td>
                    </tr> */}
                    {bundles.map(bundle => (
                        <tr key={bundle.id}>
                            <td className="font-semibold py-2">{bundle.data.number_of_entries} Entires</td>
                            <td className="align-middle py-2" valign="middle" align="right">
                                <Button className="mt-1 p-1 gap-1 cursor-default" variant="fatal">
                                    <HiMinus className="cursor-pointer" onClick={() => decreaseProductQuantity(bundle.id)} />
                                    <span className="font-medium text-sm">{bundle.quantity}</span>
                                    <HiPlus className="cursor-pointer" onClick={() => increaseProductQuantity(bundle.id)} />
                                </Button>
                            </td>
                            <td className="font-normal py-2" align="right">${(bundle.data.prices.sort((a, b) => a.sort_order - b.sort_order)[0]?.unit_amount || 0) * bundle.quantity}</td>
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
                        <td className="font-bold pt-2" align="right">$99.96</td>
                    </tr>
                </table>
            </main>

            <footer className="block sm:hidden">
                <Button
                    full
                    onClick={handleNext}
                >
                    Proceed to payment
                </Button>
            </footer>
        </article>
    )
}
