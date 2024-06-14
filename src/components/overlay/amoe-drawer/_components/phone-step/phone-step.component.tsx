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
    inputClasses,
} from "@/components";
import { AmoeStepType } from "../../amoe-drawer.type";
import { HiOutlineDevicePhoneMobile, HiOutlineExclamationTriangle, HiOutlinePhone, HiXMark } from "react-icons/hi2";
import { AMOEFormData } from "../stepper-form/stepper-form.schema";
import { cn, withAsync } from "@/utils";
import { checkEligibility, sendVerificationEmail, sendVerificationSMS, validateCode } from "@/api/amoes";
import { CheckEligibilityPayload, SendVerificationEmailPayload, SendVerificationSMSPayload, ValidateCodePayload } from "@/api/amoes/amoe.types";
import { useMutation } from "@tanstack/react-query";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";

export function PhoneStep({ actions }: AmoeStepType) {
    const [shouldVerify, setShouldVerify] = React.useState(false);
    const [showModalWarning, setShowModalWarning] = React.useState(false);
    const { control, trigger, watch, getValues } = useFormContext<AMOEFormData>();

    const { mutateAsync: checkEligibilityMutateAsync, isPending: isPendingCheckEligibility } = useMutation({
        mutationFn: (payload: CheckEligibilityPayload) => checkEligibility(payload),
        onSuccess(data, variables, context) {
            console.log("success: ", { data, variables, context })
        },
        onError(error, variables, context) {
            console.log("error: ", { error, variables, context })
        },
    });

    const { mutateAsync: verifyMutateAsync, isPending: isPendingVerify } = useMutation({
        mutationFn: (payload: SendVerificationSMSPayload) => sendVerificationSMS(payload),
        onSuccess(data, variables, context) {
            console.log("success: ", { data, variables, context })
        },
        onError(error, variables, context) {
            console.log("error: ", { error, variables, context })
        },
    });

    const { mutateAsync: resendVerifyMutateAsync, isPending: isPendingResendVerify } = useMutation({
        mutationFn: (payload: SendVerificationSMSPayload) => sendVerificationSMS(payload),
        onSuccess(data, variables, context) {
            console.log("success: ", { data, variables, context });
            toast.custom(t => (
                <div className="flex items-center px-4 py-3">
                    <div className="flex items-center gap-2">
                        <HiOutlinePhone className="h-6 w-6" />
                        <p className="font-medium">Code sent!</p>
                    </div>

                    <button className="ml-auto" onClick={() => toast.dismiss(t)}>
                        <HiXMark className="h-6 w-6" />
                    </button>
                </div>
            ))
        },
        onError(error, variables, context) {
            console.log("error: ", { error, variables, context })
        },
    });

    const { mutateAsync: codeMutateAsync, isPending: isPendingCode } = useMutation({
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
            const { response, error } = await withAsync(() => checkEligibilityMutateAsync({ phone: `1 ${phone}`, giveaway: giveaway.id, secret: process.env.NEXT_PUBLIC_API_SECRET! }));

            if (response?.is_eligible) {
                const { response } = await withAsync(() => verifyMutateAsync({ email, phone: `1 ${phone}`, secret: process.env.NEXT_PUBLIC_API_SECRET! }))

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

            const { response, error } = await withAsync(() => codeMutateAsync({ code: phone_code, secret: process.env.NEXT_PUBLIC_API_SECRET! }))

            if (response) {
                if(!response.is_verified) {
                    toast.error("Invalid code!");
                    return false;
                }
                
                return true;
            }

            if (error) {
                toast.error("Invalid code!");
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
                                    <>
                                        <PatternFormat
                                            placeholder="+1 (555) 555-1234"
                                            className={cn(inputClasses())}
                                            format="+1 (###)-###-####"
                                            allowEmptyFormatting
                                            mask="_"
                                            value={field.value}
                                            onValueChange={data => field.onChange(data.value)}
                                        />
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {actions && actions(isValidPhone, isPendingCheckEligibility || isPendingVerify)}
                </>
            ) : (
                <>
                    <article className="flex flex-col gap-8 items-stretch sm:items-center justify-between sm:justify-normal max-w-[592px] h-auto">
                        <header className="flex flex-col gap-8 items-center">
                            <HiOutlineDevicePhoneMobile className="h-12 w-12 text-primary" />
                            <h2 className="text-4xl font-tt-ramillas text-center">Phone number verification</h2>
                        </header>

                        <main className="flex flex-col gap-8 items-center text-center">
                            <p>Please enter the 6 digit code that we sent to: <br />
                                <PatternFormat
                                    displayType="text"
                                    format="+1 (###)-###-####"
                                    allowEmptyFormatting
                                    mask="_"
                                    value={watch("phone")}
                                />
                            </p>

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
                                <p>Didn&apos;t get the code?</p>
                                <button
                                    type="button"
                                    className="font-medium ml-1"
                                    onClick={() => {
                                        const { email, phone } = getValues();

                                        resendVerifyMutateAsync({
                                            email,
                                            phone: `1 ${phone}`,
                                            secret: process.env.NEXT_PUBLIC_API_SECRET!
                                        })
                                    }}
                                >
                                    Resend verification code
                                </button>
                            </div>
                        </footer>
                    </article>

                    {actions && actions(isValidCode, isPendingCode)}
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
