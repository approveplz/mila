import { messages } from "@/shared/constants/messages";
import Image from 'next/image'

export function Benefits() {
  const { benefits: {
    heading,
    description,
    points
  } } = messages;

  return (
    <section className="relative w-full gap-8 sm:gap-20 flex flex-col sm:flex-row items-center justify-center sm:py-[112px] py-[64px] sm:px-[64px] bg-[#FFFFFF] ">
      <div>
        <Image
          src="/images/benefits.png"
          alt="benefits"
          layout="responsive"
          width={656}
          height={632}
          className="sm:min-w-[656px] sm:min-h-[632px] !w-[100vh]"
        />
      </div>
      <div className="text-[#171614] sm:absolute items-center px-6 sm:px-0 flex font-tt-ramillas font-normal text-4xl leading-[43.2px] sm:text-[72px] sm:leading-[86.4px] sm:font-light sm:w-[815px] sm:left-[562px] sm:top-[176px]">
        {heading}
      </div>
      <div className="sm:mt-[310px] sm:px-0 px-6 flex flex-col gap-8">
        <div className="font-normal text-lg leading-7">
          {description}
        </div>
        <div className="flex flex-col gap-4">
          {points?.map((point, index) => (
            <div className="flex flex-row gap-4 items-center" key={index}>
              <Image
                src="/images/cube.png"
                alt="benefits"
                layout="responsive"
                width={15}
                height={16}
                className="max-w-[15px] max-h-[16px]"
              />
              <div className="font-normal text-base leading-6">{point}</div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
