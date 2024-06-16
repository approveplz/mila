'use client'
import { messages } from "@/shared/constants/messages";
import { HiOutlineGift } from "react-icons/hi2";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Timer } from "@/components/common/timer/timer.component";
import {
  useQuery,
  UseQueryResult
} from '@tanstack/react-query'
import { getGiveaways } from "@/actions";
import { GiveawayItem, Product } from "@/entities";
import { useCheckOutStore } from "@/store";
import { useWidth } from "@/hooks";
import useCalculateEntries from "@/hooks/useEntries";
import { Session } from "next-auth";
import { getProductPrice } from "@/utils";
import { useAuthContext } from "@/components/provider/auth/auth.component";

type MajorGiveaways = {
  showHeading?: boolean
  productsArray?: Array<Product>
}


export default function MajorGiveaways({ showHeading = true, productsArray = [] }: MajorGiveaways) {
  const { majorGiveaways: {
    heading, subHeading
  } } = messages;

  const { products } = useCheckOutStore();
  const pricingType = useCheckOutStore((state) => state.pricingType);
  const subscriptions = productsArray?.filter(product => product.type === "subscription");
  const bundles = productsArray?.filter(product => product.type === "bundle");

  const { width } = useWidth();
  const [amount, setAmount] = useState<number>(0);

  const { session } = useAuthContext();

  const { data: giveAwayData, isLoading }: UseQueryResult<GiveawayItem[]> =
    useQuery({
      queryKey: ['majorGiveAways'],
      queryFn: () =>
        getGiveaways('large', 'major')
    })

  const entries = useCalculateEntries(pricingType as "subscription" | "bundle", products);
  const isLoggedIn = !!session;

  useEffect(() => {
    if (giveAwayData && pricingType === 'bundle') {
      useCheckOutStore.getState().setClosestGiveAwayDate(giveAwayData[0]?.draw_time);
    }
  }, [giveAwayData, pricingType])

  useEffect(() => {
    if (!isLoggedIn && products?.length > 0 && pricingType === 'subscription') {
      products.forEach(product => {
        if (product?.data?.type === 'subscription') {
          const quantity = product.quantity
          const pricingData = getProductPrice(product?.data?.prices);
          pricingData?.isDiscounted ? setAmount(quantity * pricingData?.discountedPrice) : setAmount(quantity * pricingData?.defaultPrice)
        }
      })
    } else if (products?.length > 0 && pricingType === 'bundle') {
      let amount = 0;
      products.forEach(product => {
        if (product?.data?.type === 'bundle') {
          const quantity = product.quantity
          const pricingData = product?.data?.prices[0]?.unit_amount;
          amount += quantity * Number(pricingData)
        }
      })
      setAmount(amount)
    }
  }, [products, pricingType, isLoggedIn])

  useEffect(() => {
    if (isLoggedIn && products.length === 0 && pricingType === 'subscription') {
      setAmount(0);
      session?.user?.user?.metadata?.subscribed_products.forEach(subProduct => {
        subscriptions?.forEach(subscription => {
          if (subProduct?.product === subscription?.id) {
            const quantity = subProduct.quantity
            const pricingData = getProductPrice(subscription?.prices);
            pricingData?.isDiscounted ? setAmount(quantity * pricingData?.discountedPrice) : setAmount(quantity * pricingData?.defaultPrice)
          }
        })
      })
    } else if (isLoggedIn && products.length > 0 && pricingType === 'subscription') {
      let amount = 0;
      products.forEach(product => {
        if (product?.data?.type === 'subscription') {
          const quantity = product.quantity
          const pricingData = product?.data?.prices[0]?.unit_amount;
          amount += quantity * Number(pricingData)
        }
      })
      setAmount(amount)
    }
    // else if (isLoggedIn && pricingType === 'bundle') {
    //   let amount = 0;
    //   session?.user?.user?.metadata?.subscribed_products.forEach(subProduct => {
    //     bundles?.forEach(bundle => {
    //       if (subProduct?.product === bundle?.id) {
    //         const quantity = subProduct.quantity
    //         const pricingData = bundle?.prices[0]?.unit_amount;
    //         amount += quantity * Number(pricingData)
    //       }
    //     })
    //   })
    //   setAmount(amount)
    // }

  }, [productsArray, session, pricingType, isLoggedIn, subscriptions, products])

  return (
    <section className={`${width < 640 ? '!py-[33px]' : 'pt-[66px]'} ${showHeading ? 'pb-0' : 'pb-[66px] pt-8'} ${width < 640 ? 'px-6' : 'px-[160px]'} flex flex-col items-center gap-8 bg-[#F3F3F3]`}>

      {showHeading &&
        <div>
          {!isLoggedIn && <div>
            {products?.length > 0 && amount > 0 && pricingType === 'subscription' && <div className="select-none font-tt-ramillas text-center font-normal text-4xl sm:text-5xl leading-[43.2px] sm:leading-[57.6px] text-[#171614] px-[50px] sm:px-[110px]">
              FOR ${amount} A MONTH, YOU&apos;LL GET ALL OF THIS
            </div>}

          </div>}

          {products?.length > 0 && amount > 0 && pricingType === 'bundle' && <div className="select-none font-tt-ramillas text-center font-normal text-4xl sm:text-5xl leading-[43.2px] sm:leading-[57.6px] text-[#171614] px-[50px] sm:px-[110px]">
            FOR YOUR ${amount} BUNDLE, YOU&apos;LL GET ALL OF THIS
          </div>}

          {isLoggedIn && <div>
            {pricingType === 'subscription' && <div className="select-none font-tt-ramillas text-center font-normal text-4xl sm:text-5xl leading-[43.2px] sm:leading-[57.6px] text-[#171614] px-[50px] sm:px-[110px]">
              FOR ${amount} A MONTH, YOU&apos;LL GET ALL OF THIS
            </div>}
            {/* {pricingType === 'bundle' && <div className="select-none font-tt-ramillas text-center font-normal text-4xl sm:text-5xl leading-[43.2px] sm:leading-[57.6px] text-[#171614] px-[50px] sm:px-[110px]">
            FOR YOUR ${amount} BUNDLE, YOU'LL GET ALL OF THIS. for bundle selection.
          </div>} */}
          </div>}

        </div>
      }

      {/* <div className="font-tt-ramillas text-center font-normal text-4xl sm:text-5xl leading-[43.2px] sm:leading-[57.6px] text-[#171614] px-[50px] sm:px-[110px]">
        YOU'LL GET ALL OF THIS. Directing to major and minor giveaways, showing timers and entries as per selected plan. 'For Your $[x]' contains accumulative price.
      </div> */}

      {/* <div className="font-tt-ramillas text-primary font-normal text-[30px] sm:text-5xl leading-9 sm:leading-[57.6px]">
        {subHeading}
      </div> */}

      {width < 640 && giveAwayData &&
        <Swiper
          style={{
            paddingBottom: "48px"
          }}
          slidesPerView={1.2}
          pagination={{ clickable: true }}
          spaceBetween={16}
          modules={[Pagination]}
          className="mySwiper"
        >
          {giveAwayData?.map((giveAway, index) => (
            <SwiperSlide key={index} className="rounded-[20px]">
              <div
                className="relative border-2 shadow-lg border-[#E5E7EB] bg-white flex flex-col items-left sm:flex-row rounded-[20px]"
              >
                {pricingType === 'bundle' && index !== 0 && <div className="absolute w-full h-full z-30 bg-[#17161440] opacity-75 rounded-[20px]"></div>}

                <Image
                  src={giveAway?.image ? giveAway?.image?.file_url : "/images/bagpack-2.jpeg"}
                  alt="bagpack"
                  // layout="responsive"
                  width={319}
                  height={280}
                  className={`!rounded-t-[20px] min-h-[313px]`}
                />

                {!isLoggedIn && products?.length > 0 &&
                  entries > 0 &&
                  ((pricingType === "bundle" && index === 0) || pricingType !== "bundle") &&
                  <div className="absolute top-4 left-4 flex flex-row gap-2 bg-[#EFECE5] py-2 px-4 rounded-[20px]">
                    <HiOutlineGift size={24} color="#B06E6A" />
                    <div className="font-semibold text-base leading text-primary">
                      {entries < 1000 ? entries : `${(entries / 1000).toFixed(1)}k`} {entries > 1 ? 'entries' : 'entry'}
                    </div>
                  </div>}

                {isLoggedIn && products.length === 0 &&
                  ((pricingType === "bundle" && index === 0) || pricingType !== "bundle") &&
                  <div className="absolute top-4 left-4 flex flex-row gap-2 bg-[#EFECE5] py-2 px-4 rounded-[20px]">
                    <HiOutlineGift size={24} color="#B06E6A" />
                    <div className="font-semibold text-base leading text-primary">
                      {session?.user?.user?.metadata?.total_entries_count < 1000 ? session?.user?.user?.metadata?.total_entries_count : `${(session?.user?.user?.metadata?.total_entries_count / 1000).toFixed(1)}k`} {session?.user?.user?.metadata?.total_entries_count > 1 ? 'entries' : 'entry'}
                    </div>
                  </div>}

                {isLoggedIn && products.length > 0 &&
                  entries > 0 &&
                  ((pricingType === "bundle" && index === 0) || pricingType !== "bundle") &&
                  <div className="absolute top-4 left-4 flex flex-row gap-2 bg-[#EFECE5] py-2 px-4 rounded-[20px]">
                    <HiOutlineGift size={24} color="#B06E6A" />
                    <div className="font-semibold text-base leading text-primary">
                      {entries < 1000 ? entries : `${(entries / 1000).toFixed(1)}k`} {entries > 1 ? 'entries' : 'entry'}
                    </div>
                  </div>}

                <div className="py-8 px-6 flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-[30px] leading-9 text-[#171614]">
                      {giveAway?.brand}
                    </div>
                    <div title={giveAway?.description} className="font-normal text-lg leading-[28px]">
                      {giveAway?.description ? giveAway?.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'}
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div>

                      <Timer
                        containerClass="flex flex-row gap-2"
                        boxClass="w-8 h-8 flex flex-col items-center justify-center"
                        textClass="text-center w-[32px] p-[6.43px] text-[14px] leading-[20px] font-semibold text-white rounded-lg bg-[#171614] border border-[#171614]"
                        labelClass="font-normal text-base leading-7"
                        labelPosition="bottom"
                        drawDate={giveAway?.draw_time}
                      />

                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      }

      {
        width >= 640 && <div className="flex flex-wrap gap-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {giveAwayData && giveAwayData?.map((giveAway, index) => (
              <div key={index} className="relative shadow-lg bg-white flex flex-col xl:flex-row !h-[265px] rounded-[20px]" >
                {pricingType === 'bundle' && index !== 0 && <div className="absolute w-full h-full z-30 bg-[#17161440] opacity-75 rounded-[20px]"></div>}

                <Image
                  src={giveAway?.image ? giveAway?.image?.file_url : "/images/bagpack-2.jpeg"}
                  alt="bagpack"
                  // layout="responsive"
                  width={319}
                  height={252}
                  className="!rounded-l-[20px] object-cover"
                />

                {!isLoggedIn && products?.length > 0 &&
                  entries > 0 &&
                  ((pricingType === "bundle" && index === 0) || pricingType !== "bundle")
                  && <div className="absolute top-4 left-4  flex flex-row gap-2 bg-[#EFECE5] py-2 px-4 rounded-[20px]">
                    <HiOutlineGift size={24} color="#B06E6A" />
                    <div className="font-semibold text-base leading text-primary">
                      {entries < 1000 ? entries : `${(entries / 1000).toFixed(1)}k`} {entries > 1 ? 'entries' : 'entry'}
                    </div>
                  </div>}


                {isLoggedIn && products.length === 0 &&
                  ((pricingType === "bundle" && index === 0) || pricingType !== "bundle")
                  && <div className="absolute top-4 left-4  flex flex-row gap-2 bg-[#EFECE5] py-2 px-4 rounded-[20px]">
                    <HiOutlineGift size={24} color="#B06E6A" />
                    <div className="font-semibold text-base leading text-primary">
                      {session?.user?.user?.metadata?.total_entries_count < 1000 ? session?.user?.user?.metadata?.total_entries_count : `${(session?.user?.user?.metadata?.total_entries_count / 1000).toFixed(1)}k`} {session?.user?.user?.metadata?.total_entries_count > 1 ? 'entries' : 'entry'}
                    </div>
                  </div>}

                {isLoggedIn && products.length > 0 &&
                  entries > 0 &&
                  ((pricingType === "bundle" && index === 0) || pricingType !== "bundle")
                  && <div className="absolute top-4 left-4  flex flex-row gap-2 bg-[#EFECE5] py-2 px-4 rounded-[20px]">
                    <HiOutlineGift size={24} color="#B06E6A" />
                    <div className="font-semibold text-base leading text-primary">
                      {entries < 1000 ? entries : `${(entries / 1000).toFixed(1)}k`} {entries > 1 ? 'entries' : 'entry'}
                    </div>
                  </div>}

                <div className="pl-6 py-6 pr-3 flex flex-col gap-4">
                  <div className=" bg-primary border border-primary px-2 rounded-[16px] w-fit">
                    <div className="font-semibold text-xs leading-6 text-[#FFFFFF]">MAJOR</div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div title={giveAway?.brand} className="font-semibold text-[24px] line-clamp-1 overflow-hidden leading-8 text-[#171614]">
                      {giveAway?.brand}
                    </div>
                    <div title={giveAway?.description} className="font-normal text-base leading-6 line-clamp-3 overflow-hidden">
                      {giveAway?.description ? giveAway?.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'}
                    </div>
                  </div>

                  {/* <div className="flex flex-row gap-2"> */}
                  <div className="mt-3">

                    {/* <Timer
                        containerClass="flex flex-row gap-2"
                        boxClass="flex flex-col gap-[6px] items-center justify-center"
                        textClass="text-center w-[54px] text-[30px] leading-9 font-semibold text-[#171614] rounded-lg bg-white border border-[#171614] p-[6.43px]"
                        labelClass="font-normal text-lg leading-7"
                        labelPosition="bottom"
                        drawDate={giveAway?.draw_time}
                      /> */}
                    <Timer
                      containerClass="flex flex-row gap-2"
                      boxClass="w-8 h-8 flex flex-col items-center justify-center"
                      textClass="text-center w-[32px] p-[6.43px] text-[14px] leading-[20px] font-semibold text-white rounded-lg bg-[#171614] border border-[#171614]"
                      labelClass="font-normal text-base leading-7"
                      labelPosition="bottom"
                      drawDate={giveAway?.draw_time}
                    />
                  </div>
                  {/* </div> */}

                </div>
              </div>
            ))}
          </div>

        </div>
      }

    </section >
  )
}
