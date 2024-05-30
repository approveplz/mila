import { Button } from "@/components";
import { AddressForm } from "../address/address-form.component";
import { BasicInfoForm } from "../basic-info/basic-info-form.component";
import { PasswordForm } from "../password/password.form.component";

export default function Entries() {

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
            </div>

        </section>
    )
}
