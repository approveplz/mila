import { User } from "@/entities";

type AuthCredentials = {
    refresh: string;
    access: string;
}

export type SignInWithCredentialsPayload = {
    email: string;
    password: string;
};

export type SignInWithCredentialsResponse = User

export type SignInWithCredentialsErrorResponse = {
    detail: string
}

export type SignUpWithPricesPayload = {
    full_name: string
    email: string
    phone: string
    password: string
    state: string
    is_outside_of_us: boolean
    is_over_18: boolean
    prices: Array<{
        price: string
        quantity: number
    }>
}

export type SignUpWithPricesResponse = AuthCredentials & {
    user: User
}

export type SendVerificationSmsResponse = User;

export type VerifyEmailOrSMSPayload = {
    server_code: string
}

export type VerifyEmailOrSMSResponse = User;