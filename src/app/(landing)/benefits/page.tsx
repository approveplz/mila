import { Brands } from "../components/brands/brands.component";
import { BecomeAPartner } from "./components/become-a-partner/become-a-partner.component";
import { CoupensList } from "./components/coupons-list/coupons-list.component";
import { Header } from "./components/header/header.component";
import { Promotions } from "./components/promotions/promotions.component"
import {auth} from "@/auth"

export default async function Coupons() {
  const session = await auth();
  return (
    <div>
      <Header session={session}/>
      {<Promotions session={session}/>}
      {/* <Brands /> */}
      <CoupensList session={session} />
      <BecomeAPartner />
    </div>
  )
}
