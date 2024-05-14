import * as React from "react"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    Button,
    Checkbox,
    Input,
    Label,
} from "@/components";
import { AuthDialog } from './components/auth-dialog/auth-dialog.component';
import { AuthForm } from './components/auth-form/auth-form.component';

export default function SignInForm() {
    return (
        <AuthDialog>
            <DialogContent className="sm:max-w-[455px]">
                <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                </DialogHeader>
                <AuthForm>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="e.g.JohnDoe"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="*********"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button>Sign in</Button>
                </AuthForm>
            </DialogContent>
        </AuthDialog>
    )
}