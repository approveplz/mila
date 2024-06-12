"use client";

import * as React from "react";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Drawer, DrawerContent, Spinner } from "@/components";
import { useCheckOutStore } from "@/store";
import { toast } from "sonner";
import { buyAdditionalBundles, checkInvoicePaymentStatus, checkPaymentMethodExists } from "@/api/auth";
import { useCurrentSession } from "@/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BuyAdditionalBundlesPayload, GetCheckInvoicePaymentStatusParams } from "@/api/auth/auth.types";
import { getProductPriceInfo, withAsync } from "@/utils";
import { BuyBundlePayment } from "./buy-bundle-payment.component";

export function BuyBundleDialog({ children }: React.PropsWithChildren) {
  const { products, clearProducts } = useCheckOutStore();
  const { session } = useCurrentSession();
  const [showPaymentDialog, setShowPaymentDialog] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

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
      triggerRef.current?.click();
      toast("Additional bundle bought Successfuly")
      window.location.reload()
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
        triggerRef.current?.click();
        setShowPaymentDialog(true);
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
  }

  return (
    <>
      <Dialog>
        <DialogTrigger ref={triggerRef}>
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
            {isPending && <Spinner className="w-4 h-4 ml-4" />}
          </Button>
        </DialogContent>
      </Dialog>

      <Drawer
        dismissible={false}
        nested={true}
        open={showPaymentDialog}
        onOpenChange={(state) => {
          setShowPaymentDialog(state)

          if(state === false) {
            window.location.reload()
          }
        }}
      >
        <DrawerContent className="bg-white h-full rounded-none z-[9999] max-h-screen">
          <BuyBundlePayment />
        </DrawerContent>
      </Drawer>
    </>
  )
}
