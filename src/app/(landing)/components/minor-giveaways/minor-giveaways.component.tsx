import { messages } from "@/shared/constants/messages";
import Image from 'next/image'

export function MinorGiveaways() {
  const { minorGiveways: {
    title,
    cards
  } } = messages;

  return (
    <section className="py-8 flex flex-col justify-center w-full items-center gap-12 bg-[#F3F3F3]">

      <div className="font-tt-ramillas font-normal text-[30px] sm:text-5xl leading-9 sm:leading-[57.6px] text-primary">
        {title}
      </div>


      <div className="grid grid-cols-5 gap-6 px-6 sm:px-16 pb-16 pt-2">
        {cards?.map((card, index) => (
          <div key={index} className="relative flex-shrink-0 rounded-[30px] flex flex-col gap-4" style={{ boxShadow: '0px 4px 6px -2px rgba(0, 0, 0, 0.13), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>

            <div className="absolute bg-white rounded-full px-2 top-4 left-[50%] transform -translate-x-1/2">
              <div className="font-semibold text-base leading-6">
                {card?.entry}
              </div>
            </div>

            <Image
              src="/images/bagpack-2.jpeg"
              alt="bagpack"
              layout="responsive"
              width={240}
              height={210}
              className="h-[210px] !rounded-t-[30px]"
            />

            <div className="flex flex-col gap-2 p-4">
              <div className="font-bold text-[14px] leading-[20px] text-[#54423A]">
                {card?.title}
              </div>

              <div className="font-normal text-xs leading-4">
                {card?.description}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
