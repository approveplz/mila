'use client'

import Image from 'next/image'
import { HiOutlineLockClosed } from "react-icons/hi2";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components"
import SelectCoupons from '../select-coupon/select-coupon.component';
import { CouponResponse } from '@/api/auth/auth.types';
import { useRouter } from 'next/navigation';
import { useCheckOutStore } from '@/store';

type CoupenCardData = {
  isLoggedIn: boolean,
  upgrade?: boolean,
  coupon?: CouponResponse
}

export function CouponCard({ isLoggedIn, upgrade = false, coupon }: CoupenCardData) {
  const router = useRouter();
  const { setPricingType } = useCheckOutStore()

  const handleSignUp = () => {
    setPricingType("subscription")
    router.push("/#pricing")
  }

  return (
    <div className="relative flex flex-col bg-white rounded-[24px] w-40 h-[345px] sm:w-[205px] sm:h-[329px] shadow-lg">
      {!isLoggedIn && <div className="absolute flex flex-col justify-center items-center rounded-[24px] h-full w-full bg-[#171614BF]">
        <button className="bg-[#FFFFFF] cursor-pointer py-2 px-5 rounded-[50px] flex  gap-3 justify-center items-center w-[130px] z-30" onClick={handleSignUp}>
          <HiOutlineLockClosed size={24} />

          <span className="text-[#171614] font-medium leading-4 text-xs">
            Sign Up
          </span>
        </button>
      </div>}

      {isLoggedIn && !coupon?.id && <div className="absolute flex flex-col justify-center items-center rounded-[24px] h-full w-full px-4 bg-[#171614BF]">
        <div onClick={handleSignUp} className="bg-[#FFFFFF] cursor-pointer py-2 rounded-[24px] flex sm:flex-row flex-col gap-3 justify-center items-center sm:w-[179px] w-[143px] z-30">
          <HiOutlineLockClosed size={24} />
          <div className="text-[#171614] font-medium leading-4 text-xs">
            Upgrade to reveal
          </div>
        </div>
      </div>}

      {(!isLoggedIn || !coupon?.id) &&  <div className='absolute w-full h-full bg-transparent z-20 rounded-[24px]'>

      </div>}

      <div className={`relative z-10 h-full flex flex-col ${(!coupon?.id || !isLoggedIn) ? 'blur-[9px]' : 'blur-[0px]'}`}>

        <div className="absolute right-4 top-4 rounded-[24px] bg-[#171614]">
          <div className="px-2 py-1 font-semibold text-base leading-6 text-[#FFFFFF]">
            {coupon?.off_label ? coupon?.off_label : 'BOGO'}
          </div>
        </div>

        <div className="h-1/2 flex flex-col justify-center items-center">
          <Image
            src={coupon?.business?.logo ? coupon?.business?.logo?.file_url : "/images/peloton.png"}
            alt="logo"
            width={114}
            height={15}
            className={`w-[114px] ${!coupon?.business?.logo ? 'h-[15px]' : ''} mt-10`}
          />
        </div>
        <hr />
        <div className="h-1/2 p-4 flex flex-col gap-2">

          <div className="font-bold text-[14px] leading-[20px]">
            {coupon?.business?.name ? coupon?.business?.name : 'Brand Name'}
          </div>

          <div className="flex flex-col gap-1 h-[55px]">
            <div className="font-normal leading-4 text-xs text-ellipsis line-clamp-3">
              {coupon?.business?.description ? coupon?.business?.description : 'Sed ut perspiciatis unde omnis iste natus error sit.'}
            </div>

          </div>

          <div className="flex flex-col justify-center">
            <Dialog>
              <DialogTrigger className="w-[88px] py-2 px-5 rounded-[50px] bg-[#B06E6A] border-[#B06E6A] text-white inline-flex items-center justify-center whitespace-nowrap text-base font-normal ring-offset-background border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">View</DialogTrigger>
              <DialogContent className='w-[365px] z-[99999] sm:!w-[543px] !py-0 pb-4' withClose={true} >
                <SelectCoupons coupon={coupon} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}