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
import { useCurrentSession, useWidth } from "@/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import useTotalAmount from "@/hooks/useTotalAmount";
import { sendGTMEvent } from '@next/third-parties/google'
import { SubscriptionAction } from "./subscription-action.component";

type SubscriptionProps = {
  subscriptions: Array<Product>;
  session: Session | null
};

export default function Subscription({ subscriptions }: SubscriptionProps) {
  const { addProduct, products, clearProducts } = useCheckOutStore();
  const { pricing: {
    clearSelection,
  } } = messages;
  const { session } = useCurrentSession();

  const { width } = useWidth()
  const isLoggedIn = !!session;
  const subscribed_products = useMemo(() => {
    const subscribedProducts: Array<{ product: string, quantity: number }> = [];
    
    if (session) {
      if (session.user.user.metadata.is_free_tier_subscriber && session.user.user.metadata.is_email_verified === false && session.user.user.metadata.is_phone_verified === false) {
        subscribedProducts.push(...subscriptions.filter(sub => sub.tier === "free").map(prod => ({ product: prod.id, quantity: 1 })));
      };

      subscribedProducts.push(...session?.user.user.metadata.subscribed_products);
    }

    return subscribedProducts;
  }, [session, subscriptions])
  const selectedSubscriptions = products.filter(prod => prod.data.type === "subscription");

  const { totalAmount } = useTotalAmount();

  const getSelected = useCallback((subscription: Product) => {
    const hasInCart = products.some(prod => prod.id === subscription.id);

    if (selectedSubscriptions.length > 0) {
      return hasInCart
    } else {
      return subscribed_products.some(prod => prod.product === subscription.id)
    }
  }, [products, subscribed_products, selectedSubscriptions.length])

  useEffect(() => {
    sendGTMEvent({ event: 'checkout_intent', value: { checkout_total: totalAmount } });
  }, [totalAmount])

  console.log("session: ", session);
  return (
    <>
      <div className="flex flex-col gap-6 w-full mt-12">
        {products.filter(product => product.data.type === "subscription").length > 0 && !isLoggedIn && (
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
                    title={subscription.name}
                    duration={subscription.access_duration}
                    type={subscription.tier as any}
                    entries={subscription.number_of_entries}
                    subscribedProduct={subscriptions.find(sub => subscribed_products.some(prod => prod.product === sub.id))}
                    selected={getSelected(subscription)}
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
                  key={subscription.id}
                  title={subscription.name}
                  duration={subscription.access_duration}
                  type={subscription.tier as any}
                  entries={subscription.number_of_entries}
                  subscribedProduct={subscriptions.find(sub => subscribed_products.some(prod => prod.product === sub.id))}
                  selected={getSelected(subscription)}
                  {...getProductPrice(subscription.prices)}
                  onSelect={() => {
                    addProduct(subscription)
                  }}
                />
              ))}
          </div>
        )}

      </div>

      <div className="flex justify-center">
        {isLoggedIn && <SubscriptionAction subscriptions={subscriptions} />}
      </div>
    </>
  )
}

