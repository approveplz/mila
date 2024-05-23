import * as React from "react";
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/utils";
import { HiOutlineGift } from "react-icons/hi2";

// box-shadow: 0px 4px 6px -2px #0000000D;
// box-shadow: 0px 10px 15px -3px #0000001A;
const cardClasses = cva("relative py-8 px-6 rounded-3xl price-card before:rounded-3xl before:-z-10 z-20", {
    variants: {
        type: {
            free: "after:bg-white [&>.hr]:border-red-500",
            bronze: "after:bg-[#EFECE5] [&>.hr]:border-red-500",
            silver: "after:bg-[#DFD7C9] [&>.hr]:border-red-500",
            gold: "after:bg-[#C7B8A3] [&>.hr]:border-red-500"
        }
    }
});

type Props = VariantProps<typeof cardClasses> & {
    count: number
}

const SubscriptionCard = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement> & Props
>(({ className, type, count, ...props }, ref) => (
    <article
        ref={ref}
        role="figure"
        className={cn(cardClasses({ type }), className)}
        style={{ overflow: "hidden" }}
        {...props}
    >
        <div className="price-card__bg">
            <header className="text-center">
                <h2 className="text-3xl capitalize leading-[46.8px] font-tt-ramillas font-medium">{type}</h2>
            </header>
            <hr
                className={cn(cva(" my-4 w-full border-t", {
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
            <section className="text-center">
                <p>What you’ll get:</p>
                <h2 className="text-3xl capitalize leading-[46.8px] font-tt-ramillas font-medium">
                    <HiOutlineGift className="inline align-middle h-6 w-6 mr-2" />
                    <span className="align-middle">
                        {count} Entries
                    </span>
                </h2>
                <p>into EVERY giveaway</p>
            </section>
        </div>
    </article>
));

SubscriptionCard.displayName = "SubscriptionCard"
SubscriptionCard.defaultProps = {
    type: "free"
}

const BundleCard = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement> & Props
>(({ className, type, count, ...props }, ref) => (
    <article
        ref={ref}
        role="figure"
        className={cn(cardClasses({ type: "free" }), className)}
        style={{ overflow: "hidden" }}
        {...props}
    >
        <section className="text-center">
            <h2 className="text-3xl capitalize leading-[46.8px] font-tt-ramillas font-medium">
                <HiOutlineGift className="inline align-middle h-6 w-6 mr-2" />
                <span className="align-middle">
                    {count} Entries
                </span>
            </h2>
            <p>For the upcoming major draw</p>
        </section>
    </article>
));

BundleCard.displayName = "BundleCard"
BundleCard.defaultProps = {
    type: "free"
}

export { SubscriptionCard, BundleCard }