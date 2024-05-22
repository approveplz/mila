'use client'

import { HiArrowUpRight } from "react-icons/hi2";
import { messages } from "@/shared/constants/messages";
import { useEffect, useState } from "react";
import { BundleCard } from "./card.component";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Product } from "@/entities";
import { useCheckOutStore } from "@/store";

export function Bundle({
  bundles
}: {
  bundles: Array<Product>
}) {
  const { pricing: {
    bundleData: {
      bundleA,
      bundleB,
      bundleC,
      bundleD,
      bundleE,
      bundleF,
      clear
    },
    continueWithSelected
  } } = messages;
  const { products, addProduct, increaseProductQuantity, decreaseProductQuantity } = useCheckOutStore();
  const [isMobile, setIsMobile] = useState(false);

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
          {clear}
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
            {bundles.map(bundle => (
              <SwiperSlide key={bundle.id} className="rounded-[24px]">
                <BundleCard
                  cardData={{
                    benefits: bundleA.benefits,
                    cost: bundle.prices.sort((a, b) => a.sort_order - b.sort_order)[0]?.unit_amount || 0,
                    entry: bundle.number_of_entries,
                    selected: products.some(prod => prod.id === bundle.id),
                    quantity: products.find(prod => prod.id === bundle.id)?.quantity || 0,
                    onSelect: () => {
                      addProduct(bundle)
                    },
                    onIncrease: () => increaseProductQuantity(bundle.id),
                    onDecrease: () => decreaseProductQuantity(bundle.id)
                  }}
                />
              </SwiperSlide>
            ))}
            {/* <SwiperSlide className="rounded-[24px] w-[334px]">
              <BundleCard cardData={bundleB} />
            </SwiperSlide>
            <SwiperSlide className="rounded-[24px] w-[334px]">
              <BundleCard cardData={bundleC} />
            </SwiperSlide>
            <SwiperSlide className="rounded-[24px] w-[334px]">
              <BundleCard cardData={bundleD} />
            </SwiperSlide>
            <SwiperSlide className="rounded-[24px] w-[334px]">
              <BundleCard cardData={bundleE} />
            </SwiperSlide>
            <SwiperSlide className="rounded-[24px] w-[334px]">
              <BundleCard cardData={bundleF} />
            </SwiperSlide> */}

          </Swiper>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {bundles.map(bundle => (
              <BundleCard
                key={bundle.id}
                cardData={{
                  benefits: bundleA.benefits,
                  cost: bundle.prices.sort((a, b) => a.sort_order - b.sort_order)[0]?.unit_amount || 0,
                  entry: bundle.number_of_entries,
                  selected: products.some(prod => prod.id === bundle.id),
                  quantity: products.find(prod => prod.id === bundle.id)?.quantity || 0,
                  onSelect: () => {
                    addProduct(bundle)
                  },
                  onIncrease: () => increaseProductQuantity(bundle.id),
                  onDecrease: () => decreaseProductQuantity(bundle.id)
                }}
              />
            ))}
            {/* <BundleCard cardData={bundleA} />
            <BundleCard cardData={bundleB} />
            <BundleCard cardData={bundleC} />
            <BundleCard cardData={bundleD} />
            <BundleCard cardData={bundleE} />
            <BundleCard cardData={bundleF} /> */}
          </div>
        )}
      </div>
    </section>
  )
}