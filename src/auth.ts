import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { isApiError } from "@/api"
import { signInWithCredentials } from "@/api/auth"
import { withAsync } from "@/utils/withAsync"

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

            return session;
        },
    },
    pages: {
        signIn: "/signin"
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true
})