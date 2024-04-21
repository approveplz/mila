import * as React from "react";
import { Container } from "@/components";
import Image from "next/image";

const clients = ['italic', 'allbirds', 'yeti', 'warby-parker', 'peloton'];

{/* 
    <div
        key={`client-${idx}`}
        className="relative w-[82px] h-5 col-span-2 col-start-2 max-h-5 sm:col-start-auto lg:col-span-1"
    >
        <Image
            fill
            src={`/logos/clients/logo-${idx + 1}.svg`}
            alt={`Logo for ${client}`}
            objectFit="contain"
        />
    </div>
*/}
export function Clients() {
    return (
        <Container>
            {/* <div className="mt-10 grid grid-cols-4 items-center gap-x-8 gap-y-10 pb-20 sm:grid-cols-6 sm:gap-x-[114px] lg:mx-0 lg:max-w-none lg:grid-cols-5">
                {clients.map((client, idx) => (
                    <Image
                        key={`client-${idx}`}
                        className="col-span-2 col-start-2 max-h-7 w-full object-contain sm:col-start-auto lg:col-span-1"
                        src={`/logos/clients/logo-${idx + 1}.svg`}
                        alt={`Logo for ${client}`}
                        width={82}
                        height={28}
                    />
                ))}
            </div> */}
            {/* <div className="mx-auto max-w-7xl px-6 lg:px-8"> */}
            {/* <div className="flex flex-wrap justify-center gap-x-4 gap-y-9 md:gap-x-8 lg:gap-x-12 xl:gap-x-16"> */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-[30px] pb-20 md:gap-x-8 lg:gap-x-[114px]">
                {clients.map((client, idx) => (
                    <img
                        key={`client-${idx}`}
                        className="max-w-xs max-h-[28px] md:max-w-sm lg:max-w-md xl:max-w-lg"
                        src={`/logos/clients/logo-${idx + 1}.svg`}
                        alt="Transistor"
                        // width={158}
                        height={28}
                    />
                    // <div key={`client-${idx}`} className="relative max-w-xs max-h-[28px] md:max-w-sm lg:max-w-md xl:max-w-lg">
                    // <div key={`client-${idx}`} className="relative h-[28px]">
                    //     <Image
                    //         src={`/logos/clients/logo-${idx + 1}.svg`}
                    //         alt={`Logo for ${client}`}
                    //         layout="fill"
                    //         objectFit="contain"
                    //         // className="rounded-md"
                    //     />
                    // </div>
                ))}
            </div>
            {/* </div> */}
        </Container>
    )
}

export function Clients2() {
    return (
        <div className="flex pb-20">
            {clients.map((client, idx) => (
                <div
                    key={`client-${idx}`}
                    className="relative w-full h-[28px]"
                >
                    <Image
                        className="w-full object-contain"
                        src={`/logos/clients/logo-${idx + 1}.svg`}
                        alt={`Logo for ${client}`}
                        fill
                    // width={82}
                    // height={28}
                    />
                </div>
            ))}
        </div>
    )
}