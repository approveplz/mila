
import { Button } from "@/components/ui/button/button.component"
import { messages } from "@/shared/constants/messages";

export function Header() {

  const { header: {
    heading,
    subHeading,
    learnMore,
    signUp
  } } = messages;

  return (
    <header >
      <div className="bg-[url('/images/hero-bg.png')] sm:h-screen bg-no-repeat bg-cover flex items-center justify-center">
        <div className="sm:w-[59%] mx-10 my-[253px] sm:my-0 sm:mx-0 text-center flex flex-col gap-4 ">
          <div className="font-light text-4xl sm:text-8xl leading-[43px] sm:leading-[115px] text-white font-tt-ramillas">
            {heading}
          </div>
          <div className="font-normal text-[20px] text-white leading-[30px] ">
            {subHeading}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
            <Button variant="secondary-outline">{learnMore}</Button>
            <Button variant="secondary-outline">{signUp}</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
