import { Brands } from "../components/brands/brands.component";
import { BecomeAPartner } from "./components/become-a-partner/become-a-partner.component";
import { CoupensList } from "./components/coupens/coupens.component";
import { Header } from "./components/header/header.component";

export default function Coupens() {
  return (
    <div>
      <Header />
      <Brands />
      <CoupensList />
      <BecomeAPartner />
    </div>
  )
}
