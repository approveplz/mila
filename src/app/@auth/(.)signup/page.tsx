import * as React from "react"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components";
import { AuthDialog } from "./components/auth-dialog/auth-dialog.component";
import { AuthForm } from "./components/auth-form/auth-form.component";

export default function SignInForm() {
    return (
        <AuthDialog>
            <DialogContent withClose className="min-w-full h-screen p-4 rounded-none">
                <div className="flex">
                    <div>
                        <p>Sign Up</p>
                    </div>

                    <div>
                        <AuthForm />
                    </div>
                </div>
            </DialogContent>
        </AuthDialog>
    )
}