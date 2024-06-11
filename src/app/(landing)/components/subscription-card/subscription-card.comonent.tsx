import { Button } from "@/components";
import { messages } from "@/shared/constants/messages";
import { cn, formatPrice } from "@/utils";
import { formatNumberWithCommas } from "@/utils/currency";
import { VariantProps, cva } from "class-variance-authority"
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { HiCheck, HiOutlineGift, HiXMark } from "react-icons/hi2";

// const cardClasses = cva("relative overflow-hidden rounded-[24px] max-h-[579px] price-card before:rounded-3xl before:-z-10 z-20", {

const cardClasses = cva("relative overflow-hidden p-6 rounded-3xl z-20 w-full ", {
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
    session: Session | null
    cardId: string
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
    cardId,
    title,
    duration,
    entries,
    type = "free",
    defaultPrice,
    discountedPrice,
    isDiscounted,
    selected = false,
    onSelect,
    session
}: Props) {

    const isLoggedIn = !!session;

    const [isCardSelected, selectIsCardSelected] = useState<boolean>(false)

    useEffect(() => {
        if (isLoggedIn && session) {
            session?.user?.user?.metadata?.subscribed_products?.forEach((item) => {
                if (item.product === cardId) {
                    selectIsCardSelected(true)
                }
            })
        }
    }, [session])


    return (
        <figure className="w-full">
            <div className={cn(cardClasses({ type, selected: (isLoggedIn && isCardSelected) || (!isLoggedIn && selected) }))}>
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
                        <div className="flex flex-col gap-8 items-left">
                            <p className="font-tt-ramillas font-medium text-[30px] leading-9">
                                {title.toUpperCase()}
                            </p>

                            <div className="relative flex flex-col gap-8 items-left  w-full">
                                <div className="flex flex-col items-left gap-1">
                                    {/* {isDiscounted ? (
                                    <h6
                                        className={cn("font-semibold text-[20px] leading-[24.2px] line-through", {
                                            "text-[#C7B8A3]": type !== "gold",
                                            "text-[#DFD7C9]": type === "gold"
                                        })}
                                    >
                                        ${defaultPrice}
                                    </h6>
                                ) : (
                                    <div>
                                        <h6 className="font-semibold text-[20px] leading-[24.2px] line-through text-white">
                                            ${defaultPrice}
                                        </h6>
                                    </div>
                                )} */}
                                    <h6 className="font-light text-5xl leading-[48px]">
                                        ${formatPrice(isDiscounted ? discountedPrice : defaultPrice)}
                                    </h6>
                                    <div className="font-normal text-base leading-6">
                                        Per Month
                                    </div>
                                </div>

                                {/* <hr
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
                            /> */}

                                <div className="flex flex-col gap-2 items-left">
                                    {/* <div className="font-normal text-base leading-6">
                                    {getMessageA}
                                </div> */}

                                    <div className="flex flex-row gap-2 items-center">
                                        <HiOutlineGift size={24} className="text-primary" />
                                        <span className="font-tt-ramillas text-[26px] font-semibold leading-[38.6px] text-primary">{formatNumberWithCommas(entries)} {entries > 1 ? "Entries" : "Entry"}</span>
                                    </div>
                                    {/* <div className="font-normal text-base leading-6">
                                    {getMessageB}
                                </div> */}
                                </div>
                            </div>
                        </div>

                        {/* <div className="flex flex-col items-left gap-1">
                        {tiersBenefits[type as K].benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-1 items-center">
                                {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                                <div className="text-sm leading-6 font-normal">
                                    {benefit?.benefit}
                                </div>
                            </div>
                        ))}
                    </div> */}

                        {!isLoggedIn && <div className="w-full flex flex-col ">
                            <Button variant={selected ? "primary" : "fatal-outline"} onClick={onSelect}>
                                {selected ? "Selected" : "Select"}
                            </Button>
                        </div>}

                        {(isLoggedIn && isCardSelected) && <div className="w-full flex flex-col">
                            <Button variant="primary" >
                                Selected
                            </Button>
                        </div>}
                    </div>
                </div>
            </div>

            <div className="px-6 py-4 flex flex-col items-left gap-1">
                {tiersBenefits[type as K].benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-1 items-center">
                        {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                        <div className="text-[14px] leading-6 font-normal">
                            {benefit?.benefit}
                        </div>
                    </div>
                ))}
            </div>
        </figure>
    )
}
