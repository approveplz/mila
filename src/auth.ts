import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { isApiError } from "@/api"
import { signInWithCredentials } from "@/api/auth"
import { withAsync } from "@/utils/withAsync";
import { removePrefixFromObjectKeys } from "./utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            id: "credentials",
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
            async authorize(credentials) {
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
                    ...response
                };
            },
        }),
        Credentials({
            id: "register",
            name: "register",
            async authorize(credentials) {
                console.log("credentials: ", credentials);

                const response = JSON.parse(JSON.stringify(credentials));
                const user = removePrefixFromObjectKeys(response, "userpre_")
                const metadata = removePrefixFromObjectKeys(response, "metadatapre_")
                user.metadata = metadata;

                return {
                    ...response,
                    user
                }
            },
        })
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

            return session;
        },
    },
    pages: {
        signIn: "/signin",
        newUser: "/",
    },
    session: {
        updateAge: 0
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        callbackUrl: {
            name: `next-auth.callback-url`,
            options: {
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        csrfToken: {
            name: `next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
    }
})