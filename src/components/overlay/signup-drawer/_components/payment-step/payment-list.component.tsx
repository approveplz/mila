import { Button, Input, Label } from "@/components";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { useStepperContext } from "../stepper/stepper.context";

export function PaymentList() {
    const { nextStep } = useStepperContext();

    return (
        <article className="flex flex-col justify-between h-full">
            <header className="block sm:hidden text-center">
                <h6 className="text-2xl font-normal">Select payment method</h6>
                <p className="text-lg leading-[27px] font-normal">You will be charged $99.96</p>
            </header>

            <main>
                <table className="w-full">
                    <tr>
                        <td className="font-semibold py-2">Bronze Subscription</td>
                        <td className="align-middle" valign="middle" align="right">
                            <Button className="w-6 h-5 p-1 mt-1" variant="fatal">
                                <HiMinus />
                            </Button>
                        </td>
                        <td className="font-normal py-2" align="right">$9.99</td>
                    </tr>
                    <tr>
                        <td colSpan={3} className="pt-2 pb-8">
                            <div>
                                <Label>Subscription Coupon Code</Label>
                                <Input placeholder="e.g.35639234" />
                            </div>
                        </td>
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
                    </tr>
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
                <Button full onClick={nextStep}>Proceed to payment</Button>
            </footer>
        </article>
    )
}
