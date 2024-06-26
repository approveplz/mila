"use client";

import * as React from "react"
import { Button, Container, Dialog, DialogContent, DialogHeader, PhoneVerificationContent, Spinner } from "@/components"
import { useCurrentSession } from "@/hooks";
import { toast } from "sonner"
import { HiOutlineEnvelope, HiXMark } from "react-icons/hi2";
import { sendVerificationEmail, sendVerificationSms, verifyEmailOrSMS } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/components/provider/auth/auth.component";

export function NavBanner() {
    const { session } = useAuthContext();
    const [isOpened, setIsOpened] = React.useState(false);

    const { mutate: sendVerificationEmailMutate, isPending: isPendingSendVerificationEmailMutate } = useMutation({
        mutationFn: () => sendVerificationEmail(),
        onSuccess() {
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
        },
        onError(error, variables, context) {
            toast.error("Something went wrong!");
        },
    })

    const { mutate: sendVerificationSmsMutate, isPending: isPendingSendVerificationSmsMutate } = useMutation({
        mutationFn: () => sendVerificationSms(),
        onSuccess() {
            setIsOpened(true);
        },
        onError(error, variables, context) {
            toast.error("Something went wrong!");
        },
    })

    const { mutate: verifyEmailOrSMSMutate, isPending: isPendingVerifyEmailOrSMSMutate } = useMutation({
        mutationFn: (payload: { server_code: string, client_code: string }) => verifyEmailOrSMS(payload),
        onSuccess() {
            setIsOpened(false);
            toast.custom(t => (
                <div className="flex items-center px-4 py-3">
                    <div className="flex items-center gap-2">
                        <HiOutlineEnvelope className="h-6 w-6" />
                        <p className="font-medium">Successfully verified phone number!</p>
                    </div>

                    <button className="ml-auto" onClick={() => toast.dismiss(t)}>
                        <HiXMark className="h-6 w-6" />
                    </button>
                </div>
            ));
            window.location.reload()
        },
        onError() {
            toast.error("Invalid code!");
        }
    })

    console.log("session banner: ", session)

    if (!!!session) {
        return null;
    } else if (session?.user.user.metadata.is_free_tier_subscriber === false) {
        return null;
    } else if (session?.user.user.metadata.is_email_verified === true && session?.user.user.metadata.is_phone_verified === true) {
        return null
    }

    return (
        <div className="bg-[#F3DDCF] py-3">
            <Container>
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                    <p className="text-black font-medium">Please verify your information to be entered to win!</p>

                    <div className="flex flex-col sm:flex-row [&>*]:flex-1 sm:[&>*]:flex-initial gap-4 w-full sm:w-auto">
                        {!session?.user.user.metadata.is_phone_verified && (
                            <Button onClick={() => sendVerificationSmsMutate()} disabled={isPendingSendVerificationSmsMutate}>
                                Verify Phone
                                {isPendingSendVerificationSmsMutate && <Spinner className="w-4 h-4 ml-4" />}
                            </Button>
                        )}
                        {!session?.user.user.metadata.is_email_verified && (
                            <Button onClick={() => sendVerificationEmailMutate()} disabled={isPendingSendVerificationEmailMutate}>
                                Verify Email
                                {isPendingSendVerificationEmailMutate && <Spinner className="w-4 h-4 ml-4" />}
                            </Button>
                        )}
                    </div>
                </div>
            </Container>

            <Dialog open={isOpened} onOpenChange={open => setIsOpened(open)}>
                <DialogContent className="max-w-[calc(100%-24px)] mx-auto sm:max-w-[455px] z-[99999] [&_header]:hidden" withClose>
                    <PhoneVerificationContent
                        showHeader={false}
                        isLoading={isPendingVerifyEmailOrSMSMutate}
                        onVerify={(pin) => verifyEmailOrSMSMutate({ server_code: pin, client_code: pin })}
                        onReSend={sendVerificationSmsMutate}
                        phone={session?.user.user.phone || ""}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}
