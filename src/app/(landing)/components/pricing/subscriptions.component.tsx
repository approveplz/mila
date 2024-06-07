'use client'

import { messages } from "@/shared/constants/messages";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import './styles.css';

import { SubscriptionInfoCard } from "../subscription-card/subscription-card.comonent";
import { Product } from "@/entities";
import { useCheckOutStore } from "@/store";
import { getDefaultPrice, getDiscountedPrice, getProductPrice } from "@/utils";
import { Session } from "next-auth";
import { useWidth } from "@/hooks";

type SubscriptionProps = {
  subscriptions: Array<Product>;
  session: Session | null
};

export default function Subscription({ subscriptions, session }: SubscriptionProps) {
  const { addProduct, products, clearProducts } = useCheckOutStore();
  const { pricing: {
    clearSelection,
  } } = messages;

  const { width } = useWidth()
  const isLoggedIn = !!session;

  return (
    <div className="flex flex-col gap-6 w-full mt-12">
      {products.filter(product => product.data.type === "subscription").length > 0 && (
        <button
          className="font-medium text-primary text-lg leading-7 cursor-pointer"
          onClick={() => clearProducts("subscription")}
        >
          {clearSelection}
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
          {subscriptions
            .sort((a, b) => a.sort_order - b.sort_order)
            .map(subscription => (
              <SwiperSlide key={subscription.id}>
                <SubscriptionInfoCard
                  cardId={subscription.id}
                  session={session}
                  title={subscription.name}
                  duration={subscription.access_duration}
                  type={subscription.tier as any}
                  entries={subscription.number_of_entries}
                  selected={products.some(prod => prod.id === subscription.id)}
                  {...getProductPrice(subscription.prices)}
                  onSelect={() => {
                    addProduct(subscription)
                  }}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <div className="flex gap-2 [&>*]:flex-1">
          {subscriptions
            .sort((a, b) => a.sort_order - b.sort_order)
            .map(subscription => (
              <SubscriptionInfoCard
                cardId={subscription.id}
                session={session}
                key={subscription.id}
                title={subscription.name}
                duration={subscription.access_duration}
                type={subscription.tier as any}
                entries={subscription.number_of_entries}
                selected={products.some(prod => prod.id === subscription.id)}
                {...getProductPrice(subscription.prices)}
                onSelect={() => {
                  addProduct(subscription)
                }}
              />
            ))}
        </div>
      )}
    </div>
  )
}