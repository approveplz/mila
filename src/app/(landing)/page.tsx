import { FAQ } from "@/app/(landing)/components/faq/faq.component";
import { Benefits } from "@/app/(landing)/components/benefits/benefits.component";
import { Brands } from "@/app/(landing)/components/brands/brands.component";
import { FollowUs } from "@/app/(landing)/components/follow-us/follow-us.component";
import { GiveAway } from "@/app/(landing)/components/upcoming-give-away/upcoming-give-away.component";
import { Header } from "@/app/(landing)/components/header/header.component";
import { HowItWorks } from "@/app/(landing)/components/how-it-works/how-it-works.component.";
import { MinorGiveaways } from "./components/minor-giveaways/minor-giveaways.component";

export default function Home() {
  return (
    <div>
      <Header />
      <Brands />
      <Benefits />
      <GiveAway />
      <HowItWorks />
      <MinorGiveaways />
      <FollowUs />
      <FAQ />
    </div>
  )
}
