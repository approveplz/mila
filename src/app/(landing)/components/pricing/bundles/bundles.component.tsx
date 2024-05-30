'use client'

import { messages } from "@/shared/constants/messages";
import { BundleCard } from "./card.component";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Product } from "@/entities";
import { useCheckOutStore } from "@/store";
import { getDefaultPrice } from "@/utils";
import { useWidth } from "@/hooks";
import { Session } from "next-auth";

type BundleProps = {
  bundles: Array<Product>;
  session: Session | null
};

export function Bundle({ bundles, session }: BundleProps) {
  const { pricing: {
    bundleData: {
      bundleA,
      clear
    }
  } } = messages;
  const {
    products,
    addProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
    clearProducts
  } = useCheckOutStore();
  const { width } = useWidth()
  const isLoggedIn = !!session;

  return (
    <section className="flex flex-col items-center gap-12 bg-[#F3F3F3] mt-12">
      <div className="flex flex-col items-center gap-6 w-full">
        {products.filter(product => product.data.type === "bundle").length > 0 && (
          <button
            className="font-medium text-primary text-lg leading-7 cursor-pointer"
            onClick={() => clearProducts("bundle")}
          >
            {clear}
          </button>
        )}

        {width < 768 ? (
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
                      cardId: bundle.id,
                      session: session,
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
                    cardId: bundle.id,
                    session: session,
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