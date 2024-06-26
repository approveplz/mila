import { FAQ } from "@/components/common/faq/faq.component";
import { Benefits } from "@/app/(landing)/components/benefits/benefits.component";
import { Brands } from "@/app/(landing)/components/brands/brands.component";
import { FollowUs } from "@/app/(landing)/components/follow-us/follow-us.component";
import { GiveAway } from "@/app/(landing)/components/upcoming-give-away/upcoming-give-away.component";
// import Header from "@/app/(landing)/components/header/header.component";
import { HowItWorks } from "@/app/(landing)/components/how-it-works/how-it-works.component.";
import { MinorGiveaways } from "./components/minor-giveaways/minor-giveaways.component";
// import { MajorGiveaways } from "./components/major-giveaways/major-giveaways.component";
import { Pricing } from "./components/pricing/pricing.component";
import { getProducts } from "@/actions";
import { auth } from "@/auth";
import dynamic from "next/dynamic";

const MajorGiveaways = dynamic(() => import("./components/major-giveaways/major-giveaways.component"), {
  ssr: false
})

const Header = dynamic(() => import("./components/header/header.component"), {
  ssr: false
})


export default async function Home() {
  const products = await getProducts();
  const session = await auth();

  return (
    <>
      <Header session={session} />
      {/* <Brands /> */}
      {/* <Benefits /> */}
      <HowItWorks />
      <GiveAway />
      <Pricing session={session} products={products} />
      <MajorGiveaways productsArray={products} />
      <MinorGiveaways />
      <FollowUs />
      <FAQ />
    </>
  )
}
