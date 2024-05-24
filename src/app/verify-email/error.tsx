'use client';

import { useRouter } from "next/navigation";
import * as React from "react";

export default function Error() {
    const router = useRouter();

    React.useEffect(() => {
        router.push('/')
    }, [router])
}