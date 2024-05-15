import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { isApiError } from "@/api"
import { signInWithCredentials } from "@/api/auth"
import { withAsync } from "@/utils/withAsync"
import { SignInWithCredentialsErrorResponse } from "./api/auth/auth.types"

// class CustomError extends CredentialsSignin {
//     detail = "custom_error"
// }

class InvalidLoginError extends CredentialsSignin {
    code = 'Invalid identifier or password'
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials, request) {
                const { response, error } = await withAsync(() => signInWithCredentials({
                    email: credentials.email as string,
                    password: credentials.password as string
                }));

                if (error) {
                    if (isApiError(error)) {
                        return null;
                    } else {
                        throw new Error("An unexpected issue occurred.");
                    }
                }

                return {
                    name: "test",
                    ...response
                };
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) return { ...token, ...user }

            return token;
        },
        session(params) {
            const { session, token } = params;
            // @ts-ignore
            session.user = token;


            // console.log({ session, token })
            // return params.session;
            return session;
        },
        // authorized({ auth, request: { nextUrl } }) {
        //     console.log('auth: ', auth);

        //     const isLoggedIn = !!auth?.user;
        //     const isOnDashboard = nextUrl.pathname.startsWith('/');

        //     if (isOnDashboard) {
        //         if (isLoggedIn) return true;
        //         return false; // Redirect unauthenticated users to login page
        //     } else if (isLoggedIn) {
        //         return Response.redirect(new URL('/', nextUrl));
        //     }
        //     return true;
        // },
    },
    // callbacks: {
    // authorized({ auth, request: { nextUrl }  }) {
    //     console.log('auth: ', auth);
    //     const isLoggedIn = !!auth?.user;
    //     const isOnDashboard = nextUrl.pathname.startsWith('/');

    //     if (isOnDashboard) {
    //         if (isLoggedIn) return true;
    //         return false; // Redirect unauthenticated users to login page
    //     } else if (isLoggedIn) {
    //         return Response.redirect(new URL('/', nextUrl));
    //     }
    //     return true;
    // },
    // },
    pages: {
        signIn: "/signin"
    },
    secret: process.env.AUTH_SECRET
})