import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components";

export function SignInDialog({
    triggerComponent
}: {
    triggerComponent: React.ReactNode
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {triggerComponent}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[455px]">
                <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                </DialogHeader>
                <div className="">
                    <p>Form</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}