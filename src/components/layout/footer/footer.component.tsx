"use client"

import { Button } from "@/components/ui/button/button.component";
import { Input } from "@/components/ui/input/input.component";
import { messages } from "@/shared/constants/messages";
import { FBIcon } from "./facebook-icon.component";
import { InstaIcon } from "./instagram-icon.component";
import { TikTokIcon } from "./tiktok.component";
import Image from "next/image";
import Link from "next/link";

const links = [
  { title: "Privacy Policy", to: "/legal/privacy-policy" },
  { title: "Terms of Service", to: "/legal/terms-of-use" },
  { title: "Sweeps Rules", to: "/legal/sweeps-rules" },
  { title: "Cookies Settings", to: "/" },
  { title: "About Us", to: "/" },
  { title: "FAQ", to: "/" },
];

export function Footer() {
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
    <footer className="sm:py-20 sm:px-16 py-16 px-6 bg-[#F3F3F3]">
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-0 jutify-between">
        <div className="flex flex-col items-start gap-6 sm:w-2/3 2xl:ml-52 w-full">
          <div className="relative h-12 w-[49.4px]">
            <Image src="/images/logo-fatal.svg" alt="logo" fill />
          </div>

          <div className="font-normal text-base leading-6 text-[#171614]">
            {description}
          </div>

          <div className="flex flex-row gap-4">
            <Input
              id="email"
              name="email"
              placeholder={placeholder}
              className="sm:w-[360px] h-12 border-[#171614]"
            />

            <Button variant="primary">{subscribe}</Button>
          </div>

          <div className="max-w-[500px]">
            <span className="font-normal text-xs leading-[18px]">{messageA}</span>{" "}
            <Link className="underline cursor-pointer font-normal text-xs leading-[18px]" href="/legal/privacy-policy">{messageB}</Link>{" "}
            <span className="font-normal text-xs leading-[18px]">{messageC}</span>
          </div>
        </div>

        <div className="flex sm:flex-row sm:gap-20 sm:w-1/3 flex-col 2xl:justify-center gap-10 w-full mt-6 sm:mt-0">
          <div>
            <div className="font-semibold text-base leading-6 text-[#171614]">
              {linkTitle}
            </div>

            <div className="flex flex-col gap-6 mt-6">
              {links.map((link, index) => (
                <Link className="underline font-normal text-[14px] leading-[21px] cursor-pointer" key={link.title} href={link.to}>
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold text-base leading-6 text-[#171614]">
              {followUsTitle}
            </div>

            <div className="flex flex-col gap-6 mt-6">
              <div className="flex flex-row gap-3 items-center cursor-pointer" >
                <FBIcon /> <div className="font-normal text-[14px] leading-[21px]"> Facebook</div>
              </div>
              <div className="flex flex-row gap-3 items-center  cursor-pointer" >
                <InstaIcon /> <div className="font-normal text-[14px] leading-[21px]"> Instagram</div>
              </div>
              <div className="flex flex-row gap-3 items-center cursor-pointer" >
                <TikTokIcon /> <div className="font-normal text-[14px] leading-[21px]">Tik Tok </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-center sm:justify-start font-normal text-[14px] leading-[21px] mt-6 2xl:ml-52">
        {tradeMark}
      </div>
    </footer>
  )
}