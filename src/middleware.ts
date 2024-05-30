import { auth } from "@/auth";
import { encode, getToken, type JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import { withAsync } from "./utils";
import { NextRequest, NextResponse } from "next/server";

const shouldUpdateToken = (token: JWT) => {
    if (token.access) {
        const decoded: any = jwtDecode(token.access as string);
        const currentTime = Date.now() / 1000;

        return decoded.exp < currentTime;
    }

    return false;
}

const refreshTokenAPI = async (user: JWT) => {
    return fetch("https://backend.milacollective.today/auth/v0/token/refresh", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access: user.access,
            refresh: user.refresh
        }),
    })
        .then(res => res.json())
        .then(res => res);
}

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
}

// export default auth(async (req) => {
// const response = NextResponse.next();

// if (req.method === "GET") {
//     const sessionCookie = process.env.NODE_ENV === 'production' ? '__Secure-authjs.session-token' : 'authjs.session-token';
//     const token = await getToken({
//         req: req,
//         secret: process.env.AUTH_SECRET!,
//         cookieName: sessionCookie,
//         salt: sessionCookie
//     });

//     // console.log("req: ", req.url);
//     // console.log('sessionCookie shouldUpdateToken: ', sessionCookie);

//     if (token) {
//         if (shouldUpdateToken(token)) {
//             console.log("ref: ", sessionCookie);

//             const { response: res, error } = await withAsync(() => refreshTokenAPI(token))

//             console.log("res: ", res);

//             if (res) {
//                 const newSessionToken = await encode({
//                     secret: process.env.AUTH_SECRET!,
//                     token: {
//                         ...token,
//                         ...res
//                     },
//                     salt: sessionCookie
//                 })

//                 console.log("newSessionToken: ", newSessionToken);
//                 response.cookies.set(sessionCookie, newSessionToken);
//                 response.cookies.set('ss', newSessionToken);
//             } else if (error) {
//                 response.cookies.delete(sessionCookie);
//             }

//             // return response;
//         }
//     }
// }

// return response;

// response.cookies.delete(process.env.NODE_ENV === 'production' ? '__Secure-authjs.session-token' : 'authjs.session-token');

// return response;
// })

// console.log("token: ", token);

// if (user) {
//     // user.
//     const newSessionToken = await encode({
//         secret: process.env.AUTH_SECRET!,
//         token: {

//         },
//         maxAge: 30 * 24 * 60 * 60, // 30 days, or get the previous token's exp
//     })
// }

// export function middleware(request: NextRequest) {
//     const response = NextResponse.next();

//     if(request.method === "GET") {
//         console.log("Request for : ", request.nextUrl.pathname);
//         response.cookies.delete(process.env.NODE_ENV === 'production' ? '__Secure-authjs.session-token' : 'authjs.session-token');
//     }

//     return response
// }

export async function middleware(req: NextRequest) {
    const response = NextResponse.next();

    if (req.method === "GET") {
        const sessionCookie = process.env.NODE_ENV === 'production' ? '__Secure-authjs.session-token' : 'authjs.session-token';
        const token = await getToken({
            req: req,
            secret: process.env.AUTH_SECRET!,
            cookieName: sessionCookie,
            salt: sessionCookie
        });

        // console.log("req: ", req.url);
        // console.log('sessionCookie shouldUpdateToken: ', sessionCookie);

        if (token) {
            if (shouldUpdateToken(token)) {
                try {
                    const res = await refreshTokenAPI(token)

                    console.log("ref: ", sessionCookie);
                    console.log("res: ", res);

                    if (res.code && res.code === "token_not_valid") {
                        throw new Error('Token is blacklisted')
                    } else {
                        const newSessionToken = await encode({
                            secret: process.env.AUTH_SECRET!,
                            token: {
                                ...token,
                                ...res
                            },
                            salt: sessionCookie
                        });

                        console.log("newSessionToken: ", newSessionToken);
                        response.cookies.set(sessionCookie, newSessionToken);
                    }
                } catch (err) {
                    response.cookies.delete(sessionCookie);
                }
            }
        }
    }

    return response
}