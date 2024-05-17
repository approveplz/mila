import { Button } from "@/components/ui/button/button.component";
import { messages } from "@/shared/constants/messages";
import Image from 'next/image'



export function BecomeAPartner() {

  const { coupens: {
    becomeAPrtner: {
      becomeAPartner,
      bePromoted,
      promotedSection,
      work,
      button
    }
  } } = messages;

  return (
    <section className="sm:py-[112px] py-16 px-6 sm:px-0 bg-[#171614] flex flex-col sm:gap-20 gap-16">
      <div className="flex flex-col justify-center items-center">
        <div className="font-tt-ramillas text-center font-light text-4xl sm:text-5xl leading-[43.2px] sm:leading-[57.6px] text-[#FFFFFF] ">
          {becomeAPartner}
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row  gap-12 px-9 sm:px-16">

        <div className="flex flex-col items-center gap-4 sm:w-1/3">
          <Image
            src="/images/commercial.png"
            alt="pointer"
            layout="responsive"
            width={100}
            height={100}
            className="max-w-[100px] max-h-[100px]"
          />

          <div className="font-semibold text-base leading-7 text-[#D1D5DB] text-center">
            {bePromoted}
          </div>

        </div>

        <div className="flex flex-col items-center gap-4 sm:w-1/3">
          <Image
            src="/images/Shopping-Bag.png"
            alt="Shopping-Bag"
            layout="responsive"
            width={100}
            height={100}
            className="max-w-[100px] max-h-[100px]"
          />

          <div className="font-semibold text-base leading-7 text-[#D1D5DB] text-center">
            {promotedSection}
          </div>

        </div>

        <div className="flex flex-col items-center gap-4 sm:w-1/3">
          <Image
            src="/images/meeting.png"
            alt="meeting"
            layout="responsive"
            width={100}
            height={100}
            className="max-w-[100px] max-h-[100px]"
          />

          <div className="font-semibold text-base leading-7 text-[#D1D5DB] text-center">
            {work}
          </div>

        </div>
      </div>

      <div className="flex flex-col justify-center items-center sm:mx-[336px]">
      <Button variant="primary" className="w-[185px]">{button}</Button>
      </div>

    </section>
  )
}