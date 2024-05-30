import { Button } from "@/components";
import { AddressForm } from "../address/address-form.component";
import { PasswordForm } from "../password/password.form.component";
import { BasicInfoForm } from "./basic-info-form.component";

export default function BasicInfo() {



    return (
        <section className="p-12 flex flex-col w-full rounded-[24px] bg-[#F3F3F3]" >

            <div className="flex flex-col gap-8 w-full">
                <div className="font-semibold leading-8 text-2xl">
                    Basic info
                </div>

                <div className="flex flex-row justify-between ">
                    <div className="flex flex-col gap-2 w-[255px]">
                        <div className="font-medium text-[20px] leading-7">
                            Personal information
                        </div>
                        <div className="font-normal leading-[20px] text-[14px]">
                            Use a permanent address where you can receive mail.
                        </div>
                    </div>

                    <div className="w-[376px]">
                        <BasicInfoForm />
                    </div>

                </div>

                <hr className="mt-3 text-[#D9D9D9]" />

                <div className="flex flex-row justify-between ">
                    <div className="flex flex-col gap-2 w-[255px]">
                        <div className="font-medium text-[20px] leading-7">
                            Address
                        </div>
                        <div className="font-normal leading-[20px] text-[14px]">
                            Use a permanent address where you can receive mail.
                        </div>
                    </div>

                    <div className="w-[376px]">
                        <AddressForm />
                    </div>

                </div>

                <hr className="mt-3 text-[#D9D9D9]" />

                <div className="flex flex-row justify-between ">
                    <div className="flex flex-col gap-2 w-[255px]">
                        <div className="font-medium text-[20px] leading-7">
                            Change Password
                        </div>
                        <div className="font-normal leading-[20px] text-[14px]">
                            Update your password associated with your account.
                        </div>
                    </div>

                    <div className="w-[376px]">
                        <PasswordForm />
                    </div>

                </div>

                <hr className="mt-3 text-[#D9D9D9]" />

                <div className="flex flex-row justify-between ">
                    <div className="flex flex-col gap-2 w-[255px]">
                        <div className="font-medium text-[20px] leading-7">
                            Delete my Account
                        </div>
                        <div className="font-normal leading-[20px] text-[14px]">
                            No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.
                        </div>
                    </div>

                    <div className="w-[376px]">
                        <Button className="bg-[#EF4444] text-[#FAFAF9] px-4 py-2 border border-[#EF4444]" >Yes, delete my Account</Button>
                    </div>

                </div>


            </div>


        </section>
    )
}
