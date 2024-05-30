'use client'
import { useState } from "react";
import BasicInfo from "../basic-info/basic-info.component";
import Entries from "../entries/entries.component";
import Steps from "../steps/steps.component";


export default function Form() {

    const [selectedStep, setSelectedStep] = useState<string>('info')

    return (
        <section className="flex flex-row gap-16 py-20 px-16">
            < Steps
                selectedStep={selectedStep}
                setSelectedStep={(step: string) => { setSelectedStep(step) }}
            />
            {selectedStep === 'info' ? <BasicInfo /> : <Entries />}
        </section>
    )
}
