"use client";

import * as React from "react";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { useCheckOutStore } from "@/store";
import { toast } from "sonner";
import { buyAdditionalBundles, checkInvoicePaymentStatus, checkPaymentMethodExists } from "@/api/auth";
import { useCurrentSession } from "@/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BuyAdditionalBundlesPayload, GetCheckInvoicePaymentStatusParams } from "@/api/auth/auth.types";
import { getProductPriceInfo, withAsync } from "@/utils";

export function BuyBundleDialog({ children }: React.PropsWithChildren) {
  const { products, clearProducts } = useCheckOutStore();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { session } = useCurrentSession();

  const { mutateAsync: checkPaymentMethodExistMutate } = useMutation({
    mutationFn: () => checkPaymentMethodExists(),
    onSuccess(data, variables, context) {
      console.log("checkPaymentMethodExists data: ", data);
    },
    onError(error, variables, context) {
      console.log("checkPaymentMethodExists error: ", error);
    },
  });

  const { mutate: checkInvoicePaymentStatusMutate } = useMutation({
    mutationFn: (params: GetCheckInvoicePaymentStatusParams) => checkInvoicePaymentStatus(params).then(res => {
      if (res.is_paid) {
        return res;
      } else {
        throw new Error("User is inactive")
      }
    }),
    onSuccess(data, variables, context) {
      toast("Additional bundle bought Successfuly")
    },
    onError(error, variables, context) {
      toast.error("Error occured while buying additional bundles")
    },
    retry(failureCount, error) {
      if (failureCount > 15) return false;

      return true;
    },
    retryDelay: 2000
  })

  const { mutate: buyAdditionalBundlesMutate, isPending } = useMutation({
    // mutationFn: (payload: BuyAdditionalBundlesPayload) => buyAdditionalBundles(payload),
    mutationFn: (payload: BuyAdditionalBundlesPayload) => checkPaymentMethodExistMutate().then(res => {
      if (res.exists) {
        return buyAdditionalBundles(payload)
      }

      return null
    }),
    async onSuccess(data, variables, context) {
      if (data) {
        checkInvoicePaymentStatusMutate({ invoiceId: data.invoice })
      } else {
        console.log("payment flow ====> ");
      }
    },
    onError(error, variables, context) {
      toast.error("Error occured while buying additional bundles")
    },
  });

  const buyBundles = () => {
    buyAdditionalBundlesMutate({
      userId: session?.user.user.id as string,
      prices: products
        .map(product => {
          const { discountedPrice, defaultPrice } = getProductPriceInfo(product.data.prices)

          if (!!discountedPrice) {
            return {
              price: discountedPrice.id,
              quantity: product.quantity
            }
          } else {
            return {
              price: defaultPrice.id,
              quantity: product.quantity
            }
          }
        })
    })

    // setIsLoading(true);

    // buyAdditionalBundles(session?.user?.user?.id as string, { prices: items }).then(res => {
    //   toast("Invoice has been generated, please wait while bundles are being bought.", {
    //     action: {
    //       label: "X",
    //       onClick: () => console.log("Undo"),
    //     },
    //   })

    //   const invoiceId = res?.invoice;
    //   let attempts = 0;
    //   const maxAttempts = 12;

    //   const interval = setInterval(() => {
    //     checkInvoicePaymentStatus({ invoiceId })
    //       .then(paymentStatus => {
    //         if (paymentStatus.is_paid) {
    //           clearInterval(interval);
    //           toast("Additional bundle bought Successfuly", {
    //             action: {
    //               label: "X",
    //               onClick: () => console.log("Undo"),
    //             },
    //           })
    //           setIsLoading(false);
    //           clearProducts("all");
    //         } else {
    //           attempts += 1;
    //           if (attempts >= maxAttempts) {
    //             clearInterval(interval);
    //             toast("Error occured while buying additional bundles", {
    //               action: {
    //                 label: "X",
    //                 onClick: () => console.log("Undo"),
    //               },
    //             })
    //             setIsLoading(false);
    //           }
    //         }
    //       })
    //       .catch(error => {
    //         clearInterval(interval);
    //         toast("Error occured while buying additional bundles", {
    //           action: {
    //             label: "X",
    //             onClick: () => console.log("Undo"),
    //           },
    //         })
    //         setIsLoading(false);
    //       });
    //   }, 2000);
    // }).catch(error => {
    //   console.error('Error checking payment status:', error);
    //   toast("Error occured while generating invoice", {
    //     action: {
    //       label: "X",
    //       onClick: () => console.log("Undo"),
    //     },
    //   })

    // })
  }

  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:w-[455px] w-[329px] z-[999999]">
        <DialogHeader>
          <DialogTitle className="font-normal text-[32px] leading-[38.4px]">Confirmation</DialogTitle>
        </DialogHeader>
        <div className="leading-9 text-xl font-normal">
          Are you sure you want to buy these additional bundles ?
        </div>
        <Button
          disabled={isPending}
          onClick={buyBundles}
        >
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  )
}
