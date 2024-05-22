'use client'

import { CouponCard } from "../coupon-card/coupon-card.component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { getCouponCategories, getCoupons } from "@/api/auth";
import { CouponResponse, GetCouponsResponse, results } from "@/api/auth/auth.types";



export function CoupensList() {

  const [isLoggedIn, setIsloggedIn] = useState<boolean>(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);
  const [isCouponLoading, setIsCouponLoading] = useState<boolean>(false);

  const [categoryData, setCategoriesData] = useState<results[]>();
  const [coupons, setCoupons] = useState<GetCouponsResponse>();
  const [page, setPage] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const session = useSession();

  useEffect(() => {
    if (session.data) {
      setIsloggedIn(true);
      fetchCategoriesData();
    } else {
      setIsloggedIn(false);
    }
  }, [session]);

  useEffect(() => {
    if (categoryData && categoryData?.length > 0) {
      fetchCouponsData(categoryData[0]?.id);
    }
  }, [categoryData])

  const fetchCategoriesData = async () => {
    setIsCategoryLoading(true);
    try {
      if (!categoryData) {
        const categoriesData = await getCouponCategories();
        setCategoriesData(categoriesData?.results);
        setSelectedCategory(categoriesData?.results[0]?.id)
      }
    } catch (error) {
      console.error("Error fetching coupon categories:", error);
    } finally {
      setIsCategoryLoading(false)
    }
  };

  const fetchCouponsData = async (categoryId: string) => {
    setIsCouponLoading(true);
    try {
      const couponsData = await getCoupons({ category: categoryId, page });
      setCoupons(couponsData);
    } catch (error) {
      console.error("Error fetching coupons data:", error);
    } finally {
      setIsCouponLoading(false);
    }
  }

  useEffect(() => {
    fetchCouponsData(selectedCategory as string)
  }, [page])


  const couponCards = Array.from({ length: 10 });

  return (
    <div className="sm:py-20 sm:px-[175px] px-6 py-12 bg-[#F9FAFB] flex flex-col items-center justify-center gap-12">
      {categoryData && !isCategoryLoading && <Tabs defaultValue={categoryData && categoryData[0]?.name} className="w-full">
        <TabsList className="flex flex-row justify-center">
          <div className="flex flex-row gap-[30.17px] bg-[#F9FAFB] rounded-[30px] p-1 overflow-x-auto ">
            {categoryData?.map((category, index) => (
              <TabsTrigger key={index} onClick={() => {
                setPage(1);
                setCoupons(undefined)
                setSelectedCategory(category.id)
                fetchCouponsData(category.id)
              }} value={category.name}>{category.name.toUpperCase()}</TabsTrigger>
            ))}
          </div>
        </TabsList>

        {(coupons && coupons?.results?.length > 0 && !isCouponLoading) &&
          <div className="mt-12 flex justify-center">
            {categoryData?.map((category, index) => (
              <TabsContent key={index} value={category?.name}>
                <div className="grid sm:grid-cols-5 grid-cols-2  gap-4">
                  {coupons?.results.map((coupon: CouponResponse, index) => (
                    <CouponCard coupon={coupon} isLoggedIn={isLoggedIn} key={index} />
                  ))}
                </div>
              </TabsContent>
            ))}

          </div>}
      </Tabs>}

      {!isLoggedIn && <div className=" flex justify-center">
        <div className="grid sm:grid-cols-5 grid-cols-2  gap-4">
          {couponCards.map((_: any, index) => (
            <CouponCard isLoggedIn={isLoggedIn} key={index} />
          ))}
        </div>
      </div>}

      {coupons && !isCouponLoading && coupons?.results?.length > 0
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
