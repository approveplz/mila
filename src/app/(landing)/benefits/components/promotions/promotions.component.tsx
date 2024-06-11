'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import { useWidth } from '@/hooks';
import { Dialog, DialogContent, DialogTrigger } from '@/components';
import SelectCoupons from '../select-coupon/select-coupon.component';


const mockData = [

  {
    "id": "cpn_eb32679aed28d8b34574",
    "fullscreen": "/images/BannerAmaraSacs(desktop).jpg",
    "mobileScreen": "/images/BannerAmaraSacs(mobile).jpg",
    "business": {
      "id": "bis_4578a5eb32679aed28d8b34574629e",
      "logo": {
        "id": "res_7be592a384739adbaad6b5e286b746",
        "title": "Logo NegroAmara Sacs.png",
        "description": null,
        "filename": "Logo NegroAmara Sacs.png",
        "type": "business_logo",
        "size": 18343,
        "mime_type": "image/png",
        "file_url": "https://mila-live-bucket.s3.us-east-1.amazonaws.com/business/20240608201607343892/Logo NegroAmara Sacs.png",
        "linked": true,
        "is_internal": false,
        "created": "2024-06-08T20:16:07.347325Z",
        "modified": "2024-06-08T20:16:07.349050Z",
        "created_by": null
      },
      "name": "Amara Sacs",
      "description": "AMARA SACS, your online store of high-quality Brazilian bikinis and accessories for women shipping from Miami, Florida!",
      "address": null,
      "phone": "",
      "email": "",
      "category": "Fashion & Retail",
      "categorical_hierarchy": "Fashion & Retail",
      "socials": [
        {
          "id": "scl_2a384739adbad6b5e286",
          "business": "bis_4578a5eb32679aed28d8b34574629e",
          "url": "https://www.amarasacs.com/",
          "platform": "website",
          "created": "2024-06-08T20:15:14.350897Z",
          "modified": "2024-06-08T20:15:14.350909Z"
        }
      ],
      "created": "2024-06-07T00:46:20.280294Z",
      "modified": "2024-06-08T20:16:07.622305Z"
    },
    "minimum_plan": "Bronze",
    "off_label": "25% OFF",
    "description": "25% OFF Amara Sacs Incredible Swimwear!",
    "clip": "MILA-SWIMWEAR",
    "link": null,
    "instructions": "",
    "is_active": true,
    "created": "2024-06-07T00:46:49.380392Z",
    "modified": "2024-06-08T20:39:43.791612Z"
  },

  {
    "id": "cpn_8e945293ed52d6b87a72",
    "fullscreen": "/images/BannerRevival(Desktop).jpg",
    "mobileScreen": '/images/BannerRevival(mobile).jpg',
    "business": {
      "id": "bis_537a458e945293ed52d6b87a72b362",
      "logo": {
        "id": "res_37b2e643658ae7d374d9b42375a98b",
        "title": "Revival_RGB_Black.webp",
        "description": null,
        "filename": "Revival_RGB_Black.webp",
        "type": "business_logo",
        "size": 11772,
        "mime_type": "image/webp",
        "file_url": "https://mila-live-bucket.s3.us-east-1.amazonaws.com/business/20240608203400293061/Revival_RGB_Black.webp",
        "linked": true,
        "is_internal": false,
        "created": "2024-06-08T20:34:00.296254Z",
        "modified": "2024-06-08T20:34:00.297950Z",
        "created_by": null
      },
      "name": "Revival New York",
      "description": "Hotel Luxury from your favorite hotels delivered to your home.",
      "address": null,
      "phone": "",
      "email": "",
      "category": "Other",
      "categorical_hierarchy": "Other",
      "socials": [
        {
          "id": "scl_8e945293ed52d6b87a72",
          "business": "bis_537a458e945293ed52d6b87a72b362",
          "url": "https://www.revivalnewyork.com/",
          "platform": "website",
          "created": "2024-06-08T20:34:00.462714Z",
          "modified": "2024-06-08T20:34:00.462724Z"
        }
      ],
      "created": "2024-06-08T20:34:00.291536Z",
      "modified": "2024-06-08T20:34:00.461643Z"
    },
    "minimum_plan": "Bronze",
    "off_label": "20% OFF",
    "description": "20% Off Sitewide",
    "clip": "MILA20",
    "link": null,
    "instructions": "",
    "is_active": true,
    "created": "2024-06-08T20:34:33.067407Z",
    "modified": "2024-06-08T20:35:04.442558Z"
  }
]


export function Promotions() {

  const { width } = useWidth();

  return (
    <section>
      <div className="h-[267px] relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
          modules={[Pagination, Navigation]}
          className="promotions"
        >
          {mockData?.map((data,index) => (

            <SwiperSlide key={index} className='relative'>
              <Dialog>
                <DialogTrigger >
                  <Image
                    src={width > 640 ? data?.fullscreen : data?.mobileScreen}
                    alt="promotions"
                    layout="fill"
                    className={`w-full object-cover`}
                  />
                </DialogTrigger>
                <DialogContent className='w-[365px] z-[99999] sm:!w-[543px] !py-0 pb-4' withClose={true} >
                  <SelectCoupons coupon={data} />
                </DialogContent>
              </Dialog>

            </SwiperSlide>

          ))}



          {/* <SwiperSlide className='relative'>
            <Image
              src={width > 640 ? "/images/BannerRevival(Desktop).jpg" : '/images/BannerRevival(mobile).jpg'}
              alt="promotions"
              layout="fill"
              className={`w-full object-cover`}
            />
          </SwiperSlide> */}
        </Swiper>

        <button className="hidden sm:flex arrow-left absolute top-[124px] z-20 left-6 p-2 bg-[#FFFFFF] shadow-lg rounded-full"><HiArrowSmallLeft size={24} /></button>
        <button className="hidden sm:flex arrow-right absolute top-[124px] z-20 right-6 p-2 bg-[#FFFFFF] shadow-lg rounded-full"><HiArrowSmallRight size={24} /></button>
      </div>

    </section>
  )
}
