"use server";

import { signOut, signIn } from "@/auth";

export async function authSignOut() {
    await signOut();
}

export async function authSignIn(data: FormData) {
    await signIn("credentials", data);
}