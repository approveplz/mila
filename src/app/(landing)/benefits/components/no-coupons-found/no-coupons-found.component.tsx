
import Image from 'next/image'

export function NoCouponsFound() {


  return (
    <section className="w-full h-[476px] bg-[#E5E7EB] rounded-[24px] py-20">
      <div className="flex flex-col items-center justify-center gap-[42px]">
        <div className="w-[148px] h-[148px] bg-[#F3F4F6] rounded-full flex justify-center items-center">
          <Image
            src="/images/tickets.png"
            alt="tickets"
            width={84}
            height={84}
          />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="font-tt-ramillas text-[30px] leading-9 text-[#4B5563] font-normal">
            No coupons found
          </div>
          <div className="font-normal text-center px-6 sm:px-72 leading-6 text-base text-[#6B7280]">
            There are currently no coupons available for this category. Please check back later.
          </div>
        </div>
      </div>

    </section>
  )
}
