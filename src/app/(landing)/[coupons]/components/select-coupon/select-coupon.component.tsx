'use client'
import { Button } from "@/components";
import { FBIcon } from "@/components/layout/footer/facebook-icon.component";
import { InstaIcon } from "@/components/layout/footer/instagram-icon.component";
import { TikTokIcon } from "@/components/layout/footer/tiktok.component";
import Image from 'next/image'
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";

export default function SelectCoupons() {
  return (
    <div className="flex flex-col gap-8 pt-[40px] pb-12">

      <div className="flex flex-col gap-8 justify-center items-center">

        <Image
          src="/images/peloton.png"
          alt="peloton"
          width={175}
          height={23}
          className="w-[175px] h-[23px] mt-10"
        />
        <div className="flex flex-col gap-2 items-center">

          <div className="font-semibold text-base leading-6 text-[#171614]">
            50% OFF with code
          </div>

          <Button className="w-[117px] h-[48px] flex flex-row gap-2" variant="primary"> <HiOutlineDocumentDuplicate size={16}/> <span className="font-medium text-base leading-6"> Copy </span></Button>

        </div>
      </div>

      <div className="py-8 flex flex-col gap-2 border-b border-t">
        <div className="font-semibold text-base leading-6 text-[#171614]">
          Product Name
        </div>

        <div className="font-normal text-base leading-6 text-[#171614]">
          Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem quia.
        </div>

      </div>



      <div className="flex flex-row gap-4 w-full justify-center">
        <div className="items-center cursor-pointer" >
          <FBIcon />
        </div>
        <div className="items-center cursor-pointer" >
          <TikTokIcon />
        </div>
        <div className="items-center  cursor-pointer" >
          <InstaIcon />
        </div>

      </div>

      <div className="bg-[#E5E7EB] py-2 px-4 rounded-[24px] w-fit">
        <div className="font-semibold text-[14px] leading-[20px] "> FASHION & RETAIL </div>
      </div>

    </div>
  )
}
