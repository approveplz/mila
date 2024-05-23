'use client'

import { Button } from "@/components/ui/button/button.component";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { HiOutlineGift, HiOutlineShoppingBag } from "react-icons/hi2";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';



export function UpcomingGiveAways() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      console.log(isMobile);
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <section className="pb-[64px] sm:pb-20 sm:pt-0 px-[24px] sm:px-16 bg-[#F3F3F3]">
      <div className="flex flex-col gap-12 items-center">
        <div className="font-tt-ramillas text-center font-normal sm:font-light sm:text-5xl text-4xl leading-[43.2px] sm:leading-[57.6px] text-[#171614] px-[26px] sm:px-0">
          UPCOMING Major Giveaways
        </div>

        <div className="flex flex-col gap-12 items-center rounded-[24px] w-full h-full sm:h-[460px] border border-[#9CA3AF]">

          <div className="w-full relative bg-white rounded-[24px] shadow-xl  overflow-hidden">
            <div className="z-10 opacity-[0.08] absolute bg-[url('/images/giveaway-bg.png')] w-full h-full">

            </div>
            <div className="relative border flex flex-col sm:flex-row z-20">

              <div className="z-30 absolute flex flex-row gap-2 bg-[#FFFFFF] rounded-full py-2 px-4 top-4 left-[10px]">

                <HiOutlineGift size={24} color="#BE7B62" />
                <div className="font-semibold text-base leading-6 text-primary">
                  200 entries
                </div>
              </div>

              <div className="w-full sm:w-1/2 h-full">
                {
                  !isMobile ? < Image
                    src="/images/giveaway-backpack.png"
                    alt="giveaway-backpack"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="max-w-[50%]"
                  />
                    :
                    <Image
                      src="/images/giveaway-backpack.png"
                      alt="giveaway-backpack"
                      layout="responsive"
                      width={656}
                      height={399}
                    />
                }

              </div>
              <div className="p-12 flex flex-col gap-8 items-start sm:w-1/2 w-full">
                <div className="sm:hidden bg-primary border border-[#9CA3AF] px-2 rounded-[16px] w-fit">
                  <div className="font-semibold text-base leading-6 text-[#FFFFFF]">MAJOR</div>
                </div>
                <div className="w-full flex flex-col gap-4">

                  <div className="w-full flex flex-col sm:flex-row gap-6 justify-between sm:items-center">
                    <div className="font-bold text-[38px] leading-9 text-[#171614] tracking-[8px]">
                      PELOTON
                    </div>
                    <div className="flex flex-row gap-2">
                      <div className="w-[34px] h-[34px] rounded-lg bg-[#171614] flex flex-row items-center justify-center">
                        <div className="text-[14px] leading-[20px] font-semibold text-white">
                          00
                        </div>
                      </div>
                      <div className="w-[34px] h-[34px] rounded-lg bg-[#171614] flex flex-row items-center justify-center">
                        <div className="text-[14px] leading-[20px] font-semibold text-white">
                          00
                        </div>
                      </div>
                      <div className="w-[34px] h-[34px] rounded-lg bg-[#171614] flex flex-row items-center justify-center">
                        <div className="text-[14px] leading-[20px] font-semibold text-white">
                          00
                        </div>
                      </div>
                      <div className="w-[34px] h-[34px] rounded-lg bg-[#171614] flex flex-row items-center justify-center">
                        <div className="text-[14px] leading-[20px] font-semibold text-white">
                          00
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-[#6B7280] font-medium text-[30px] leading-9">
                    Backpack
                  </div>
                </div>

                {!isMobile && <div id="collpasable" className="flex flex-col gap-8 items-start w-full">

                  <div className="flex flex-col ">
                    <div className="font-normal text-base leading-6 text-[#171614]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    </div>
                    <div className="font-nomral text-base leading-6 text-[#171614]">
                      minim veniam.
                    </div>
                  </div>

                  <div className="flex flex-col gap-[10px]">

                    <div className="flex flex-row gap-8 items-center">
                      <HiOutlineShoppingBag className="text-[#6B7280]" size={24} />
                      <div className="font-medium text-[14px] leading-[20px] text-[#6B7280]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </div>
                    </div>

                    <div className="flex flex-row gap-8 items-center">
                      <HiOutlineShoppingBag className="text-[#6B7280]" size={24} />
                      <div className="font-medium text-[14px] leading-[20px] text-[#6B7280]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </div>
                    </div>

                    <div className="flex flex-row gap-8 items-center">
                      <HiOutlineShoppingBag className="text-[#6B7280]" size={24} />
                      <div className="font-medium text-[14px] leading-[20px] text-[#6B7280]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </div>
                    </div>

                  </div>
                </div>}

                {
                  isMobile && !isCollapsed &&
                  <div id="collpasable" className="flex flex-col gap-8 items-start w-full">

                    <div className="flex flex-col ">
                      <div className="font-normal text-base leading-6 text-[#171614]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                      </div>
                      <div className="font-nomral text-base leading-6 text-[#171614]">
                        minim veniam.
                      </div>
                    </div>

                    <div className="flex flex-col gap-[10px]">

                      <div className="flex flex-row gap-8 items-center">
                        <HiOutlineShoppingBag className="text-[#6B7280]" size={24} />
                        <div className="font-medium text-[14px] leading-[20px] text-[#6B7280]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                        </div>
                      </div>

                      <div className="flex flex-row gap-8 items-center">
                        <HiOutlineShoppingBag className="text-[#6B7280]" size={24} />
                        <div className="font-medium text-[14px] leading-[20px] text-[#6B7280]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                        </div>
                      </div>

                      <div className="flex flex-row gap-8 items-center">
                        <HiOutlineShoppingBag className="text-[#6B7280]" size={24} />
                        <div className="font-medium text-[14px] leading-[20px] text-[#6B7280]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                        </div>
                      </div>

                    </div>
                  </div>
                }

                {isMobile && <div>
                  {isCollapsed ? <div className="font-semibold text-base leading-[24px] underline" onClick={toggleCollapse}> See more </div> :
                    <div className="font-semibold text-base leading-[24px] underline" onClick={toggleCollapse}> See less</div>}
                </div>
                }

              </div>
            </div>

          </div>
        </div>


        {!isMobile ? <div className="flex flex-col gap-4">
          {[1, 2, 3]?.map(item => (
            <div key={item} className="flex flex-col gap-12 items-center rounded-[24px] w-full border border-[#9CA3AF]">

              <div className="w-full relative bg-white rounded-[24px] shadow-xl overflow-hidden">
                <div className="z-10 opacity-[0.08] absolute bg-[url('/images/giveaway-bg.png')] w-full h-full">

                </div>
                <div className="relative border flex flex-col sm:flex-row z-20 h-[292px]">
                  <div className="absolute flex flex-row gap-2 bg-[#FFFFFF] rounded-full py-2 px-4 top-4 left-[10px]">

                    <HiOutlineGift size={24} color="#BE7B62" />
                    <div className="font-semibold text-base leading-6 text-primary">
                      200 entries
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 h-full">
                    <Image
                      src="/images/giveaway-backpack.png"
                      alt="giveaway-backpack"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      className="max-w-[50%]"
                    />

                  </div>
                  <div className="p-6 flex flex-col gap-8 items-start sm:w-1/2 w-full">
                    <div className="sm:hidden bg-primary border border-[#9CA3AF] px-2 rounded-[16px] w-fit">
                      <div className="font-semibold text-base leading-6 text-[#FFFFFF]">MAJOR</div>
                    </div>
                    <div className="w-full flex flex-col gap-2">

                      <div className="w-full flex flex-col sm:flex-row gap-2 justify-between sm:items-center">
                        <div className="font-black text-[40px] leading-9 text-[#171614] ">
                          YETI
                        </div>
                        <div className="flex flex-row gap-2">
                          <div className="w-[34px] h-[34px] rounded-lg bg-[#6B7280] flex flex-row items-center justify-center">
                            <div className="text-[14px] leading-[20px] font-semibold text-white">
                              00
                            </div>
                          </div>
                          <div className="w-[34px] h-[34px] rounded-lg bg-[#6B7280] flex flex-row items-center justify-center">
                            <div className="text-[14px] leading-[20px] font-semibold text-white">
                              00
                            </div>
                          </div>
                          <div className="w-[34px] h-[34px] rounded-lg bg-[#6B7280] flex flex-row items-center justify-center">
                            <div className="text-[14px] leading-[20px] font-semibold text-white">
                              00
                            </div>
                          </div>
                          <div className="w-[34px] h-[34px] rounded-lg bg-[#6B7280] flex flex-row items-center justify-center">
                            <div className="text-[14px] leading-[20px] font-semibold text-white">
                              00
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-[#6B7280] font-medium text-[24px] leading-8">
                        Backpack
                      </div>
                    </div>

                    {!isMobile && <div id="collpasable" className="flex flex-col gap-8 items-start w-full">

                      <div className="flex flex-col ">
                        <div className="font-normal text-base leading-6 text-[#171614]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        </div>
                        <div className="font-nomral text-base leading-6 text-[#171614]">
                          minim veniam.
                        </div>
                      </div>
                    </div>}

                    {
                      isMobile && !isCollapsed &&
                      <div id="collpasable" className="flex flex-col gap-8 items-start w-full">

                        <div className="flex flex-col ">
                          <div className="font-normal text-base leading-6 text-[#171614]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          </div>
                          <div className="font-nomral text-base leading-6 text-[#171614]">
                            minim veniam.
                          </div>
                        </div>
                      </div>
                    }

                    {isMobile && <div>
                      {isCollapsed ? <div className="font-semibold text-base leading-[24px] underline" onClick={toggleCollapse}> See more </div> :
                        <div className="font-semibold text-base leading-[24px] underline" onClick={toggleCollapse}> See less</div>}
                    </div>
                    }

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div> :

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
            {[1, 2, 3]?.map(item => (
              <SwiperSlide key={item} className="rounded-[20px]">

                <div key={item} className="flex flex-col gap-12 items-center rounded-[20px] w-full border border-[#9CA3AF]">

                  <div className="w-full relative bg-white rounded-[20px] shadow-xl overflow-hidden">
                    <div className="z-10 opacity-[0.08] absolute bg-[url('/images/giveaway-bg.png')] w-full h-full">

                    </div>



                    <div className="relative border flex flex-col sm:flex-row z-20">

                      <div className="absolute flex flex-row gap-2 bg-[#FFFFFF] rounded-full py-2 px-4 top-4 left-[10px]">

                        <HiOutlineGift size={24} color="#BE7B62" />
                        <div className="font-semibold text-base leading-6 text-primary">
                          200 entries
                        </div>
                      </div>

                      <div className="w-full sm:w-1/2 h-full">
                        <Image
                          src="/images/giveaway-backpack.png"
                          alt="giveaway-backpack"
                          layout="responsive"
                          width={656}
                          height={399}
                        />

                      </div>
                      <div className="p-6 flex flex-col gap-8 items-start sm:w-1/2 w-full">
                        <div className="sm:hidden bg-primary border border-[#9CA3AF] px-2 rounded-[16px] w-fit">
                          <div className="font-semibold text-base leading-6 text-[#FFFFFF]">MAJOR</div>
                        </div>
                        <div className="w-full flex flex-col gap-4">

                          <div className="w-full flex flex-col sm:flex-row gap-6 justify-between sm:items-center">
                            <div className="font-black text-[40px] leading-9 text-[#171614] ">
                              YETI
                            </div>
                            <div className="flex flex-row gap-2">
                              <div className="w-[34px] h-[34px] rounded-lg bg-[#6B7280] flex flex-row items-center justify-center">
                                <div className="text-[14px] leading-[20px] font-semibold text-white">
                                  00
                                </div>
                              </div>
                              <div className="w-[34px] h-[34px] rounded-lg bg-[#6B7280] flex flex-row items-center justify-center">
                                <div className="text-[14px] leading-[20px] font-semibold text-white">
                                  00
                                </div>
                              </div>
                              <div className="w-[34px] h-[34px] rounded-lg bg-[#6B7280] flex flex-row items-center justify-center">
                                <div className="text-[14px] leading-[20px] font-semibold text-white">
                                  00
                                </div>
                              </div>
                              <div className="w-[34px] h-[34px] rounded-lg bg-[#6B7280] flex flex-row items-center justify-center">
                                <div className="text-[14px] leading-[20px] font-semibold text-white">
                                  00
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-[#6B7280] font-medium text-[24px] leading-8">
                            Backpack
                          </div>
                        </div>

                        {!isMobile && <div id="collpasable" className="flex flex-col gap-8 items-start w-full">

                          <div className="flex flex-col ">
                            <div className="font-normal text-base leading-6 text-[#171614]">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                              minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            </div>
                            <div className="font-nomral text-base leading-6 text-[#171614]">
                              minim veniam.
                            </div>
                          </div>
                        </div>}

                        {
                          isMobile && !isCollapsed &&
                          <div id="collpasable" className="flex flex-col gap-8 items-start w-full">

                            <div className="flex flex-col ">
                              <div className="font-normal text-base leading-6 text-[#171614]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                              </div>
                              <div className="font-nomral text-base leading-6 text-[#171614]">
                                minim veniam.
                              </div>
                            </div>
                          </div>
                        }

                        {isMobile && <div>
                          {isCollapsed ? <div className="font-semibold text-base leading-[24px] underline" onClick={toggleCollapse}> See more </div> :
                            <div className="font-semibold text-base leading-[24px] underline" onClick={toggleCollapse}> See less</div>}
                        </div>
                        }

                      </div>
                    </div>

                  </div>
                </div>

              </SwiperSlide>
            ))}
          </Swiper>




        }







      </div>
    </section>
  )
}
