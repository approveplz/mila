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
    Input
} from "@/components";
import { AmoeStepType } from "../../amoe-drawer.type";
import { HiOutlineEnvelopeOpen, HiOutlineExclamationTriangle } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query";
import { CheckEligibilityPayload, SendVerificationEmailPayload, ValidateCodePayload } from "@/api/amoes/amoe.types";
import { checkEligibility, sendVerificationEmail, validateCode } from "@/api/amoes";
import { AMOEFormData } from "../stepper-form/stepper-form.schema";
import { withAsync } from "@/utils";

export function EmailStep({ actions }: AmoeStepType) {
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
        mutationFn: (payload: SendVerificationEmailPayload) => sendVerificationEmail(payload),
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

    const isValidEmail = async () => {
        const { response: validEmail } = await withAsync(() => trigger("email"));

        if (validEmail) {
            const { email, giveaway } = getValues();
            const { response, error } = await withAsync(() => checkEligibilityMutateAsync({ email, giveaway, secret: "F83C63FEB5E3E6768D86281E2B2F7" }));

            if (response?.is_eligible) {
                const { response } = await withAsync(() => verifyMutateAsync({ email, secret: "F83C63FEB5E3E6768D86281E2B2F7" }))

                if (response) {
                    setShouldVerify(true);
                }
            } else {
                setShowModalWarning(true)
            }
        }

        return false;
    };

    const isValidCode = async () => {
        const { response: validCode } = await withAsync(() => trigger("email_code"));

        if (validCode) {
            const { email_code } = getValues();
            const { response } = await withAsync(() => codeMutateAsync({ code: email_code, secret: "F83C63FEB5E3E6768D86281E2B2F7" }))

            if(response) {
                return true;
            }
        }

        return false
    }

    return (
        <div className="flex flex-col gap-12">
            {!shouldVerify ? (
                <>
                    <p className="font-bold text-center">Verify your Email Address</p>

                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        id="email"
                                        placeholder="e.g.JohnDoe@gmail.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {actions && actions(isValidEmail, false)}
                </>
            ) : (
                <>
                    <article className="flex flex-col gap-8 items-stretch sm:items-center justify-between sm:justify-normal max-w-[592px] h-auto">
                        <header className="flex flex-col gap-8 items-center">
                            <HiOutlineEnvelopeOpen className="h-12 w-12 text-primary" />
                            <h2 className="text-3xl text-center font-tt-ramillas">Email verification</h2>
                        </header>

                        <main className="flex flex-col gap-8">
                            <p className="text-center">Please enter the code that we sent to: <br /> {getValues("email")}.</p>

                            <FormField
                                control={control}
                                name="email_code"
                                shouldUnregister
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="email_code">Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email_code"
                                                placeholder="e.g.Xa89Abc"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center">
                                <p>Didn&apos;t get the email?</p>
                                <button type="button" className="font-medium ml-1" onClick={() => { }}>Resend verification email</button>
                            </div>
                        </main>
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
        </div>
    )
}
