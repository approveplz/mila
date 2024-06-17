import * as React from "react";
import { messages } from "@/shared/constants/messages";
import { Product } from "@/entities";
import { Button, Container, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import PricingTabs from "./pricing-tabs.component";
import { PricingAction } from "./pricing-action.component";
import { SignUpAction } from "../signup-action/signup-action.component";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { HiArrowUpRight } from "react-icons/hi2";
import { SubscriptionAction } from "./subscription-action.component";

export async function Pricing({
  products,
  session,
  children
}: {
  products: Array<Product>,
  session?: Session | null
} & React.PropsWithChildren) {
  const { pricing: {
    headingA,
    headingB,
    description,
  } } = messages;
  const isLoggedIn = !!session;

  return (
    <section id="pricing" className="pt-[66px] sm:px-[160px] bg-[#F3F3F3]">
      <Container className="!max-w-full !w-full">
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-6 items-center">
            <div>
              <span className="font-tt-ramillas font-normal text-4xl leading-[43.2px] sm:text-5xl  sm:leading-[57.6px]">{headingA}</span> <span className="italic font-tt-ramillas font-normal text-4xl leading-[43.2px] sm:text-5xl  sm:leading-[57.6px]">{headingB}</span>
            </div>

            <div className="font-normal text-lg leading-7 text-[#000000] text-center sm:px-[300px]">
              {description}
            </div>
          </div>

          <PricingTabs session={session ? session : null} products={products} />

          {!isLoggedIn && (
            <PricingAction>
              <SignUpAction />
            </PricingAction>
          )}
        </div>
      </Container>
    </section>
  )
}
