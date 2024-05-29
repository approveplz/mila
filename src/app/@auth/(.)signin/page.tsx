import * as React from "react"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components";
import { AuthDialog } from './components/auth-dialog/auth-dialog.component';
import { AuthForm } from './components/auth-form/auth-form.component';

export default function SignInForm() {
    return (
        <AuthDialog>
            <DialogContent className="sm:max-w-[455px] z-[99999]">
                <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                </DialogHeader>
                <AuthForm />
            </DialogContent>
        </AuthDialog>
    )
}