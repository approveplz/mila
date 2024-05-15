import { User } from "@/entities";

export type SignInWithCredentialsPayload = {
    email: string;
    password: string;
};

export type SignInWithCredentialsResponse = {
    refresh: string;
    access: string
};

export type SignInWithCredentialsErrorResponse = {
    detail: string
}