"use client";

import * as React from "react";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/auth";
import { Session } from "next-auth";
import { contextFactory } from "@/utils";
import { useCurrentSession } from "@/hooks";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { usePathname } from "next/navigation";
import { getSession } from "next-auth/react";

type Props = React.PropsWithChildren
// & {
//     session: Session | null
// }

// const { setUser } = useAuthStore();
// const { fetchStatus, data } = useQuery({
//     queryKey: ['user'],
//     queryFn: () => getMe(),
//     initialData: null,
//     enabled: !!session
// });

// React.useEffect(() => {
//     if (data && !!session) {
//         setUser(data)
//     }
// }, [fetchStatus, data, setUser, session])
const [useAuthContext, AuthContext] = contextFactory<{
    session: Session | null,
    status: string,
    resultAuthFormAction: { status: string, error: string }
    authFormAction: (payload: FormData) => void,
    retrieveSession: () => Promise<void>
}>();

function AuthProvider({ children }: Props) {
    const [session, setSession] = React.useState<Session | null>(null);
    const [status, setStatus] = React.useState<string>("loading");
    const pathName = usePathname();

    const retrieveSession = React.useCallback(async () => {
        try {
            const sessionData = await getSession();
            if (sessionData) {
                setSession(sessionData);
                setStatus("authenticated");
                return;
            }

            setStatus("unauthenticated");
        } catch (error) {
            setStatus("unauthenticated");
            setSession(null);
        }
    }, []);

    React.useEffect(() => {
        if (!session) {
            retrieveSession();
        }
    }, [retrieveSession, session, pathName,]);


    const [resultAuthFormAction, authFormAction] = useFormState(actions.authSignIn, {
        status: 'idle',
        error: ''
    });

    React.useEffect(() => {
        if (resultAuthFormAction.status !== "idle") {
            retrieveSession();
        }
    }, [resultAuthFormAction, retrieveSession])

    return (
        <AuthContext.Provider value={{
            session, 
            status,
            authFormAction,
            retrieveSession,
            resultAuthFormAction
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { useAuthContext, AuthContext, AuthProvider };