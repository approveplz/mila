
import Image from 'next/image'


export function Header() {

    return (
        <header className="py-20 sm:py-16 flex sm:flex-row flex-col justify-between gap-20 sm:gap-[50px] bg-[#FFFFFF] sm:!h-[926px]">

            <div className="w-full sm:w-[46%] flex flex-col gap-6 text-center sm:text-left items-center sm:items-start  sm:pl-16 sm:mt-[128px]">

                <div className=" px-20 sm:px-0 font-tt-ramillas font-normal sm:font-light text-4xl sm:text-[96px] leading-[43.2px] sm:leading-[115.2px] text-[#171614]">
                    About us
                </div>


                <div className="font-normal text-[20px] leading-[30px] px-3">
                    Mila Collective is America&rsquo;s fastest growing loyalty rewards program and benefits club for high end shoppers who are looking to get access to some of the most premium benefits to high end luxury providers. We have established a wide network of partners to offer you, our members, exclusive deals and discounts that can save you thousands.
                </div>
                <div className="font-normal text-[20px] leading-[30px] px-3">
                    By supporting us we want to give back, which is why giveaways are fundamental to Mila Collective. We look forward to continuing to give away amazing prizes and experiences to our loyal members. We thank you for all your support so far and can&rsquo;t wait to show you what&rsquo;s next!!
                </div>

            </div>

            <div className="w-full sm:w-[54%] flex flex-row sm:gap-10 gap-[19px] ">
                <div className="flex flex-col w-full sm:h-[798px] mt-[165px] sm:mt-[348px]">
                    <Image
                        src="/images/mila1.png"
                        alt="mila1"
                        // layout="cover"
                        width={237}
                        height={300}
                        className="hover:scale-105 transition-all duration-500 cursor-pointer w-[112px] h-[142px] sm:w-[237px] sm:h-[300px] rounded-lg object-cover"
                    />
                </div>

                <div className="flex flex-col gap-[22px] sm:gap-12 w-full sm:h-[798px] mt-[71px] sm:mt-[150px]">

                    <Image
                        src="/images/mila2.png"
                        alt="mila2"
                        width={237}
                        height={300}
                        className="hover:scale-105 transition-all duration-500 cursor-pointer w-[112px] h-[142px] sm:w-[237px] sm:h-[300px] rounded-lg object-cover"
                    />

                    <Image
                        src="/images/mila3.png"
                        alt="mila3"
                        width={237}
                        height={300}
                        className="hover:scale-105 transition-all duration-500 cursor-pointer w-[112px] h-[142px] sm:w-[237px] sm:h-[300px] rounded-lg object-cover"
                    />

                </div>

                <div className="flex flex-col gap-[22px] sm:gap-12 w-full sm:h-[798px]">
                    <Image
                        src="/images/mila4.png"
                        alt="mila4"
                        width={237}
                        height={300}
                        className="hover:scale-105 transition-all duration-500 cursor-pointer w-[112px] h-[142px] sm:w-[237px] sm:h-[300px] rounded-lg object-cover"
                    />
                    <Image
                        src="/images/mila6.jpg"
                        alt="milabags"
                        width={237}
                        height={300}
                        className="hover:scale-105 transition-all duration-500 cursor-pointer w-[112px] h-[142px] sm:w-[237px] sm:h-[300px] rounded-lg object-cover"
                    />

                </div>

            </div>

        </header>
    )
}
