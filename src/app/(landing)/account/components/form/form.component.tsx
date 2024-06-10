'use client'
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BasicInfo from "../basic-info/basic-info.component";
import Entries from "../entries/entries.component";
import Steps from "../steps/steps.component";


export default function Form({ session }: { session: Session | null }) {

    const [selectedStep, setSelectedStep] = useState<string>('info')
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
                    selectedStep={selectedStep}
                    setSelectedStep={(step: string) => setSelectedStep(step)}
                />
                <BasicInfo session={session} />
                {/* {selectedStep === 'info' ? <BasicInfo session={session} /> : <Entries session={session}/>} */}
            </section>
        ) : null
    );
}
