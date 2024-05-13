import { FAQ } from "@/app/(landing)/components/faq/faq.component";
import { Brands } from "./components/brands/brands.component";
import { FollowUs } from "./components/follow-us/follow-us.component";
import { GiveAway } from "./components/give-away/give-away.component";
import { Header } from "./components/header/header.component";
import { HowItWorks } from "./components/how-it-works/how-it-works.component.";

export default function Home() {
  return (
    <div>
      <Header />
      <Brands />
      <GiveAway />
      <HowItWorks />
      <FollowUs />
      <FAQ />
    </div>
  )
}
