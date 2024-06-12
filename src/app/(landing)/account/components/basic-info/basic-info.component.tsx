import { getProfileDetails } from "@/api/auth";
import { GetProfileResponse } from "@/api/auth/auth.types";
import { BecomeAPartnerForm } from "@/app/(landing)/benefits/components/become-a-partner/form.component";
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { Session } from "next-auth";
import {
    useQuery,
    UseQueryResult
} from '@tanstack/react-query'
import { AddressForm } from "../address/address-form.component";
import { DeleteAccountForm } from "../delete-account/delete-account.component";
import { PasswordForm } from "../password/password.form.component";
import { BasicInfoForm } from "./basic-info-form.component";
import { Link } from "@/app/(landing)/legal/_components/link/link.component";

export default function BasicInfo({ session }: { session: Session | null }) {
    const isLoggedIn = !!session;

    const { data: profileDetails, isLoading: isProfileLoading, refetch }: UseQueryResult<GetProfileResponse> =
        useQuery({
            queryKey: ['profile'],
            queryFn: () =>
                getProfileDetails({ profileId: session?.user?.user?.id as string }),
            enabled: isLoggedIn,
        })

    return (
        <section className="sm:p-12 p-6 flex flex-col w-full rounded-[24px] bg-[#F3F3F3]" >

            <div className="flex flex-col gap-8 w-full">
                <div className="font-semibold leading-8 text-2xl">
                    Basic information
                </div>

                <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row sm:justify-between ">
                    <div className="flex flex-col gap-2 sm:w-[255px]">
                        <div className="font-medium text-[20px] leading-7">
                            Personal information
                        </div>
                        <div className="font-normal leading-[20px] text-[14px]">
                            Use a permanent address where you can receive mail.
                        </div>
                    </div>

                    <div className="sm:w-[376px]">
                        <BasicInfoForm refetch={() => refetch()} profileDetail={profileDetails} session={session} />
                    </div>

                </div>

                <hr className="mt-3 text-[#D9D9D9]" />

                <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row sm:justify-between ">
                    <div className="flex flex-col gap-2 sm:w-[255px]">
                        <div className="font-medium text-[20px] leading-7">
                            Address
                        </div>
                        <div className="font-normal leading-[20px] text-[14px]">
                            Use a permanent address where you can receive mail.
                        </div>
                    </div>

                    <div className="sm:w-[376px]">
                        <AddressForm refetch={() => refetch()} profileDetail={profileDetails} session={session} />
                    </div>

                </div>

                <hr className="mt-3 text-[#D9D9D9]" />

                <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row sm:justify-between ">
                    <div className="flex flex-col gap-2 sm:w-[255px]">
                        <div className="font-medium text-[20px] leading-7">
                            Change Password
                        </div>
                        <div className="font-normal leading-[20px] text-[14px]">
                            Update your password associated with your account.
                        </div>
                    </div>

                    <div className="sm:w-[376px]">
                        <PasswordForm refetch={() => refetch()} profileDetail={profileDetails} session={session} />
                    </div>

                </div>

                <hr className="mt-3 text-[#D9D9D9]" />

                <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row sm:justify-between ">
                    <div className="flex flex-col gap-2 sm:w-[255px]">
                        <div className="font-medium text-[20px] leading-7">
                            Delete my Account
                        </div>
                        <div className="font-normal leading-[20px] text-[14px]">
                            No longer want to use our service? You can delete your account by emailing  <Link href="mailto:support@milacollective.com" className="underline">support@milacollective.com</Link>
                        </div>

                        <div className="font-normal leading-[20px] text-[14px]">
                            All information and your entries will be deleted permanently.
                        </div>
                    </div>

                    <div className="sm:w-[376px]">

                       

                        {/* <Dialog>
                            <DialogTrigger className="w-fit bg-[#EF4444] border-[#EF4444] px-4 py-2 text-white rounded-full ">
                                Yes, delete my Account
                            </DialogTrigger>
                            <DialogContent className="sm:w-[455px] w-[329px] z-[999999]">
                                <DialogHeader>
                                    <DialogTitle className="font-normal text-[30px] leading-9">Are you sure you want to delete your profile?</DialogTitle>
                                </DialogHeader>


                                <DeleteAccountForm
                                    footer={
                                        <DialogFooter className="flex flex-row justify-between w-full gap-4 sm:justify-start">
                                            <DialogClose asChild>
                                                <Button className="w-full bg-white text-[#171614] px-4 py-2 border border-[#171614]">Cancel</Button>
                                            </DialogClose>

                                            <Button type="submit" className="w-full bg-[#EF4444] text-[#FAFAF9] px-4 py-2 border border-[#EF4444]">Delete</Button>
                                        </DialogFooter>
                                    }
                                />
                            </DialogContent>
                        </Dialog> */}
                    </div>

                </div>


            </div>


        </section>
    )
}
