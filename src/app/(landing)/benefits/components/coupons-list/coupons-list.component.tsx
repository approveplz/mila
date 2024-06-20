'use client'

import { CouponCard } from "../coupon-card/coupon-card.component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { getCouponCategories, getCoupons } from "@/api/auth";
import { CouponResponse, GetCouponsResponse, GetCouponCategoriesResponse } from "@/api/auth/auth.types";
import {
  useQuery,
  UseQueryResult
} from '@tanstack/react-query'
import { NoCouponsFound } from "../no-coupons-found/no-coupons-found.component";
import { Session } from "next-auth";

export function CoupensList({ session }: { session: Session | null }) {

  const isLoggedIn = !!session;
  const [page, setPage] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const { data: categoryData, isLoading: isCategoryLoading }: UseQueryResult<GetCouponCategoriesResponse> =
    useQuery({
      queryKey: ['couponCategories'],
      queryFn: () =>
        getCouponCategories().then((res) => {
          if (!selectedCategory)
            setSelectedCategory(res?.results[0]?.id)
          return res;

        }),
      enabled: isLoggedIn,
      refetchOnWindowFocus: false,
    })

  const { data: coupons, isLoading: isCouponLoading }: UseQueryResult<GetCouponsResponse> =
    useQuery({
      queryKey: ['coupons', selectedCategory, page],
      queryFn: () =>
        getCoupons({ category: selectedCategory as string, page }).then((res) => {
          return res;
        }),
      enabled: !!selectedCategory,
      refetchOnWindowFocus: false,
    })
  const couponCards = Array.from({ length: 10 });

  return (
    <div className="sm:py-20 sm:px-[175px] px-6 py-12 bg-[#F9FAFB] flex flex-col items-center justify-center gap-12">
      {isLoggedIn && categoryData && !isCategoryLoading && <Tabs defaultValue={categoryData && categoryData?.results[0]?.name} className="w-full">
        <TabsList className="flex flex-row justify-center">
          <div className="flex flex-row gap-[30.17px] bg-[#F9FAFB] rounded-[30px] p-1 overflow-x-auto ">
            {categoryData?.results?.map((category, index) => (
              <TabsTrigger key={index}
                onClick={() => {
                  setPage(1);
                  setSelectedCategory(category.id)
                }}
                value={category.name}
              >{category.name.toUpperCase()}</TabsTrigger>
            ))}
          </div>
        </TabsList>

        {(coupons && !isCouponLoading) &&
          <div className="mt-12 flex justify-center">
            {
              coupons?.results?.length > 0 ? categoryData?.results?.map((category, index) => (
                <TabsContent key={index} value={category?.name}>
                  <div className="grid sm:grid-cols-5 grid-cols-2  gap-4">
                    {coupons?.results.map((coupon: CouponResponse, index) => (
                      <CouponCard coupon={coupon} isLoggedIn={isLoggedIn} key={index} />
                    ))}
                  </div>
                </TabsContent>
              )) :
                <NoCouponsFound />
            }

          </div>
        }
      </Tabs>}

      {!isLoggedIn && <div className=" flex justify-center">
        <div className="grid sm:grid-cols-5 grid-cols-2  gap-4">
          {couponCards.map((_: any, index) => (
            <CouponCard isLoggedIn={isLoggedIn} key={index} />
          ))}
        </div>
      </div>}

      {isLoggedIn && coupons && !isCouponLoading && coupons?.results?.length > 0
        && <div className="hidden sm:flex justify-center flex-row gap-2 items-center w-full">

          {coupons?.previous && < HiMiniArrowLeft onClick={() => setPage(page - 1)} className="w-[20px] font-bold cursor-pointer" />}
          <div className="text-base leading-6 font-normal text-[#171614] rounded-lg border border-[#171614] px-2 py-1">
            {page < 10 ? `0${page}` : `${page}`}

          </div>

          {coupons?.next && <HiMiniArrowRight onClick={() => setPage(page + 1)} className="w-[20px] font-bold cursor-pointer" />}
        </div>}
    </div>
  )
}
