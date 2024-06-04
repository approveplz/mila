import { encode, getToken, type JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
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
            }
        }
    }

    return NextResponse.next();
}