"use client";
import * as React from "react";
import Slider from 'react-infinite-logo-slider';

export function Gallery() {
    return (
        <section>
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
                        />
                    </Slider.Slide>
                ))}
            </Slider>
        </section>
    )
}
