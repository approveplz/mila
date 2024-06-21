import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { isApiError } from "@/api"
import { getMeAuth, signInWithCredentials } from "@/api/auth"
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
            async authorize(credentials, req) {
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

                return response as {}
            },
        }),
        Credentials({
            id: "register",
            name: "register",
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
                const response = JSON.parse(JSON.stringify(credentials));
                const user = removePrefixFromObjectKeys(response, "userpre_")
                const metadata = removePrefixFromObjectKeys(response, "metadatapre_")
                metadata.subscribed_products = [];
                metadata.total_entries_count = parseInt(metadata.total_entries_count) || 0;
                user.metadata = metadata;

                return {
                    access: response.access,
                    refresh: response.refresh,
                    user
                } as {}
            },
        }),
        Credentials({
            id: "auth",
            name: "auth",
            credentials: {
                access: {
                    label: "Password"
                },
                refresh: {
                    label: "Password"
                },
            },
            async authorize(credentials) {
                const { response, error } = await withAsync(() => getMeAuth({
                    accessToken: credentials.access as string,
                }));

                if (error) {
                    if (isApiError(error)) {
                        return null;
                    } else {
                        throw new Error("An unexpected issue occurred.");
                    }
                }

                return {
                    access: credentials.access,
                    refresh: credentials.refresh,
                    user: response
                } as {}
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
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
        signIn: "/",
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
})