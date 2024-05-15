import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components"
import { messages } from "@/shared/constants/messages";



export function FAQ() {

  const { faq: {
    accordionData,
    heading,
    subHeading
  } } = messages;


  return (
    <section className="sm:mx-[336px] sm:my-[112px] my-[64px] mx-[24px] bg-[#FFFFFF]">
      <div className="w-full flex flex-col gap-6 justify-center items-center mt-4 mb-20">
        <div className="font-normal italic text-3xl sm:text-5xl leading-10 font-tt-ramillas text-[#171614] text-center">
          {heading}
        </div>
        <div className="font-normal text-lg leading-7 text-center">
          {subHeading}
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full flex flex-col space-y-4">
        {accordionData.map((item, index) => (
          <div key={index}>
            <AccordionItem value={item.value}>
              <AccordionTrigger>
                {item?.Title}
              </AccordionTrigger>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </section>
  )
}
