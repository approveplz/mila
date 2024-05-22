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
                console.log("credentials: ", credentials);
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
    secret: process.env.AUTH_SECRET,
    trustHost: true,
})