import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
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
            async authorize(credentials, request) {
                const { response, error } = await withAsync(() => signInWithCredentials({
                    email: credentials.email as string,
                    password: credentials.password as string
                }));

                if (error) {
                    throw new Error("Error");
                }

                return {
                    name: "test",
                    ...response
                };

                // return {
                //     name: "bilal",
                //     ...res
                // }
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
    },
    pages: {
        signIn: "/signin"
    }
})