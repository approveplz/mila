import { getProducts } from "@/actions";
import { auth } from "@/auth";
import { FollowUs } from "../components/follow-us/follow-us.component";
import MajorGiveaways from "../components/major-giveaways/major-giveaways.component";
import { Pricing } from "../components/pricing/pricing.component";
import { Header } from "./components/header/header.component";
import { MinorGiveaways } from "./components/minor-giveaways/minor-giveaways.component";
import { NextGiveAway } from "./components/next-giveaway/next-giveaway.component";
import { UpcomingGiveAways } from "./components/upcoming-giveaways/upcoming-giveaways.component";

export default async function Giveaways() {
  const session = await auth();
  const product = await getProducts()
  return (
    <div>
      <Header />
      <NextGiveAway />
      {/* <UpcomingGiveAways /> */}
      <div>
        <div className="bg-[#F3F3F3] font-tt-ramillas text-center font-normal sm:font-light sm:text-5xl text-4xl leading-[43.2px] sm:leading-[57.6px] text-[#171614] px-[26px] sm:px-0">
          UPCOMING Major Giveaways
        </div>
        <MajorGiveaways showHeading={false} />
      </div>
      <MinorGiveaways />
      <Pricing session={session} products={product} />
      <FollowUs />
    </div>
  )
}
