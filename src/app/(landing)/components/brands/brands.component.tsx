import { messages } from "@/shared/constants/messages";
import Image from 'next/image'


export function Brands() {
  const { brands: {
    heading
  } } = messages;

  return (
    <section className="w-full gap-6 flex flex-col items-center justify-center pb-12 pt-12 sm:pb-16 px-6 sm:px-16  bg-[#F3F3F3] ">
      <div className="font-normal text-lg leading-[27px] text-[#171614]">
        {heading}
      </div>
      <div className="flex flex-wrap gap-6 sm:gap-10 justify-center items-center px-10 sm:px-0">
        <Image
          src="/images/italic.png"
          alt="italic"
          width={81.43}
          height={22.86}
          className="sm:w-[92.31px] w-[81.43px] h-[22.86px]"
        />

        <Image
          src="/images/allbirds.png"
          alt="allbirds"
          width={82.64}
          height={32.06}
          className="sm:w-[101.68px] w-[82.64px] h-[32.06px]"
        />

        <Image
          src="/images/yeti.png"
          alt="yeti"
          width={82.67}
          height={22.89}
          className="sm:w-[85.71px] w-[82.67px] h-[22.89px]"
        />

        <Image
          src="/images/warby-parker.png"
          alt="warby-parker"
          width={203.43}
          height={16}
          className="w-[203.43px] h-[16px]"
        />

        <Image
          src="/images/peloton.png"
          alt="peloton"
          width={155.43}
          height={21.71}
          className="sm:w-[155.43px] h-[21.71px]"
        />
      </div>
    </section>
  )
}
