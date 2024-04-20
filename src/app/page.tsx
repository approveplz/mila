import { Footer } from "@/components/footer/footer.component";
import { FAQ } from "@/components/FAQ/FAQ";
import { Header } from "@/components/header/header.component";
import { WhoWeAre } from "@/components/who-we-are/who-we-are.component";

export default function Home() {
  return (
    <>
      <Header />
      <FAQ />
      <WhoWeAre />
      <Footer />
    </>
  );
}
