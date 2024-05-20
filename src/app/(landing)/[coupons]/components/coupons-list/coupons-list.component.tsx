import { CouponCard } from "../coupon-card/coupon-card.component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { messages } from "@/shared/constants/messages";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";


export function CoupensList() {

  const { coupons: {
    couponsList: {
      headings: {
        fashionAndRetail,
        beautyAndWellness,
        foodAndBeverage,
        services,
        pets,
        recreation,
        other
      }
    }

  } } = messages;

  const couponCards = Array.from({ length: 20 });

  return (
    <div className="sm:py-20 sm:px-[175px] px-6 py-12 bg-[#F9FAFB] flex flex-col items-center justify-center gap-12">
      <Tabs defaultValue={fashionAndRetail} className="w-full">
        <TabsList className="flex flex-row justify-center">
          <div className="flex flex-row gap-[30.17px] bg-[#F9FAFB] rounded-[30px] p-1 overflow-x-auto ">
            <TabsTrigger value={fashionAndRetail}>{fashionAndRetail}</TabsTrigger>
            <TabsTrigger value={beautyAndWellness}>{beautyAndWellness}</TabsTrigger>
            <TabsTrigger value={foodAndBeverage}>{foodAndBeverage}</TabsTrigger>
            <TabsTrigger value={services}>{services}</TabsTrigger>
            <TabsTrigger value={pets}>{pets}</TabsTrigger>
            <TabsTrigger value={recreation}>{recreation}</TabsTrigger>
            <TabsTrigger value={other}>{other}</TabsTrigger>
          </div>
        </TabsList>
        <div className="mt-12 flex justify-center">
          <TabsContent value={fashionAndRetail}>
            <div className="grid sm:grid-cols-5 grid-cols-2  gap-4">
              {couponCards.map((_: any, index) => (
                <CouponCard upgrade={(index === 3 || index === 4 || index === 7 || index === 9 || index === 12 || index === 14 || index === 17 || index === 19) ? false : true} isLoggedIn={true} key={index} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value={beautyAndWellness}>
            <div className="grid sm:grid-cols-5 grid-cols-2  gap-4">
              {couponCards.map((_: any, index) => (
                <CouponCard upgrade={(index === 3 || index === 4 || index === 7 || index === 9 || index === 12 || index === 14 || index === 17 || index === 19) ? false : true} isLoggedIn={true} key={index} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value={foodAndBeverage}>
            <div className="grid sm:grid-cols-5 grid-cols-2  gap-4">
              {couponCards.map((_: any, index) => (
                <CouponCard upgrade={(index === 3 || index === 4 || index === 7 || index === 9 || index === 12 || index === 14 || index === 17 || index === 19) ? false : true} isLoggedIn={true} key={index} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value={services}>
            <div className="grid sm:grid-cols-5 grid-cols-2  gap-4">
              {couponCards.map((_: any, index) => (
                <CouponCard upgrade={(index === 3 || index === 4 || index === 7 || index === 9 || index === 12 || index === 14 || index === 17 || index === 19) ? false : true} isLoggedIn={true} key={index} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value={pets}>
            <div className="grid sm:grid-cols-5 grid-cols-2  gap-4">
              {couponCards.map((_: any, index) => (
                <CouponCard upgrade={(index === 3 || index === 4 || index === 7 || index === 9 || index === 12 || index === 14 || index === 17 || index === 19) ? false : true} isLoggedIn={true} key={index} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value={recreation}>
            <div className="grid sm:grid-cols-5 grid-cols-2  gap-4">
              {couponCards.map((_: any, index) => (
                <CouponCard upgrade={(index === 3 || index === 4 || index === 7 || index === 9 || index === 12 || index === 14 || index === 17 || index === 19) ? false : true} isLoggedIn={true} key={index} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value={other}>
            <div className="grid sm:grid-cols-5 grid-cols-2  gap-4">
              {couponCards.map((_: any, index) => (
                <CouponCard upgrade={(index === 3 || index === 4 || index === 7 || index === 9 || index === 12 || index === 14 || index === 17 || index === 19) ? false : true} isLoggedIn={true} key={index} />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
      <div className="hidden sm:flex justify-center flex-row gap-2 items-center w-full">
        <HiMiniArrowLeft className="w-[20px] font-bold cursor-pointer" />
        <div className="text-base leading-6 font-normal text-[#171614] rounded-lg border border-[#171614] px-2 py-1">
          01
        </div>
        <HiMiniArrowRight className="w-[20px] font-bold cursor-pointer" />

      </div>
    </div>
  )
}
