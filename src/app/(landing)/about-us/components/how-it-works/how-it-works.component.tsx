import { messages } from "@/shared/constants/messages";
import Image from 'next/image'



export function HowItWorks() {

    const { howItWorks: {
        heading,
        description,
    } } = messages;

    return (
        <section id="how-it-works" className="sm:py-[112px] py-16 px-6 sm:px-0 bg-[#171614] flex flex-col gap-20">
            <div className="flex flex-col items-center gap-6 sm:mx-[336px]">
                <div className="font-tt-ramillas font-normal text-4xl sm:text-5xl leading-[43.2px] sm:leading-[57.6px] text-white ">
                    {heading}
                </div>

                <div className="font-normal text-lg leading-6 text-white text-center">
                    {description}
                </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row  gap-12 sm:px-16">

                <div className="flex flex-col items-center gap-6 sm:w-1/3">
                    <Image
                        src="/images/pointer.png"
                        alt="pointer"
                        width={99}
                        height={96}
                        className="max-w-[99px] max-h-[96px]"
                    />
                    <div className="font-tt-ramillas text-light text-[32px] leading-[41.6px] text-white">
                        1. Become A Member
                    </div>

                    <div className="font-normal text-base leading-6 text-white text-center">
                        Become a member, or choose a one-time package, to gain access to our amazing benefits!
                    </div>

                </div>

                <div className="flex flex-col items-center gap-6 sm:w-1/3">
                    <Image
                        src="/images/gift.png"
                        alt="gift"
                        width={77}
                        height={96}
                        className="max-w-[77px] max-h-[96px]"
                    />
                    <div className="font-tt-ramillas text-light text-[32px] leading-[41.6px] text-white text-center">
                        2. Access Mila Benefits
                    </div>

                    <div className="font-normal text-base leading-6 text-white text-center">
                    After becoming a member get access to exclusive discounts and savings from your favorite retailers. Save big!
                    </div>

                </div>

                <div className="flex flex-col items-center gap-6 sm:w-1/3">
                    <Image
                        src="/images/bag.png"
                        alt="bag"
                        width={73}
                        height={96}
                        className="max-w-[73px] max-h-[96px]"
                    />

                    <div className="font-tt-ramillas text-light text-[32px] leading-[41.6px] text-white">
                        3. Win Prizes
                    </div>

                    <div className="font-normal text-base leading-6 text-white text-center">
                    That&apos;s it, you&apos;re entered into all our giveaways, if you&apos;re a member you&apos;ll be automatically entered and never miss a giveaway!!!
                    </div>


                </div>
            </div>

        </section>
    )
}