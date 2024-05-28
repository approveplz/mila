import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
    Button,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components";
import { AmoeStepType } from "../../amoe-drawer.type";
import { HiOutlineDevicePhoneMobile, HiOutlineExclamationTriangle } from "react-icons/hi2";
import { AMOEFormData } from "../stepper-form/stepper-form.schema";
import { withAsync } from "@/utils";
import { checkEligibility, sendVerificationEmail, sendVerificationSMS, validateCode } from "@/api/amoes";
import { CheckEligibilityPayload, SendVerificationEmailPayload, SendVerificationSMSPayload, ValidateCodePayload } from "@/api/amoes/amoe.types";
import { useMutation } from "@tanstack/react-query";

export function PhoneStep({ actions }: AmoeStepType) {
    const [shouldVerify, setShouldVerify] = React.useState(false);
    const [showModalWarning, setShowModalWarning] = React.useState(false);
    const { control, trigger, getValues } = useFormContext<AMOEFormData>();

    const { mutateAsync: checkEligibilityMutateAsync } = useMutation({
        mutationFn: (payload: CheckEligibilityPayload) => checkEligibility(payload),
        onSuccess(data, variables, context) {
            console.log("success: ", { data, variables, context })
        },
        onError(error, variables, context) {
            console.log("error: ", { error, variables, context })
        },
    });

    const { mutateAsync: verifyMutateAsync } = useMutation({
        mutationFn: (payload: SendVerificationSMSPayload) => sendVerificationSMS(payload),
        onSuccess(data, variables, context) {
            console.log("success: ", { data, variables, context })
        },
        onError(error, variables, context) {
            console.log("error: ", { error, variables, context })
        },
    });

    const { mutateAsync: codeMutateAsync } = useMutation({
        mutationFn: (payload: ValidateCodePayload) => validateCode(payload),
        onSuccess(data, variables, context) {
            console.log("success: ", { data, variables, context })
        },
        onError(error, variables, context) {
            console.log("error: ", { error, variables, context })
        },
    });

    const isValidPhone = async () => {
        const { response: validPhone } = await withAsync(() => trigger("phone"));

        if (validPhone) {
            const { phone, email, giveaway } = getValues();
            const { response, error } = await withAsync(() => checkEligibilityMutateAsync({ phone, giveaway, secret: "F83C63FEB5E3E6768D86281E2B2F7" }));

            if (response?.is_eligible) {
                const { response } = await withAsync(() => verifyMutateAsync({ email, phone, secret: "F83C63FEB5E3E6768D86281E2B2F7" }))

                if (response) {
                    setShouldVerify(true);
                }
            } else {
                setShowModalWarning(true)
            }
        }

        return false
    };

    const isValidCode = async () => {
        const { response: validCode } = await withAsync(() => trigger("phone_code"));

        if (validCode) {
            const { phone_code } = getValues();

            const { response } = await withAsync(() => codeMutateAsync({ code: phone_code, secret: "F83C63FEB5E3E6768D86281E2B2F7" }))

            if (response) {
                return true;
            }
        }

        return false
    }

    return (
        <div className="flex flex-col gap-12">
            {!shouldVerify ? (
                <>
                    <p className="font-bold text-center">Verify your Phone Number</p>

                    <FormField
                        control={control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="phone">Phone</FormLabel>
                                <FormControl>
                                    <Input
                                        id="phone"
                                        placeholder="(555) 555-1234"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {actions && actions(isValidPhone, false)}
                </>
            ) : (
                <>
                    <article className="flex flex-col gap-8 items-stretch sm:items-center justify-between sm:justify-normal max-w-[592px] h-full sm:h-auto pt-16 pb-12 sm:pt-0 sm:pb-0">
                        <header className="flex flex-col gap-8 items-center">
                            <HiOutlineDevicePhoneMobile className="h-12 w-12 text-primary" />
                            <h2 className="text-4xl font-tt-ramillas">Phone number verification</h2>
                        </header>

                        <main className="flex flex-col gap-8 items-center text-center">
                            <p>Please enter the 6 digit code that we sent to: <br /> +385-846-588-952</p>

                            <FormField
                                control={control}
                                name="phone_code"
                                shouldUnregister
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </main>

                        <footer className="flex flex-col items-center gap-8 min-w-[346px]">
                            <div className="flex items-center">
                                <p>Didn&apos;t’ get the email?</p>
                                <button className="font-medium ml-1" onClick={() => { }}>Resend verification email</button>
                            </div>
                        </footer>
                    </article>

                    {actions && actions(isValidCode, false)}
                </>
            )}

            <Dialog open={showModalWarning}>
                <DialogContent className="sm:max-w-[455px] p-8 gap-8 z-[999999]">
                    <DialogHeader className="items-center">
                        <HiOutlineExclamationTriangle className="text-primary w-12 h-12 mb-8" />
                        <DialogTitle>Whoops!</DialogTitle>
                    </DialogHeader>

                    <p className="text-center">In accordance with our Sweeps Rules you have already entered the limit of AMOE in this link. Please refer to our Sweep Rules for more information</p>

                    <DialogFooter className="flex-col justify-center items-center z-[99999]">
                        <Button onClick={() => setShowModalWarning(false)}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}
