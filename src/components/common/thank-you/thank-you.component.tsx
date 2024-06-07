import { HiOutlineHeart } from "react-icons/hi2";
import { Button, DrawerClose } from "@/components";

export function ThankYou({
    type,
    info,
    onFinish
}: {
    type: "wider" | "narrow",
    info: string,
    onFinish?: () => void
}) {
    return (
        <article className="hidden flex-col items-stretch sm:items-center justify-between sm:justify-normal gap-8 h-full sm:h-auto pt-16 pb-12 sm:pt-0 sm:pb-0">
            <div></div>
            <main>
                <header className="flex flex-col items-center gap-8">
                    <HiOutlineHeart className="h-12 w-12 text-primary" />
                    {type === "narrow" ? (
                        <h2 className="text-4xl font-tt-ramillas">Thank you!</h2>

                    ) : (
                        <h2 className="text-7xl font-tt-ramillas">Thank you!</h2>
                    )}
                </header>

                {type === "narrow" ? (
                    <p className="text-center mt-6">{info}</p>
                ) : (
                    <p className="text-center text-xl mt-6">{info}</p>
                )}
            </main>

            {onFinish && (
                <footer className="min-w-[346px]">
                    <DrawerClose className="w-full">
                        <Button full onClick={onFinish}>Home</Button>
                    </DrawerClose>
                </footer>
            )}
        </article>
    )
}
