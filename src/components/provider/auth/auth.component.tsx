"use client";

import * as React from "react";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/auth";
import { Session } from "next-auth";

type Props = React.PropsWithChildren & {
    session: Session | null
}

export function AuthProvider({ children, session }: Props) {
    const { setUser } = useAuthStore();
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

    return (
        <>{children}</>
    )
}