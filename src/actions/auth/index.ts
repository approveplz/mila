"use server";

import { signOut, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";

function isRedirectError(error: Error & { digest?: string }) {
    return !!error.digest?.startsWith("NEXT_REDIRECT")
}

export async function authSignOut() {
    console.log("process.env: ", process.env.NODE_ENV);
    if(process.env.NODE_ENV === "production") {
        cookies().delete('__Secure-authjs.session-token');
    }

    await signOut();

}

export async function authSignIn(prevState: any, data: FormData) {
    try {
        await signIn('credentials', data);

        return {
            status: 'success',
            error: ''
        }
    } catch (error) {
        if (isRedirectError(error as Error)) {
            return {
                status: 'success',
                error: ''
            }
        };

        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        status: 'failed',
                        error: 'Invalid email or password.'
                    };
                default:
                    return {
                        status: 'failed',
                        error: 'Something went wrong.'
                    };
            }
        }

        throw error;
    }
}

export async function authRegisterSigIn(data: FormData) {
    await signIn("register", data);
}