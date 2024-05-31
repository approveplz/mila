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
            <section className="flex flex-row gap-16 py-20 px-16">
                <Steps
                    selectedStep={selectedStep}
                    setSelectedStep={(step: string) => setSelectedStep(step)}
                />
                {selectedStep === 'info' ? <BasicInfo session={session} /> : <Entries />}
            </section>
        ) : null
    );
}
