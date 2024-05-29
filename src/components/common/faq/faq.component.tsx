'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components"
import { messages } from "@/shared/constants/messages";
import { useState } from "react";



export function FAQ() {

  const { faq: {
    accordionData,
    heading,
    subHeading
  } } = messages;

  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (value: any) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };


  return (
    <section className="sm:mx-[336px] sm:my-[112px] my-[64px] mx-[24px] bg-[#FFFFFF]">
      <div className="w-full flex flex-col gap-6 justify-center items-center mt-4 mb-20">
        <div className="font-normal italic text-3xl sm:text-5xl leading-10 font-tt-ramillas text-[#171614] text-center">
          {heading}
        </div>
        <div>
          <div className="font-normal text-lg leading-7 text-center">
            Got any more questions?
          </div>
          <div className="font-normal text-lg leading-7 text-center">
          Feel free to contact us at  <a className="underline" href="mailto:Support@MilaCollective.com">Support@MilaCollective.com</a>
          </div>
        </div>
      </div>

      <div className="border-b border-primary">
        <Accordion type="single" collapsible className="w-full flex flex-col">
          {accordionData.map((item, index) => (
            <div key={index}>
              <AccordionItem value={item.value}>
                <AccordionTrigger isOpen={openItem === item.value} onClick={() => handleToggle(item.value)}>
                  {item?.Title}
                </AccordionTrigger>
                <AccordionContent>
                  {item?.description}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
