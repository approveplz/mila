import { Button } from "@/components";
import { messages } from "@/shared/constants/messages";
import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority"
import { HiCheck, HiOutlineGift, HiXMark } from "react-icons/hi2";

const cardClasses = cva("relative overflow-hidden border bg-white rounded-[24px] max-h-[579px]", {
    variants: {
        type: {
            free: "",
            bronze: ""
        },
        selected: {
            true: "border-primary",
            false: "border-[#CDCDCD]"
        }
    },
    defaultVariants: {
        type: "free",
        selected: false
    }
});

type Props = VariantProps<typeof cardClasses> & {
    title: string
    amount: number
    duration: number
    entries: number
    onSelect: () => void
}

export function SubscriptionInfoCard({
    title,
    amount,
    duration,
    entries,
    type,
    selected = false,
    onSelect,
}: Props) {
    const { pricing: {
        subscriptionData: {
            free,
            bronze,
            silver,
            gold,
            days,
            getMessageA,
            getMessageB,
            select
        },
        continueWithSelected,
        clearSelection,
    } } = messages;

    return (
        <div className={cn(cardClasses({ type, selected }))}>
            <div className="z-0 cardA opacity-[0.02] absolute bg-[url('/images/subscription.png')] !w-[304px] !h-[579px]" />

            <div className="z-10 relative flex flex-col items-left gap-8  py-8 border-2 rounded-[24px] w-[304px] h-[579px]">
                <div className="flex flex-col items-center px-6">
                    <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                        {title.toUpperCase()}
                    </div>

                    <div className="flex flex-col gap-8 items-center pt-10 w-full">
                        <div className="flex flex-col items-center">
                            <div className="font-semibold text-4xl leading-[40px]">
                                ${amount}
                            </div>
                            <div className="font-normal text-base leading-6">
                                per {duration} days
                            </div>
                        </div>

                        <hr className="w-full border-t border-[#D1D5DB]" />

                        <div className="flex flex-col gap-2 items-center">
                            <div className="font-normal text-base leading-6">
                                {getMessageA}
                            </div>

                            <div className="flex flex-row gap-2 items-center">
                                <HiOutlineGift size={24} className="text-primary" />
                                <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{entries}</span>
                            </div>
                            <div className="font-normal text-base leading-6">
                                {getMessageB}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-left gap-1 px-6">
                    {free?.benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-row gap-[7px] items-center">
                            {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                            <div className="font-normal text-base leading-6">
                                {benefit?.benefit}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="px-6 w-full flex flex-col">
                    <Button variant="fatal-outline" onClick={onSelect}>{select}</Button>
                </div>
            </div>
        </div>
    )
}
