
import Image from 'next/image'


export function Header() {

  return (
    <header className="py-20 sm:py-16 flex sm:flex-row flex-col justify-between gap-20 sm:gap-[50px] bg-[#FFFFFF] sm:!h-[926px]">

      <div className="w-full sm:w-[46%] flex flex-col gap-6 text-center sm:text-left items-center sm:items-start  sm:pl-16 sm:mt-[167px]">

        <div className=" px-20 sm:px-0 font-tt-ramillas font-normal sm:font-light text-4xl sm:text-[96px] leading-[43.2px] sm:leading-[115.2px] text-[#171614]">
          WIN prizes WEEKLY
        </div>

        <div className="font-normal text-[20px] leading-[30px] px-3">
          Become a member and automatically enter every giveaway! Or just buy bundles for the upcoming major giveaway and get free entries to all minor giveaways! At Mila, we love giving back to our community, which is why we offer weekly smaller prizes leading up to our Major Monthly giveaways. Here&apos;s a small tip: we occasionally do flash giveaways, so make sure you&apos;re a member and never miss out!
        </div>

      </div>

      <div className="w-full sm:w-[54%] flex flex-row sm:gap-10 gap-[19px] ">
        <div className="flex flex-col w-full sm:h-[798px] mt-[165px] sm:mt-[348px]">
          <Image
            src="/images/ladyBag.png"
            alt="ladyBag"
            // layout="cover"
            width={237}
            height={300}
            className="w-[112px] h-[142px] sm:w-[237px] sm:h-[300px] rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col gap-[22px] sm:gap-12 w-full sm:h-[798px] mt-[71px] sm:mt-[150px]">

          <Image
            src="/images/message.png"
            alt="message"
            // layout="cover"
            width={237}
            height={300}
            className="w-[112px] h-[142px] sm:w-[237px] sm:h-[300px] rounded-lg object-cover"
          />

          <Image
            src="/images/lady1.png"
            alt="lady1"
            // layout="cover"
            width={237}
            height={300}
            className="w-[112px] h-[142px] sm:w-[237px] sm:h-[300px] rounded-lg object-cover"
          />

        </div>

        <div className="flex flex-col gap-[22px] sm:gap-12 w-full sm:h-[798px]">
          <Image
            src="/images/stuff.png"
            alt="stuff"
            // layout="cover"
            width={237}
            height={300}
            className="w-[112px] h-[142px] sm:w-[237px] sm:h-[300px] rounded-lg object-cover"
          />
          <Image
            src="/images/lady2.png"
            alt="lady2"
            // layout="cover"
            width={237}
            height={300}
            className="w-[112px] h-[142px] sm:w-[237px] sm:h-[300px] rounded-lg object-cover"
          />

        </div>

      </div>

    </header>
  )
}
