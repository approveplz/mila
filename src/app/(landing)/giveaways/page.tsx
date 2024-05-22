import { FollowUs } from "../components/follow-us/follow-us.component";
import { Pricing } from "../components/pricing/pricing.component";
import { Header } from "./components/header/header.component";
import { MinorGiveaways } from "./components/minor-giveaways/minor-giveaways.component";
import { NextGiveAway } from "./components/next-giveaway/next-giveaway.component";
import { UpcomingGiveAways } from "./components/upcoming-giveaways/upcoming-giveaways.component";

export default function Giveaways() {
  return (
    <div>
      <Header />
      <NextGiveAway />
      <UpcomingGiveAways />
      <MinorGiveaways />
      <Pricing products={[]} />
      <FollowUs />
    </div>
  )
}
