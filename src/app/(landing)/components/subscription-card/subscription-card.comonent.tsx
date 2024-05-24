import { Button } from "@/components";
import { messages } from "@/shared/constants/messages";
import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority"
import { HiCheck, HiOutlineGift, HiXMark } from "react-icons/hi2";

// const cardClasses = cva("relative overflow-hidden rounded-[24px] max-h-[579px] price-card before:rounded-3xl before:-z-10 z-20", {

const cardClasses = cva("relative overflow-hidden py-8 px-6 rounded-3xl z-20", {
    variants: {
        type: {
            free: "after:bg-white",
            bronze: "after:bg-[#EFECE5]",
            silver: "after:bg-[#DFD7C9]",
            gold: "after:bg-[#C7B8A3]"
        },
        selected: {
            // true: "border-4 border-primary",
            // false: "border-none",
            true: "border-4 border-primary",
            false: "price-card before:rounded-3xl before:-z-10"
        }
    },
    defaultVariants: {
        type: "free",
        selected: false
    }
});

type Props = VariantProps<typeof cardClasses> & {
    title: string
    duration: number
    entries: number
    defaultPrice: number
    discountedPrice: number
    isDiscounted: boolean
    onSelect: () => void
}

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
} } = messages;

const tiersBenefits = {
    free,
    bronze,
    silver,
    gold,
}

type K = keyof typeof tiersBenefits

export function SubscriptionInfoCard({
    title,
    duration,
    entries,
    type = "free",
    defaultPrice,
    discountedPrice,
    isDiscounted,
    selected = false,
    onSelect,
}: Props) {
    return (
        <figure className={cn(cardClasses({ type, selected }))}>
            <div
                className={cn(cva("price-card__bg h-full", {
                    variants: {
                        type: {
                            free: "before:bg-no-repeat before:bg-[0px_-315px] before:opacity-[0.015]",
                            bronze: "before:bg-no-repeat before:bg-[-365px_-315px] before:opacity-[0.015]",
                            silver: "before:bg-no-repeat before:bg-[-475px_-315px] before:opacity-[0.015]",
                            gold: "before:bg-no-repeat before:bg-[-735px_-315px] before:opacity-[0.03]"
                        }
                    }
                })({ type }))}
            >
                <div className="relative flex flex-col items-left gap-8 h-full">
                    <div className="flex flex-col items-center">
                        <p className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                            {title.toUpperCase()}
                        </p>

                        <div className="relative flex flex-col gap-8 items-center pt-[72px] w-full">
                            <div className="flex flex-col items-center gap-1">
                                {isDiscounted && (
                                    <h6
                                        className={cn("absolute top-8 left-1/2 -translate-x-1/2 font-semibold text-3xl line-through", {
                                            "text-[#C7B8A3]": type !== "gold",
                                            "text-[#DFD7C9]": type === "gold"
                                        })}
                                    >
                                        ${defaultPrice}
                                    </h6>
                                )}
                                <h6 className="font-semibold text-4xl">
                                    ${isDiscounted ? discountedPrice : defaultPrice}
                                </h6>
                                <p className="font-normal text-base leading-6">
                                    per {duration} days
                                </p>
                            </div>

                            <hr
                                className={cn(cva("w-full border-t", {
                                    variants: {
                                        type: {
                                            free: "border-[#D1D5DB]",
                                            bronze: "border-[#9CA3AF]",
                                            silver: "border-[#9CA3AF]",
                                            gold: "border-[#D1D5DB]"
                                        }
                                    }
                                })({ type }))}
                            />

                            <div className="flex flex-col gap-2 items-center">
                                <div className="font-normal text-base">
                                    {getMessageA}
                                </div>

                                <div className="flex flex-row gap-2 items-center">
                                    <HiOutlineGift size={24} className="text-primary" />
                                    <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{entries} {entries > 1 ? "Entries" : "Entry"}</span>
                                </div>
                                <div className="font-normal text-base">
                                    {getMessageB}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-left gap-1">
                        {tiersBenefits[type as K].benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-1 items-center">
                                {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                                <div className="text-base text-wrap">
                                    {benefit?.benefit}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex flex-col mt-auto">
                        <Button variant={selected ? "primary" : "fatal-outline"} onClick={onSelect}>
                            {selected ? "Selected" : "Select"}
                        </Button>
                    </div>
                </div>
            </div>
        </figure>
    )
}
