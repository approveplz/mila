import { FAQ } from "@/components/common/faq/faq.component";
import { Header } from "./components/header/header.component";
import { HowItWorks } from "./components/how-it-works/how-it-works.component";


export default async function AboutUs() {

    return (
        <>
            <Header />
            <HowItWorks />
            <FAQ />
        </>
    )
}
