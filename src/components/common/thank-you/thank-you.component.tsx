import { HiOutlineHeart } from "react-icons/hi2";
import { Button } from "@/components";

export function ThankYou({
    info,
    onFinish
}: {
    info: string,
    onFinish?: () => void
}) {
    return (
        <article className="flex flex-col items-stretch sm:items-center justify-between sm:justify-normal gap-8 h-full sm:h-auto pt-16 pb-12 sm:pt-0 sm:pb-0">
            <div></div>
            <main>
                <header className="flex flex-col items-center gap-8">
                    <HiOutlineHeart className="h-12 w-12 text-primary" />
                    <h2 className="text-4xl font-tt-ramillas">Thank you!</h2>
                </header>

                <p className="text-center mt-6">{info}</p>
            </main>
            {onFinish && (
                <footer className="min-w-[346px]">
                    <Button full onClick={onFinish}>Home</Button>
                </footer>
            )}
        </article>
    )
}
