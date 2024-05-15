"use client"
import { Button } from "@/components/ui/button/button.component";
import { Input } from "@/components/ui/input/input.component";
import { messages } from "@/shared/constants/messages";
import { FacebookLogo, InstagramLogo, TiktokLogo } from "@phosphor-icons/react";

export async function Footer() {

  const { footer: {
    logo: {
      title,
      description,
      input: {
        placeholder,
        subscribe,
        messageA,
        messageB,
        messageC,
      }
    },
    tradeMark,
    link: {
      title: linkTitle,
      list: linkList
    },
    followUs: {
      heading: followUsTitle
    }
  } } = messages;

  return (
    <footer className="sm:py-20 sm:px-16 py-16 px-6 bg-[#F3F3F3] ">

      <div className="flex flex-col sm:flex-row jutify-between">
        <div className="flex flex-col items-start gap-6 sm:w-2/3 w-full">

          <div className="font-bold text-lg text-[#171614]">
            {title}
          </div>

          <div className="font-normal text-base leading-6 text-[#171614]">
            {description}
          </div>

          <div className="flex flex-row gap-4">

            <Input
              id="email"
              name="email"
              placeholder={placeholder}
              className="sm:w-[360px] h-12"
            />

            <Button variant="primary">{subscribe}</Button>

          </div>

          <div className="max-w-[500px]">
            <span className="font-normal text-xs leading-[18px]" > {messageA} </span>
            <span className="underline cursor-pointer font-normal text-xs leading-[18px]"> {messageB} </span>
            <span className="font-normal text-xs leading-[18px]"> {messageC} </span>
          </div>



        </div>

        <div className="flex sm:flex-row sm:gap-20 sm:w-1/3 flex-col gap-10 w-full mt-6 sm:mt-0">
          <div>
            <div className="font-semibold text-base leading-6 text-[#171614]">
              {linkTitle}
            </div>

            <div className="flex flex-col gap-6 mt-6">
              {linkList?.map((point, index) => (
                <div className="underline font-normal text-[14px] leading-[21px] cursor-pointer" key={index}>
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold text-base leading-6 text-[#171614]">
              {followUsTitle}
            </div>

            <div className="flex flex-col gap-6 mt-6">
              <div className="flex flex-row gap-3 items-center cursor-pointer" >
                <FacebookLogo size={16} weight="fill" /> <div className="font-normal text-[14px] leading-[21px]"> Facebook</div>
              </div>
              <div className="flex flex-row gap-3 items-center  cursor-pointer" >
                <InstagramLogo size={16} /> <div className="font-normal text-[14px] leading-[21px]"> Instagram</div>
              </div>
              <div className="flex flex-row gap-3 items-center cursor-pointer" >
                <TiktokLogo size={16} weight="fill" /> <div className="font-normal text-[14px] leading-[21px]">Tik Tok </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-center sm:justify-start font-normal text-[14px] leading-[21px] mt-6">
        {tradeMark}
      </div>

    </footer>
  )
}