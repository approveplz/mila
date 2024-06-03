import { messages } from "@/shared/constants/messages";

export function Header() {

  const { coupons: {
    heading,
    subheading
  } } = messages;

  return (
    <header >
      <div className="bg-white sm:h-[391px] bg-no-repeat bg-cover h-[300px] flex flex-col gap-6 items-center justify-center">
        <div className="font-tt-ramillas text-center font-normal px-12 sm:font-light text-4xl sm:text-8xl leading-[43.2px] sm:leading-[115.2px] text-[#171614]">
          {heading}
        </div>
        <div className="font-normal px-6 text-center text-[20px] leading-[28px]">
          {subheading}
        </div>
      </div>
    </header>
  )
}
