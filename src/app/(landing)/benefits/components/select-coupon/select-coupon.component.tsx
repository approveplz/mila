'use client'
import { CouponResponse } from "@/api/auth/auth.types";
import { Button } from "@/components";
import { FBIcon } from "@/components/layout/footer/facebook-icon.component";
import { InstaIcon } from "@/components/layout/footer/instagram-icon.component";
import { TikTokIcon } from "@/components/layout/footer/tiktok.component";
import Image from 'next/image'
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { WebsiteIcon } from "./website-icon.component";
import Link from "next/link";
import { XIcon } from "./x-icon.component";

type SelectCoupon = {
  coupon?: CouponResponse
}

export default function SelectCoupons({ coupon }: SelectCoupon) {

  const handleCopy = () => {
    if (coupon?.clip) {
      navigator.clipboard.writeText(coupon.clip);
    }
  };

  return (
    <div className="flex flex-col gap-8 pt-[40px] pb-12">
      <div className="flex flex-col gap-8 justify-center items-center">
        <Image
          src={coupon?.business?.logo ? coupon?.business?.logo?.file_url : "/images/peloton.png"}
          alt="logo"
          width={175}
          height={50}
          className={`w-[175px] object-cover h-[100px] mt-10`}

        />

        <div className="flex flex-col gap-4 items-center">

          <div className="font-semibold text-center text-base leading-6 text-[#171614]">
            {coupon?.description}
          </div>

          <div className="bg-[#E5E7EB] p-2 rounded-[64px] flex flex-row justify-between w-[250px] items-center">
            <div className="font-medium text-base mx-auto leading-6 text-[#171614]">{coupon?.clip}</div>
            <Button onClick={handleCopy} className="w-[117px] h-[48px] flex flex-row gap-2" variant="primary">
              <HiOutlineDocumentDuplicate size={16} />
              <span className="font-medium text-base leading-6"> Copy </span>
            </Button>
          </div>


        </div>
      </div>


      <div className="pt-8 flex flex-col gap-2 border-t">
        <div className="font-semibold text-base leading-6 text-[#171614]">
          Subscription type
        </div>

        <div className="bg-[#DFD7C9] rounded-[24px] py-2 px-4 border-2 border-[#CDCDCD] w-fit">
          {coupon?.minimum_plan}
        </div>

      </div>

      <div className="pb-8 flex flex-col gap-2 border-b">
        <div className="font-semibold text-base leading-6 text-[#171614]">
          {coupon?.business?.name ? coupon?.business?.name : 'Product Name'}
        </div>

        <div className="font-normal text-base leading-6 text-[#171614]">
          {coupon?.business?.description ? coupon?.business?.description : 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem quia.'}
        </div>

      </div>

      {coupon?.business?.socials && coupon?.business?.socials?.length > 0
        && <div className="flex flex-row gap-4 w-full justify-center">
          {coupon?.business?.socials?.map(item => {
            switch (item.platform) {
              case 'website':
                return (
                  <Link href={item?.url} className="items-center cursor-pointer" key={item.platform} target="_blank">
                    <WebsiteIcon />
                  </Link>
                );
              case 'instagram':
                return (
                  <Link href={item?.url} className="items-center cursor-pointer" key={item.platform} target="_blank">
                    <InstaIcon />
                  </Link>
                );
              case 'facebook':
                return (
                  <Link href={item?.url} className="items-center cursor-pointer" key={item.platform} target="_blank">
                    <FBIcon />
                  </Link>
                );
              case 'tiktok':
                return (
                  <Link href={item?.url} className="items-center cursor-pointer" key={item.platform} target="_blank">
                    <TikTokIcon />
                  </Link>
                );
                case 'x':
                return (
                  <Link href={item?.url} className="items-center cursor-pointer" key={item.platform} target="_blank">
                    <XIcon />
                  </Link>
                );
              default:
                return null;
            }
          })}
        </div>
      }

      <div className="bg-[#E5E7EB] py-2 px-4 rounded-[24px] w-fit">
        <div className="font-semibold text-[14px] leading-[20px] "> {coupon?.business?.category.toUpperCase()} </div>
      </div>

    </div>
  )
}
