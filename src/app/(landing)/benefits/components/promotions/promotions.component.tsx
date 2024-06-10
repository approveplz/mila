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
    "id": "cpn_27a524bd6ab9268e7395",
    "fullscreen": "/images/BannerAmaraSacs(desktop).jpg",
    "mobileScreen": "/images/BannerAmaraSacs(mobile).jpg",
    "business": {
      "id": "bis_829542bd7be54286d36ad397e89a37",
      "logo": null,
      "name": "Nestle",
      "description": "Nestlé S.A. is a Swiss multinational food and drink processing conglomerate corporation headquartered in Vevey, Switzerland. It has been the largest publicly held food company in the world, measured by revenue and other metrics, since 2014. It ranked No. 64 on the Fortune Global 500 in 2017.",
      "address": {
        "id": "adr_57ed5b43a742d8e6b96953ba82e972",
        "name": "Food & Beverage",
        "email": "",
        "phone": "",
        "line_1": "Example Street in Example City",
        "line_2": "",
        "postal_code": "",
        "city": "",
        "region": "",
        "country": "",
        "created": "2024-05-22T14:42:48.769828Z",
        "modified": "2024-05-22T14:42:48.769845Z"
      },
      "phone": "",
      "email": "",
      "category": "Food & Beverage",
      "categorical_hierarchy": "Food & Beverage",
      "socials": [
        {
          "id": "scl_43a742d8e6b796953ba8",
          "business": "bis_829542bd7be54286d36ad397e89a37",
          "url": "https://www.youtube.com/channel/UCNWn6hqKsvBYGUiknSOSqEw",
          "platform": "youtube",
          "created": "2024-06-05T09:21:45.049236Z",
          "modified": "2024-06-05T09:21:45.049249Z"
        },
        {
          "id": "scl_dbaeb2873627969d54ae",
          "business": "bis_829542bd7be54286d36ad397e89a37",
          "url": "https://x.com/nestlepakistan",
          "platform": "x",
          "created": "2024-06-05T09:21:45.047639Z",
          "modified": "2024-06-05T09:21:45.047654Z"
        },
        {
          "id": "scl_b2752a4bd653467e8935",
          "business": "bis_829542bd7be54286d36ad397e89a37",
          "url": "https://www.facebook.com/Nestle.PK/",
          "platform": "facebook",
          "created": "2024-06-05T09:21:45.044271Z",
          "modified": "2024-06-05T09:21:45.044284Z"
        },
        {
          "id": "scl_498d7b5a36852694e282",
          "business": "bis_829542bd7be54286d36ad397e89a37",
          "url": "https://www.nestle.pk/",
          "platform": "website",
          "created": "2024-06-05T09:21:45.041396Z",
          "modified": "2024-06-05T09:21:45.041411Z"
        }
      ],
      "created": "2024-05-22T14:43:03.450187Z",
      "modified": "2024-06-05T09:21:45.039556Z"
    },
    "minimum_plan": "Silver",
    "off_label": "BENEFIT",
    "description": "Stars sprinkle the night sky like diamonds on velvet.",
    "clip": "25OFF",
    "link": null,
    "instructions": "",
    "is_active": true,
    "created": "2024-05-22T13:58:30.164321Z",
    "modified": "2024-06-07T18:57:35.452397Z"
  },
  {
    "id": "cpn_27a524bd6ab9268e7395",
    "fullscreen": "/images/BannerRevival(Desktop).jpg",
    "mobileScreen": '/images/BannerRevival(mobile).jpg',
    "business": {
      "id": "bis_829542bd7be54286d36ad397e89a37",
      "logo": null,
      "name": "Nestle",
      "description": "Nestlé S.A. is a Swiss multinational food and drink processing conglomerate corporation headquartered in Vevey, Switzerland. It has been the largest publicly held food company in the world, measured by revenue and other metrics, since 2014. It ranked No. 64 on the Fortune Global 500 in 2017.",
      "address": {
        "id": "adr_57ed5b43a742d8e6b96953ba82e972",
        "name": "Food & Beverage",
        "email": "",
        "phone": "",
        "line_1": "Example Street in Example City",
        "line_2": "",
        "postal_code": "",
        "city": "",
        "region": "",
        "country": "",
        "created": "2024-05-22T14:42:48.769828Z",
        "modified": "2024-05-22T14:42:48.769845Z"
      },
      "phone": "",
      "email": "",
      "category": "Food & Beverage",
      "categorical_hierarchy": "Food & Beverage",
      "socials": [
        {
          "id": "scl_43a742d8e6b796953ba8",
          "business": "bis_829542bd7be54286d36ad397e89a37",
          "url": "https://www.youtube.com/channel/UCNWn6hqKsvBYGUiknSOSqEw",
          "platform": "youtube",
          "created": "2024-06-05T09:21:45.049236Z",
          "modified": "2024-06-05T09:21:45.049249Z"
        },
        {
          "id": "scl_dbaeb2873627969d54ae",
          "business": "bis_829542bd7be54286d36ad397e89a37",
          "url": "https://x.com/nestlepakistan",
          "platform": "x",
          "created": "2024-06-05T09:21:45.047639Z",
          "modified": "2024-06-05T09:21:45.047654Z"
        },
        {
          "id": "scl_b2752a4bd653467e8935",
          "business": "bis_829542bd7be54286d36ad397e89a37",
          "url": "https://www.facebook.com/Nestle.PK/",
          "platform": "facebook",
          "created": "2024-06-05T09:21:45.044271Z",
          "modified": "2024-06-05T09:21:45.044284Z"
        },
        {
          "id": "scl_498d7b5a36852694e282",
          "business": "bis_829542bd7be54286d36ad397e89a37",
          "url": "https://www.nestle.pk/",
          "platform": "website",
          "created": "2024-06-05T09:21:45.041396Z",
          "modified": "2024-06-05T09:21:45.041411Z"
        }
      ],
      "created": "2024-05-22T14:43:03.450187Z",
      "modified": "2024-06-05T09:21:45.039556Z"
    },
    "minimum_plan": "Silver",
    "off_label": "BENEFIT",
    "description": "Stars sprinkle the night sky like diamonds on velvet.",
    "clip": "25OFF",
    "link": null,
    "instructions": "",
    "is_active": true,
    "created": "2024-05-22T13:58:30.164321Z",
    "modified": "2024-06-07T18:57:35.452397Z"
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
          {mockData?.map(data => (

            <SwiperSlide className='relative'>
              <Dialog>
                <DialogTrigger >
                  <Image
                    // onClick={ }
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
