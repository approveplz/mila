"use client";

import * as React from "react"
import { Button, Container, Dialog, DialogContent, DialogHeader, PhoneVerificationContent } from "@/components"
import { useCurrentSession } from "@/hooks";
import { toast } from "sonner"
import { HiOutlineEnvelope, HiXMark } from "react-icons/hi2";
import { sendVerificationEmail, sendVerificationSms, verifyEmailOrSMS } from "@/api/auth";

export function NavBanner() {
    const { session } = useCurrentSession();
    const [isOpened, setIsOpened] = React.useState(false);

    const handleVerifyEmail = () => {
        sendVerificationEmail().then(res => {
            toast.custom(t => (
                <div className="flex items-center px-4 py-3">
                    <div className="flex items-center gap-2">
                        <HiOutlineEnvelope className="h-6 w-6" />
                        <p className="font-medium">Email sent!</p>
                    </div>

                    <button className="ml-auto" onClick={() => toast.dismiss(t)}>
                        <HiXMark className="h-6 w-6" />
                    </button>
                </div>
            ))
        }).catch(err => {
            console.log("err: ", err);
        });
    }

    const handleVerifyPhone = () => {
        sendVerificationSms().then(res => {
            setIsOpened(true);
        }).catch(err => {
            console.log("err: ", err);
        })
    }

    const handleSendVerifyPhone = () => {
        sendVerificationSms().then(res => {
            console.log("res: ", res);
        }).catch(err => {
            console.log("err: ", err);
        })
    }

    const onVerifyPhone = (pin: string) => {
        verifyEmailOrSMS({ server_code: pin, client_code: pin })
            .then(res => {
                setIsOpened(false);
            }).catch(err => {
                console.log("err: ", err);
                toast.error("Invalid code!");
            })
    }

    if (!!!session) {
        return null;
    } else if (session?.user.user.metadata.is_free_tier_subscriber === false) {
        return null;
    } else if(session?.user.user.metadata.is_email_verified === true && session?.user.user.metadata.is_phone_verified === true) {
        return null
    }

    return (
        <div className="bg-[#F3DDCF] py-3">
            <Container>
                <div className="flex justify-between items-center">
                    <p className="text-black font-medium">Please verify your information to be entered to win!</p>

                    <div className="space-x-4">
                        {!session?.user.user.metadata.is_phone_verified && <Button onClick={handleVerifyPhone}>Verify Phone</Button>}
                        {!session?.user.user.metadata.is_email_verified && <Button onClick={handleVerifyEmail}>Verify Email</Button>}
                    </div>
                </div>
            </Container>

            <Dialog open={isOpened} onOpenChange={open => setIsOpened(open)}>
                <DialogContent className="sm:max-w-[455px] z-[99999] [&_header]:hidden">
                    <PhoneVerificationContent
                        showHeader={false}
                        onVerify={onVerifyPhone}
                        onReSend={handleSendVerifyPhone}
                        phone={session?.user.user.phone || ""}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}
