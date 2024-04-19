import { Footer } from "@/components/footer/footer.component";
import { FAQ } from "@/components/FAQ/FAQ";
import { Header } from "@/components/header/header.component";

export default function Home() {
  return (
    <main>
      <Header />
      <FAQ />
      <Footer />
    </main>
  );
}
