import { Footer, Header, Clients, HowItWorks, Gallery } from "@/components";
import { FAQ } from "@/components/FAQ/FAQ";
import { WhoWeAre } from "@/components/who-we-are/who-we-are.component";
import { ContactUs } from "@/components/contact-us/contact-us.component";

export default function Home() {
  return (
    <>
      <Header />
      <Clients />
      <HowItWorks />
      <Gallery />
      <ContactUs />
      <FAQ />
      <WhoWeAre />
      <Footer />
    </>
  );
}
