
import { getProfileEntries } from "@/api/auth";
import { ProfileEntryResponse } from "@/api/auth/auth.types";
import { Button } from "@/components";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Session } from "next-auth";
import { HiOutlineGift } from "react-icons/hi2";


export default function Entries({ session }: { session: Session | null }) {

    const isLoggedIn = !!session;

    const { data: entryDetails, isLoading: isProfileLoading }: UseQueryResult<ProfileEntryResponse> =
        useQuery({
            queryKey: ['entries'],
            queryFn: () =>
                getProfileEntries({ profileId: session?.user?.user?.id as string }),
            enabled: isLoggedIn,
        })

    const getDayOfMonth = (date: string) => {
        const expiryDate = new Date(date);
        return expiryDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
        });
    }

    return (
        <section className="p-12 flex flex-col w-full rounded-[24px] bg-[#F3F3F3]" >

            <div className="flex flex-col gap-8 w-full">
                <div className="font-semibold leading-8 text-2xl">
                    Entries
                </div>

                <div className="flex flex-row justify-between ">
                    <div className="flex flex-col gap-2 w-[255px]">
                        <div className="font-medium text-[20px] leading-7">
                            Entries
                        </div>
                        <div className="font-normal leading-[20px] text-[14px]">
                            See how many entries you have left.
                        </div>
                    </div>

                    <div className="w-[376px] flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 items-center">
                                <div >
                                    < HiOutlineGift color="#6B7280" size={16} />

                                </div>

                                <div className="font-medium text-base leading-6 text-[#6B7280]">
                                    Subscription Entries: {entryDetails?.entries?.subscription_count}
                                </div>

                            </div>
                            <div className="font-medium text-xs leading-4 text-[#EF4444]">
                                *Expire on {getDayOfMonth(entryDetails?.entries?.subscription_expiry as string)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 items-center">
                                <div >
                                    < HiOutlineGift color="#6B7280" size={16} />
                                </div>

                                <div>
                                    <div className="font-medium text-base leading-6 text-[#6B7280]">
                                        Bundle Entries: {entryDetails?.entries?.subscription_count}
                                    </div>
                                </div>

                            </div>

                            <div className="font-medium text-xs leading-4 text-[#EF4444]">
                                *Expire on {getDayOfMonth(entryDetails?.entries?.bundle_expiry as string)}
                            </div>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <div >
                                < HiOutlineGift size={16} />
                            </div>

                            <div className="font-medium text-base leading-6 text-[#171614]">
                                Total Entries: {entryDetails?.entries?.total_count}
                            </div>

                        </div>
                        {/* <Button className="w-fit py-2 px-4" >Get more entries</Button> */}
                    </div>

                </div>
            </div>

        </section>
    )
}