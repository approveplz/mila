import { Brands } from "../components/brands/brands.component";
import { BecomeAPartner } from "./components/become-a-partner/become-a-partner.component";
import { CoupensList } from "./components/coupons-list/coupons-list.component";
import { Header } from "./components/header/header.component";

export default function Coupons() {
  return (
    <div>
      <Header />
      <Brands />
      <CoupensList />
      <BecomeAPartner />
    </div>
  )
}
