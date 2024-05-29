import * as React from "react";
import { messages } from "@/shared/constants/messages";
import { Product } from "@/entities";
import { Container } from "@/components";
import PricingTabs from "./pricing-tabs.component";
import { PricingAction } from "./pricing-action.component";
import { SignUpAction } from "../signup-action/signup-action.component";
import { auth } from "@/auth";

export async function Pricing({
  products,
  children
}: {
  products: Array<Product>
} & React.PropsWithChildren) {
  const { pricing: {
    headingA,
    headingB,
    description,
  } } = messages;

  const session = await auth();
  

  return (
    <section id="pricing" className="py-[66px] bg-[#F3F3F3]">
      <Container>
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col gap-6 items-center">
            <div>
              <span className="font-tt-ramillas font-normal text-4xl leading-[43.2px] sm:text-5xl  sm:leading-[57.6px]">{headingA}</span> <span className="italic font-tt-ramillas font-normal text-4xl leading-[43.2px] sm:text-5xl  sm:leading-[57.6px]">{headingB}</span>
            </div>

            <div className="font-normal text-lg leading-7 text-[#000000] text-center sm:px-[300px]">
              {description}
            </div>
          </div>

          <PricingTabs session={session}  products={products} />

          <PricingAction>
            <SignUpAction />
          </PricingAction>
        </div>
      </Container>
    </section>
  )
}
