
import { Button } from "@/components/ui/button/button.component"
import { messages } from "@/shared/constants/messages";
import Image from 'next/image'


export function FollowUs() {

  const { followUs: {
    followUs,
    description,
    learnMore,
  } } = messages;

  return (
    <section className="sm:pt-[80px] pt-[32px] bg-[#F3F3F3]">
      <div className="grid sm:grid-cols-4 grid-cols-1 w-full">
        <Image
          src="/images/girls.png"
          alt="girls"
          layout="responsive"
          width={360}
          height={360}
          className="!w-full !h-full"
        />

        <Image
          src="/images/jewelery.png"
          alt="jewelery"
          layout="responsive"
          width={360}
          height={360}
          className="!w-full !h-full"
        />

        <Image
          src="/images/shirt.png"
          alt="shirt"
          layout="responsive"
          width={360}
          height={360}
          className="!w-full !h-full"
        />
        <div className="w-full bg-[#B06E6A] py-[89.53px] flex flex-col gap-6 items-center justify-center">
          <div className="font-tt-ramillas font-normal text-[32px] leading-[41.6px] text-white ">
            {followUs}
          </div>
          <div className="text-base font-normal leading-6 text-white px-[75px] text-center">
            {description}
          </div>
          <Button variant="secondary">{learnMore}</Button>
        </div>
      </div>
    </section>
  )
}