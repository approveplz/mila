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
import { Button, BuyBundleDialog, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { HiArrowUpRight } from "react-icons/hi2";
import { buyAdditionalBundles, checkInvoicePaymentStatus } from "@/api/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
    clearProducts,
    pricingType
  } = useCheckOutStore();
  const { width } = useWidth()
  const isLoggedIn = !!session;
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // const buyBundles = () => {
  //   const items = products.map(product => ({ price: product?.data?.prices[0]?.id, quantity: product.quantity }));
  //   console.log(items);
  //   setIsLoading(true)
  //   buyAdditionalBundles(session?.user?.user?.id as string, { prices: items }).then(res => {
  //     toast("Invoice has been generated, please wait while bundles are being bought.", {
  //       action: {
  //         label: "X",
  //         onClick: () => console.log("Undo"),
  //       },
  //     })

  //     const invoiceId = res?.invoice;
  //     let attempts = 0;
  //     const maxAttempts = 12;

  //     const interval = setInterval(() => {
  //       checkInvoicePaymentStatus({ invoiceId })
  //         .then(paymentStatus => {
  //           if (paymentStatus.is_paid) {
  //             clearInterval(interval);
  //             toast("Additional bundle bought Successfuly", {
  //               action: {
  //                 label: "X",
  //                 onClick: () => console.log("Undo"),
  //               },
  //             })
  //             setIsLoading(false);
  //             clearProducts("all");
  //           } else {
  //             attempts += 1;
  //             if (attempts >= maxAttempts) {
  //               clearInterval(interval);
  //               toast("Error occured while buying additional bundles", {
  //                 action: {
  //                   label: "X",
  //                   onClick: () => console.log("Undo"),
  //                 },
  //               })
  //               setIsLoading(false);
  //             }
  //           }
  //         })
  //         .catch(error => {
  //           clearInterval(interval);
  //           toast("Error occured while buying additional bundles", {
  //             action: {
  //               label: "X",
  //               onClick: () => console.log("Undo"),
  //             },
  //           })
  //           setIsLoading(false);
  //         });
  //     }, 2000);
  //   }).catch(error => {
  //     console.error('Error checking payment status:', error);
  //     toast("Error occured while generating invoice", {
  //       action: {
  //         label: "X",
  //         onClick: () => console.log("Undo"),
  //       },
  //     })

  //   })
  // }

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
          <div className="grid grid-cols-3 gap-2 w-full">
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

      {/* <Dialog>
        <DialogTrigger>
          <Button type="submit" variant="fatal">
            <span className="select-none">Continue With Selected</span>
            <HiArrowUpRight className="ml-3 h-6 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:w-[455px] w-[329px] z-[999999]">
          <DialogHeader>
            <DialogTitle className="font-normal text-[32px] leading-[38.4px]">Confirmation</DialogTitle>
          </DialogHeader>
          <div className="leading-9 text-xl font-normal">
            Are you sure you want to buy these additional bundles ?
          </div>
          <Button disabled={isLoading} onClick={buyBundles}>Confirm</Button>
        </DialogContent>
      </Dialog> */}
      {isLoggedIn && products?.length > 0 && pricingType === 'bundle' && (
        <BuyBundleDialog>
          <Button type="submit" variant="fatal">
            <span className="select-none">Continue With Selected</span>
            <HiArrowUpRight className="ml-3 h-6 w-4" />
          </Button>
        </BuyBundleDialog>
      )}
    </section >
  )
}

