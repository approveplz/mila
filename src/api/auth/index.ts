import api from "@/api";
import { SignInWithCredentialsPayload, SignInWithCredentialsResponse } from "./auth.types";

export const signInWithCredentials = (payload: SignInWithCredentialsPayload) => {
    return api
        .post<SignInWithCredentialsResponse>("/auth/v0/token", payload)
        .then(res => res.data)
}