'use client'
import { Button } from "@/components";
import { messages } from "@/shared/constants/messages";
import { HiCheck } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";
import { HiArrowUpRight } from "react-icons/hi2";
import { HiOutlineGift } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import './styles.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { SubscriptionInfoCard } from "../subscription-card/subscription-card.comonent";
import { Product } from "@/entities";
import { useCheckOutStore } from "@/store";

export function Subscription({
  subscriptions
}: {
  subscriptions: Array<Product>
}) {
  const { addProduct, products, checkoutFlow } = useCheckOutStore();
  const { pricing: {
    subscriptionData: {
      free,
      bronze,
      silver,
      gold,
      days,
      getMessageA,
      getMessageB,
      select
    },
    continueWithSelected,
    clearSelection,
  } } = messages;

  const [isMobile, setIsMobile] = useState(false);

  console.log("subscriptions: ", subscriptions);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="flex flex-col items-center gap-12 bg-[#F3F3F3] mt-12">
      <div className="flex flex-col items-center gap-6 w-full">
        <button className="font-medium text-primary text-lg leading-7 cursor-pointer">
          {clearSelection}
        </button>

        {isMobile ? (
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
            <SwiperSlide className="rounded-[24px]">
              <div className="relative overflow-hidden bg-white rounded-[24px]  h-[579px]  border-[#CDCDCD]">
                <div className="z-10 cardA opacity-[0.02] absolute bg-[url('/images/subscription.png')] w-full h-full" />

                <div className="z-20 flex flex-col items-left gap-8 py-8 border-2 rounded-[24px] h-[579px]">
                  <div className="flex flex-col items-center px-6">
                    <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                      {free?.title}
                    </div>

                    <div className="flex flex-col gap-8 items-center pt-10 w-full">
                      <div className="flex flex-col items-center">
                        <div className="font-semibold text-4xl leading-[40px]">
                          {free?.amount}
                        </div>
                        <div className="font-normal text-base leading-6">
                          {days}
                        </div>
                      </div>

                      <hr className=" w-full border-t border-[#D1D5DB]" />

                      <div className="flex flex-col gap-2 items-center">
                        <div className="font-normal text-base leading-6">
                          {getMessageA}
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                          <HiOutlineGift size={24} color="#BE7B62" />
                          <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{free?.entry}</span>
                        </div>

                        <div className="font-normal text-base leading-6">
                          {getMessageB}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-left gap-1 px-6">
                    {free?.benefits.map((benefit, index) => (
                      <div key={index} className="flex flex-row gap-[7px] items-center">
                        {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                        <div className="font-normal text-base leading-6">
                          {benefit?.benefit}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 w-full flex flex-col">
                    <Button variant="tertiary">{select}</Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="rounded-[24px]">
              <div className="relative overflow-hidden bg-[#EFECE5] rounded-[24px] border-2  h-[579px]  border-primary">

                <div className="z-10 cardB opacity-[0.02] absolute bg-[url('/images/subscription.png')] w-full h-full">

                </div>

                <div className="z-20 flex flex-col items-left gap-8  py-8 border-2 rounded-[24px] h-[579px]">

                  <div className="flex flex-col items-center px-6">

                    <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                      {bronze?.title}
                    </div>

                    <div className="flex flex-col gap-8 items-center w-full mt-1">
                      <div className="flex flex-col items-center">

                        <div className="font-semibold text-[30px] leading-9 text-[#C7B8A3] line-through">
                          {bronze?.oldPrice}
                        </div>


                        <div className="font-semibold text-4xl leading-[40px]">
                          {bronze?.price}
                        </div>
                        <div className="font-normal text-base leading-6">
                          {days}
                        </div>
                      </div>

                      <hr className=" w-full border-t border-[#D1D5DB]" />

                      <div className="flex flex-col gap-2 items-center">

                        <div className="font-normal text-base leading-6">

                          {getMessageA}
                        </div>

                        <div className="flex flex-row gap-2 items-center">


                          <HiOutlineGift size={24} color="#BE7B62" />
                          <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{bronze?.entry}</span>

                        </div>

                        <div className="font-normal text-base leading-6">

                          {getMessageB}
                        </div>

                      </div>

                    </div>
                  </div>
                  <div className="flex flex-col items-left gap-1 px-3">
                    {
                      bronze?.benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-row gap-[7px] items-center">
                          {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                          <div className="font-normal text-base leading-6">
                            {benefit?.benefit}
                          </div>
                        </div>
                      ))
                    }

                  </div>

                  <div className="px-6 w-full flex flex-col">
                    <Button variant="primary">{select}</Button>
                  </div>



                </div>

              </div>

            </SwiperSlide>

            <SwiperSlide className="rounded-[24px]">
              <div className="relative overflow-hidden bg-[#DFD7C9] rounded-[24px]  h-[579px]  border-[#CDCDCD]">

                <div className="z-10 cardC opacity-[0.02] absolute bg-[url('/images/subscription.png')] w-full h-full">

                </div>

                <div className="z-20 flex flex-col items-left gap-8  py-8 border-2 rounded-[24px] h-[579px]">

                  <div className="flex flex-col items-center px-6">

                    <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                      {silver?.title}
                    </div>

                    <div className="flex flex-col gap-8 items-center w-full mt-1">
                      <div className="flex flex-col items-center">

                        <div className="font-semibold text-[30px] leading-9 text-[#C7B8A3] line-through">
                          {silver?.oldPrice}
                        </div>


                        <div className="font-semibold text-4xl leading-[40px]">
                          {silver?.price}
                        </div>
                        <div className="font-normal text-base leading-6">
                          {days}
                        </div>
                      </div>

                      <hr className=" w-full border-t border-[#9CA3AF]" />

                      <div className="flex flex-col gap-2 items-center">

                        <div className="font-normal text-base leading-6">

                          {getMessageA}
                        </div>

                        <div className="flex flex-row gap-2 items-center">


                          <HiOutlineGift size={24} color="#BE7B62" />
                          <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{silver?.entry}</span>

                        </div>

                        <div className="font-normal text-base leading-6">

                          {getMessageB}
                        </div>

                      </div>

                    </div>
                  </div>
                  <div className="flex flex-col items-left gap-1 px-3">
                    {
                      silver?.benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-row gap-[7px] items-center">
                          {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                          <div className="font-normal text-base leading-6">
                            {benefit?.benefit}
                          </div>

                        </div>
                      ))
                    }

                  </div>

                  <div className="px-6 w-full flex flex-col">
                    <Button variant="tertiary">{select}</Button>
                  </div>



                </div>

              </div>

            </SwiperSlide>

            <SwiperSlide className="rounded-[24px]">
              <div className="relative overflow-hidden bg-[#C7B8A3] rounded-[24px]  h-[579px] border-[#CDCDCD]">

                <div className="z-10 cardD opacity-[0.02] absolute bg-[url('/images/subscription.png')] w-full h-full">

                </div>

                <div className="z-20 flex flex-col items-left gap-8  py-8 border-2 rounded-[24px] h-[579px]">

                  <div className="flex flex-col items-center px-6">

                    <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                      {gold?.title}
                    </div>

                    <div className="flex flex-col gap-8 items-center w-full mt-1">
                      <div className="flex flex-col items-center">

                        <div className="font-semibold text-[30px] leading-9 text-[#C7B8A3] line-through">
                          {gold?.oldPrice}
                        </div>


                        <div className="font-semibold text-4xl leading-[40px]">
                          {gold?.price}
                        </div>
                        <div className="font-normal text-base leading-6">
                          {days}
                        </div>
                      </div>

                      <hr className=" w-full border-t border-[#D1D5DB]" />

                      <div className="flex flex-col gap-2 items-center">

                        <div className="font-normal text-base leading-6">

                          {getMessageA}
                        </div>

                        <div className="flex flex-row gap-2 items-center">


                          <HiOutlineGift size={24} color="#BE7B62" />
                          <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{gold?.entry}</span>

                        </div>

                        <div className="font-normal text-base leading-6">

                          {getMessageB}
                        </div>

                      </div>

                    </div>
                  </div>
                  <div className="flex flex-col items-left gap-1 px-3">
                    {
                      gold?.benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-row gap-[7px] items-center">
                          {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                          <div className="font-normal text-base leading-6">
                            {benefit?.benefit}
                          </div>

                        </div>
                      ))
                    }

                  </div>

                  <div className="px-6 w-full flex flex-col">
                    <Button variant="tertiary">{select}</Button>
                  </div>

                </div>

              </div>

            </SwiperSlide>
          </Swiper>
        ) : (
          <div className="flex flex-row gap-8">
            {subscriptions
              .sort((a, b) => a.sort_order - b.sort_order)
              .map(subscription => (
                <SubscriptionInfoCard
                  key={subscription.id}
                  title={subscription.name}
                  duration={subscription.access_duration}
                  type={subscription.tier as any}
                  amount={subscription.prices.sort((a, b) => a.sort_order - a.sort_order)[0]?.unit_amount || 0}
                  entries={subscription.number_of_entries}
                  selected={products.some(prod => prod.id === subscription.id)}
                  onSelect={() => {
                    addProduct(subscription)
                  }}
                />
              ))}

            {/* <div className="relative overflow-hidden bg-white rounded-[24px] h-[579px] border-[#CDCDCD]">
              <div className="z-0 cardA opacity-[0.02] absolute bg-[url('/images/subscription.png')] !w-[304px] !h-[579px]" />

              <div className="z-10 relative flex flex-col items-left gap-8  py-8 border-2 rounded-[24px]  w-[304px] h-[579px]">
                <div className="flex flex-col items-center px-6">
                  <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                    {free?.title}
                  </div>

                  <div className="flex flex-col gap-8 items-center pt-10 w-full">
                    <div className="flex flex-col items-center">
                      <div className="font-semibold text-4xl leading-[40px]">
                        {free?.amount}
                      </div>
                      <div className="font-normal text-base leading-6">
                        {days}
                      </div>
                    </div>

                    <hr className=" w-full border-t border-[#D1D5DB]" />

                    <div className="flex flex-col gap-2 items-center">
                      <div className="font-normal text-base leading-6">
                        {getMessageA}
                      </div>

                      <div className="flex flex-row gap-2 items-center">
                        <HiOutlineGift size={24} color="#BE7B62" />
                        <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{free?.entry}</span>
                      </div>
                      <div className="font-normal text-base leading-6">
                        {getMessageB}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-left gap-1 px-6">
                  {free?.benefits.map((benefit, index) => (
                    <div key={index} className="flex flex-row gap-[7px] items-center">
                      {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                      <div className="font-normal text-base leading-6">
                        {benefit?.benefit}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-6 w-full flex flex-col">
                  <Button variant="tertiary">{select}</Button>
                </div>
              </div>
            </div> */}

            {/* <div className="relative overflow-hidden bg-[#EFECE5] rounded-[24px]  h-[579px] border-2 border-primary">

              <div className="z-0 cardB opacity-[0.02] absolute bg-[url('/images/subscription.png')] w-full h-full">

              </div>

              <div className="z-10 relative flex flex-col items-left gap-8  py-8 border-2 rounded-[24px]  w-[304px] h-[579px]">

                <div className="flex flex-col items-center px-6">

                  <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                    {bronze?.title}
                  </div>

                  <div className="flex flex-col gap-8 items-center w-full mt-1">
                    <div className="flex flex-col items-center">

                      <div className="font-semibold text-[30px] leading-9 text-[#C7B8A3] line-through">
                        {bronze?.oldPrice}
                      </div>


                      <div className="font-semibold text-4xl leading-[40px]">
                        {bronze?.price}
                      </div>
                      <div className="font-normal text-base leading-6">
                        {days}
                      </div>
                    </div>

                    <hr className=" w-full border-t border-[#D1D5DB]" />

                    <div className="flex flex-col gap-2 items-center">

                      <div className="font-normal text-base leading-6">

                        {getMessageA}
                      </div>

                      <div className="flex flex-row gap-2 items-center">


                        <HiOutlineGift size={24} color="#BE7B62" />
                        <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{bronze?.entry}</span>

                      </div>

                      <div className="font-normal text-base leading-6">

                        {getMessageB}
                      </div>

                    </div>

                  </div>
                </div>
                <div className="flex flex-col items-left gap-1 px-3">
                  {
                    bronze?.benefits.map((benefit, index) => (
                      <div key={index} className="flex flex-row gap-[7px] items-center">
                        {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                        <div className="font-normal text-base leading-6">
                          {benefit?.benefit}
                        </div>
                      </div>
                    ))
                  }

                </div>

                <div className="px-6 w-full flex flex-col">
                  <Button variant="primary">{select}</Button>
                </div>



              </div>

            </div>

            <div className="relative overflow-hidden bg-[#DFD7C9] rounded-[24px]  h-[579px]  border-[#CDCDCD]">

              <div className="z-0 cardC opacity-[0.02] absolute bg-[url('/images/subscription.png')] w-full h-full">

              </div>

              <div className="z-10 relative flex flex-col items-left gap-8  py-8 border-2 rounded-[24px]  w-[304px] h-[579px]">

                <div className="flex flex-col items-center px-6">

                  <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                    {silver?.title}
                  </div>

                  <div className="flex flex-col gap-8 items-center w-full mt-1">
                    <div className="flex flex-col items-center">

                      <div className="font-semibold text-[30px] leading-9 text-[#C7B8A3] line-through">
                        {silver?.oldPrice}
                      </div>


                      <div className="font-semibold text-4xl leading-[40px]">
                        {silver?.price}
                      </div>
                      <div className="font-normal text-base leading-6">
                        {days}
                      </div>
                    </div>

                    <hr className=" w-full border-t border-[#9CA3AF]" />

                    <div className="flex flex-col gap-2 items-center">

                      <div className="font-normal text-base leading-6">

                        {getMessageA}
                      </div>

                      <div className="flex flex-row gap-2 items-center">


                        <HiOutlineGift size={24} color="#BE7B62" />
                        <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{silver?.entry}</span>

                      </div>

                      <div className="font-normal text-base leading-6">

                        {getMessageB}
                      </div>

                    </div>

                  </div>
                </div>
                <div className="flex flex-col items-left gap-1 px-3">
                  {
                    silver?.benefits.map((benefit, index) => (
                      <div key={index} className="flex flex-row gap-[7px] items-center">
                        {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                        <div className="font-normal text-base leading-6">
                          {benefit?.benefit}
                        </div>

                      </div>
                    ))
                  }

                </div>

                <div className="px-6 w-full flex flex-col">
                  <Button variant="tertiary">{select}</Button>
                </div>



              </div>

            </div>


            <div className="relative overflow-hidden bg-[#C7B8A3] rounded-[24px]  h-[579px]  border-[#CDCDCD]">

              <div className="z-0 cardD opacity-[0.02] absolute bg-[url('/images/subscription.png')] w-full h-full">

              </div>

              <div className="z-10 relative flex flex-col items-left gap-8  py-8 border-2 rounded-[24px]  w-[304px] h-[579px]">

                <div className="flex flex-col items-center px-6">

                  <div className="font-tt-ramillas font-medium text-4xl leading-[46.8px]">
                    {gold?.title}
                  </div>

                  <div className="flex flex-col gap-8 items-center w-full mt-1">
                    <div className="flex flex-col items-center">

                      <div className="font-semibold text-[30px] leading-9 text-[#C7B8A3] line-through">
                        {gold?.oldPrice}
                      </div>


                      <div className="font-semibold text-4xl leading-[40px]">
                        {gold?.price}
                      </div>
                      <div className="font-normal text-base leading-6">
                        {days}
                      </div>
                    </div>

                    <hr className=" w-full border-t border-[#D1D5DB]" />

                    <div className="flex flex-col gap-2 items-center">

                      <div className="font-normal text-base leading-6">

                        {getMessageA}
                      </div>

                      <div className="flex flex-row gap-2 items-center">


                        <HiOutlineGift size={24} color="#BE7B62" />
                        <span className="font-tt-ramillas text-4xl font-medium leading-[43.2px] text-primary">{gold?.entry}</span>

                      </div>

                      <div className="font-normal text-base leading-6">

                        {getMessageB}
                      </div>

                    </div>

                  </div>
                </div>
                <div className="flex flex-col items-left gap-1 px-3">
                  {
                    gold?.benefits.map((benefit, index) => (
                      <div key={index} className="flex flex-row gap-[7px] items-center">
                        {benefit?.included ? <HiCheck size={16} color="black" /> : <HiXMark size={16} color="black" />}
                        <div className="font-normal text-base leading-6">
                          {benefit?.benefit}
                        </div>

                      </div>
                    ))
                  }

                </div>

                <div className="px-6 w-full flex flex-col">
                  <Button variant="tertiary">{select}</Button>
                </div>
              </div>
            </div> */}
          </div>
        )}
      </div>

      {/* <div className="bg-[#171614] py-3 px-6 items-center rounded-[30px] cursor-pointer flex flex-row gap-2">
        <span className="font-medium text-white text-base leading-6">{continueWithSelected} </span> <HiArrowUpRight size={24} color="white" />
      </div> */}
    </section>
  )
}