import { encode, getToken, type JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { AUTH_CHECK_COOKIE } from "./shared/constants/constants";

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

const refreshSessionAPI = async (user: JWT) => {
    console.log("user: ", user);
    return fetch("https://backend.milacollective.today/users/v0/me", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.access}`
        },
    })
        .then(res => res.json())
        .then(res => res);
}

// function withRefreshToken(middleware: NextMiddleware) {
//     return async function(request: NextRequest, event: NextFetchEvent) {
//         return middleware(request, event);
//     }
// }

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
}

export async function middleware(req: NextRequest) {
    if (req.method === "GET") {
        const sessionCookie = process.env.NODE_ENV === 'production' ? '__Secure-authjs.session-token' : 'authjs.session-token';
        const token = await getToken({
            req: req,
            secret: process.env.AUTH_SECRET!,
            cookieName: sessionCookie,
            salt: sessionCookie
        });


        if (token) {
            if (shouldUpdateToken(token)) {
                try {
                    const res = await refreshTokenAPI(token)

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

                        const response = NextResponse.next();
                        response.cookies.set(sessionCookie, newSessionToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            path: "/",
                            sameSite: "lax"
                        });

                        response.cookies.delete(AUTH_CHECK_COOKIE);

                        return response;
                    }
                } catch (err) {
                    const response = NextResponse.next();
                    response.cookies.set(sessionCookie, '', {
                        maxAge: 0,
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        path: "/",
                        sameSite: "lax"
                    });

                    response.cookies.delete(AUTH_CHECK_COOKIE);
                    return response;
                }
            } else {
                try {
                    const res = await refreshSessionAPI(token);

                    if(res && res.id) {
                        const tokenRes = JSON.parse(JSON.stringify(token));
                        tokenRes.user = JSON.parse(JSON.stringify(res));
    
                        console.log("res: ", res);
    
                        const newSessionToken = await encode({
                            secret: process.env.AUTH_SECRET!,
                            token: tokenRes,
                            salt: sessionCookie
                        });
    
                        const response = NextResponse.next();
                        response.cookies.set(sessionCookie, newSessionToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            path: "/",
                            sameSite: "lax"
                        });
    
                        return response;
                    } else {
                        const response = NextResponse.next();

                        return response;
                    }
                } catch (err) {
                    console.log("Error updating session!");
                }
            }
        }
    }

    return NextResponse.next();
}