import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { isApiError } from "@/api"
import { refreshToken, signInWithCredentials } from "@/api/auth"
import { withAsync } from "@/utils/withAsync";
import { jwtDecode } from "jwt-decode";
import { removePrefixFromObjectKeys } from "./utils";

// if (token && token.access) {
//     const decoded: any = jwtDecode(token.access as string);
//     const currentTime = Date.now() / 1000;

//     console.log({ token: token.access, decoded });

//     if (decoded && decoded.exp < currentTime) {
//         console.log("refreshToken.....");
//     } else {
//         if (user) return { ...token, ...user }
//     }
// } else {
//     if (user) return { ...token, ...user }
// }

// const { response, error } = await withAsync(() => refreshToken({
//     access: token.access as string,
//     refresh: token.refresh as string
// }));

// console.log({ response, error })

// if (response) {
//     return { ...token, ...user, ...response }
// }

// if (error) {
//     return {
//         ...token,
//         error: "RefreshAccessTokenError",
//     }
// }

// async function refreshAccessToken(token: any) {
//     try {
//         const response = await refreshToken({
//             access: token.access as string,
//             refresh: token.refresh as string
//         });

//         const decoded: { token_type: string, exp: number } = jwtDecode((token as any).access);

//         return {
//             ...token,
//             ...response,
//             accessTokenExpires: decoded.exp * 1000
//         }

//     } catch (err) {
//         return {
//             ...token,
//             error: "RefreshAccessTokenError",
//         }
//     }
// }

// const refreshTokenAPI = mem(async (payload) => {
//     return fetch("https://backend.milacollective.today/auth/v0/token/refresh", {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload),
//     })
// }, {
//     maxAge: 1_000,
//     cacheKey(arguments_) {
//         return arguments_.join(',')
//     },
// })

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
                user.metadata = metadata;

                return {
                    access: response.access,
                    refresh: response.refresh,
                    user
                } as {}
            },
        })
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
    // callbacks: {
    // jwt({ token, user }) {
    //     if (user) {
    //         const decoded: { token_type: string, exp: number } = jwtDecode((user as any).access);

    //         return {
    //             ...token,
    //             ...user,
    //             accessTokenExpires: decoded.exp * 1000
    //         }
    //     }

    //     if (Date.now() < token.accessTokenExpires) {
    //         return token;
    //     }

    //     return refreshAccessToken(token)
    // },
    //     async jwt({ token, user }) {
    //         if (user) {
    //             const decoded: { token_type: string, exp: number } = jwtDecode((user as any).access);

    //             return {
    //                 ...token,
    //                 ...user,
    //                 accessTokenExpires: decoded.exp * 1000
    //             }
    //         } else if (Date.now() < token.accessTokenExpires) {
    //             return token
    //         } else {
    //             try {
    //                 const response = await refreshTokenAPI({
    //                     access: token.access as string,
    //                     refresh: token.refresh as string
    //                 });

    //                 const data = await response.json();

    //                 console.log("response: ", data);

    //                 if (data.access) {
    //                     const decoded: { token_type: string, exp: number } = jwtDecode(data.access);

    //                     return {
    //                         ...token,
    //                         access: data.access,
    //                         refresh: data.refresh,
    //                         accessTokenExpires: decoded.exp * 1000
    //                     }
    //                 }

    //                 return {
    //                     ...token,
    //                     error: "RefreshAccessTokenError" as const
    //                 }
    //             } catch (error) {
    //                 console.log("error: ", error);
    //                 return {
    //                     ...token,
    //                     error: "RefreshAccessTokenError" as const
    //                 }
    //             }
    //         }
    //     },
    //     session({ session, token }) {
    //         type T = typeof session.user;
    //         if (token) {
    //             session.user = token as unknown as T;
    //             session.error = token.error as any;
    //         }

    //         return session;
    //     }
    // },
    pages: {
        signIn: "/",
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
})