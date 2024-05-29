'use client'

import { messages } from "@/shared/constants/messages";
import { useEffect, useState } from "react";
import { BundleCard } from "./card.component";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Product } from "@/entities";
import { useCheckOutStore } from "@/store";
import { getDefaultPrice } from "@/utils";
import { SubscriptionCard } from "@/components/overlay/signup-drawer/_components/sub-card/sub-card.component";

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
  const {
    products,
    addProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
    clearProducts
  } = useCheckOutStore();
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
        <button
          className="font-medium text-primary text-lg leading-7 cursor-pointer"
          onClick={() => clearProducts("bundle")}
        >
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
            {[...bundles]
              .sort((bundleA, bundleB) => bundleA.number_of_entries - bundleB.number_of_entries)
              .map(bundle => (
                <SwiperSlide key={bundle.id} className="rounded-[24px]">
                  <BundleCard
                    cardData={{
                      benefits: bundleA.benefits,
                      cost: getDefaultPrice(bundle.prices),
                      entry: bundle.number_of_entries,
                      selected: products.some(prod => prod.id === bundle.id),
                      quantity: products.find(prod => prod.id === bundle.id)?.quantity || 0,
                      duration: bundle.access_duration,
                      onSelect: () => addProduct(bundle),
                      onIncrease: () => increaseProductQuantity(bundle.id),
                      onDecrease: () => decreaseProductQuantity(bundle.id)
                    }}
                    selected={products.some(prod => prod.id === bundle.id)}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {[...bundles]
              .sort((bundleA, bundleB) => bundleA.number_of_entries - bundleB.number_of_entries)
              .map(bundle => (
                <BundleCard
                  key={bundle.id}
                  cardData={{
                    benefits: bundleA.benefits,
                    cost: getDefaultPrice(bundle.prices),
                    entry: bundle.number_of_entries,
                    selected: products.some(prod => prod.id === bundle.id),
                    quantity: products.find(prod => prod.id === bundle.id)?.quantity || 0,
                    duration: bundle.access_duration,
                    onSelect: () => addProduct(bundle),
                    onIncrease: () => increaseProductQuantity(bundle.id),
                    onDecrease: () => decreaseProductQuantity(bundle.id)
                  }}
                  selected={products.some(prod => prod.id === bundle.id)}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  )
}