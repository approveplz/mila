import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineGift } from "react-icons/hi2";

type Step = {
    selectedStep: string,
    setSelectedStep: (step: string) => void
}

export default function Steps({ selectedStep, setSelectedStep }: Step) {
    return (
        <section className="sm:w-[18.3%] w-full flex sm:flex-col flex-row">
            <div
                onClick={() => setSelectedStep('info')}
                className={`flex flex-row gap-4 py-2 px-4 items-center cursor-pointer ${selectedStep === 'info' ? 'bg-primary rounded-[24px]' : 'bg-white'}`}>
                <div>
                    <HiOutlineUserCircle color={`${selectedStep === 'info' ? 'white' : 'black'}`} size={24} />
                </div>
                <div className={`font-semibold text-base leading-6 text-[#171614] ${selectedStep === 'info' ? 'text-white' : 'text-[#171614]'}`}>
                    Basic Information
                </div>
            </div>
            <div onClick={() => setSelectedStep('entries')}
                className={`flex flex-row gap-4 py-2 px-4 items-center cursor-pointer ${selectedStep === 'entries' ? 'bg-primary rounded-[24px]' : 'bg-white'}`}>
                <div>
                    <HiOutlineGift color={`${selectedStep === 'entries' ? 'white' : 'black'}`} size={24} />
                </div>
                <div className={`font-semibold text-base leading-6 text-[#171614] ${selectedStep === 'entries' ? 'text-white' : 'text-[#171614]'}`}>
                    Entries
                </div>
            </div>
        </section>
    )
}
