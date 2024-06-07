import { messages } from "@/shared/constants/messages";
import Image from 'next/image'



export function HowItWorks() {

  const { howItWorks: {
    heading,
    description,
    subscribe: {
      title: subscribeTitle,
      description: subscribeDescription
    },
    accessBenefits: {
      title: accessBenefitsTitle,
      description: accessBenefitsDescription
    },
    giveAways: {
      title: giveAwaysTitle,
      description: giveAwaysDescription
    }
  } } = messages;

  return (
    <section id="how-it-works" className="sm:py-[64px] py-16 px-6 sm:px-0 bg-[#171614] flex flex-col gap-20">
      <div className="flex flex-col items-center gap-6 sm:mx-[336px]">
        <div className="font-tt-ramillas font-normal text-4xl sm:text-5xl leading-[43.2px] sm:leading-[57.6px] text-white ">
          {heading}
        </div>

        <div className="font-normal text-lg leading-6 text-white text-center">
          {description}
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row  gap-12 sm:px-16">

        <div className="flex flex-col items-center gap-6 sm:w-1/3">
          <Image
            src="/images/pointer.png"
            alt="pointer"
            // layout="responsive"
            width={99}
            height={96}
            className="max-w-[99px] max-h-[96px]"
          />
          <div className="font-tt-ramillas text-light text-[32px] leading-[41.6px] text-white">
            {subscribeTitle}
          </div>

          <div className="font-normal text-base leading-6 text-white text-center">
            {subscribeDescription}
          </div>

        </div>

        <div className="flex flex-col items-center gap-6 sm:w-1/3">
          <Image
            src="/images/gift.png"
            alt="gift"
            // layout="responsive"
            width={77}
            height={96}
            className="max-w-[77px] max-h-[96px]"
          />
          <div className="font-tt-ramillas text-light text-[32px] leading-[41.6px] text-white">
            {accessBenefitsTitle}
          </div>

          <div className="font-normal text-base leading-6 text-white text-center">
            {accessBenefitsDescription}
          </div>

        </div>

        <div className="flex flex-col items-center gap-6 sm:w-1/3">
          <Image
            src="/images/bag.png"
            alt="bag"
            // layout="responsive"
            width={73}
            height={96}
            className="max-w-[73px] max-h-[96px]"
          />
          
          <div className="font-tt-ramillas text-light text-[32px] leading-[41.6px] text-white">
            {giveAwaysTitle}
          </div>

          <div className="font-normal text-base leading-6 text-white text-center">
            {giveAwaysDescription}
          </div>

        </div>
      </div>

    </section>
  )
}