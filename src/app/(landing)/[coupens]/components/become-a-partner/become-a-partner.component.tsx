'use client';
import { Button } from "@/components/ui/button/button.component";
import { messages } from "@/shared/constants/messages";
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components"
import { BecomeAPartnerForm } from "./components/become-a-partner-form/form.component";



export function BecomeAPartner() {

  const { coupens: {
    becomeAPrtner: {
      becomeAPartner,
      bePromoted,
      promotedSection,
      work,
      button,
      dialog: {
        title
      }
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
        <Dialog>
          <DialogTrigger className="w-[185px] bg-[#B06E6A] border-[#B06E6A] text-white inline-flex items-center justify-center whitespace-nowrap text-base font-normal ring-offset-background border px-6 py-3 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">{button}</DialogTrigger>
          <DialogContent className="sm:w-[455px] w-[329px]">
            <DialogHeader>
              <DialogTitle className="font-normal text-[32px] leading-[38.4px]">{title}</DialogTitle>
            </DialogHeader>
            <BecomeAPartnerForm />
          </DialogContent>
        </Dialog>
      </div>


    </section>
  )
}