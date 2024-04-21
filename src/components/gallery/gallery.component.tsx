"use client";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, FreeMode, Navigation } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';
import * as React from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(useGSAP);
import Slider from 'react-infinite-logo-slider';

export function Gallery() {
    // const containerRef = React.useRef();
    // const visibleContainerRef = React.useRef(null);

    return (
        <section>
            {/* <div ref={containerRef} className="relative flex gap-6 whitespace-nowrap overflow-hidden">
                {[...Array(6)].map((_, idx) => (
                    <img
                        key={`gallery-${idx}`}
                        className="max-w-[179px] max-h-[177px] rounded-t-full logo"
                        src={`/gallery/gallery-${idx + 1}.png`}
                        alt="Transistor"
                    // width={158}
                    // height={28}
                    />
                ))}
            </div> */}

            <Slider
                width="250px"
                duration={40}
                pauseOnHover={true}
                blurBorders={false}
                blurBoderColor={'#fff'}
            >
                {[...Array(6)].map((_, idx) => (
                    <Slider.Slide key={`gallery-${idx}`}>
                        <img
                            key={`gallery-${idx}`}
                            className="max-w-[179px] max-h-[177px] rounded-t-full logo"
                            src={`/gallery/gallery-${idx + 1}.png`}
                            alt="Transistor"
                        // width={158}
                        // height={28}
                        />
                    </Slider.Slide>
                ))}
            </Slider>

            {/* <Swiper
                slidesPerView={6}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[FreeMode, Pagination, Navigation]}
            >
                {[...Array(6)].map((_, idx) => (
                    <SwiperSlide key={`gallery-${idx}`}>
                        <img
                            className="max-w-[179px] max-h-[177px] rounded-t-full"
                            src={`/gallery/gallery-${idx + 1}.png`}
                            alt="Transistor"
                        />
                    </SwiperSlide>
                ))}
            </Swiper> */}
        </section>
    )
}
