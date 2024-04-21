import * as React from "react";
import { Container } from "@/components";
import Image from "next/image";

const clients = ['italic', 'allbirds', 'yeti', 'warby-parker', 'peloton'];

export function Clients() {
    return (
        <Container>
            <div className="flex flex-wrap justify-around gap-x-4 gap-y-[30px] pb-20 md:gap-x-8 lg:gap-x-[114px]">
                {clients.map((client, idx) => (
                    <img
                        key={`client-${idx}`}
                        className="max-w-xs max-h-[28px] md:max-w-sm lg:max-w-md xl:max-w-lg"
                        src={`/logos/clients/logo-${idx + 1}.svg`}
                        alt="Transistor"
                        // width={158}
                        height={28}
                    />
                ))}
            </div>
        </Container>
    )
}