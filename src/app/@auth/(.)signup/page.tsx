import * as React from "react"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components";
import { AuthDialog } from "./components/auth-dialog/auth-dialog.component";

export default function SignInForm() {
    return (
        <AuthDialog>
            <DialogContent withClose className="min-w-full h-screen p-4 rounded-none">
                {/* <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                </DialogHeader> */}
                <p>Sign Up</p>
            </DialogContent>
        </AuthDialog>
    )
}