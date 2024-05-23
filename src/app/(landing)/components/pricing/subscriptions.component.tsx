'use client'

import { messages } from "@/shared/constants/messages";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import './styles.css';

import { SubscriptionInfoCard } from "../subscription-card/subscription-card.comonent";
import { Product } from "@/entities";
import { useCheckOutStore } from "@/store";
import { getDefaultPrice, getDiscountedPrice, getProductPrice } from "@/utils";

export function Subscription({
  subscriptions
}: {
  subscriptions: Array<Product>
}) {
  const { addProduct, products, clearProducts } = useCheckOutStore();
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full mt-12">
      <button
        className="font-medium text-primary text-lg leading-7 cursor-pointer"
        onClick={() => clearProducts("subscription")}
      >
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
          {subscriptions
            .sort((a, b) => a.sort_order - b.sort_order)
            .map(subscription => (
              <SwiperSlide key={subscription.id}>
                <SubscriptionInfoCard
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
        <div className="flex gap-8 [&>*]:flex-1">
          {subscriptions
            .sort((a, b) => a.sort_order - b.sort_order)
            .map(subscription => (
              <SubscriptionInfoCard
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