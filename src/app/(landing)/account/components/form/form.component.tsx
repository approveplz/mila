'use client'
import { useCheckOutStore } from "@/store";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BasicInfo from "../basic-info/basic-info.component";
import Entries from "../entries/entries.component";
import Steps from "../steps/steps.component";


export default function Form({ session }: { session: Session | null }) {

    const accountTab = useCheckOutStore((state) => state.accountTab);
    const { setAccountTab } = useCheckOutStore();

    const isLoggedIn = !!session
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/')
        }

    }, [session])

    return (
        isLoggedIn ? (
            <section className="flex sm:flex-row flex-col gap-8 sm:gap-16 sm:py-20 sm:px-16 px-6">
                <Steps
                    selectedStep={accountTab as string}
                    setSelectedStep={(step: string) => setAccountTab(step as "entries" | "info")}
                />
                {accountTab === 'info' ? <BasicInfo session={session} /> : <Entries session={session} />}
            </section>
        ) : null
    );
}
