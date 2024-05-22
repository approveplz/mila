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

type MembershipPayload = {
    user: string
    coupon: string | null
    prices: Array<{
        price: string
        quantity: number
    }>
}

type MembershipResponse = {
    coupon: string
    total: number
    prices: Array<{
        price: string
        quantity: number
        subtotal: string
        subtotal_after_discount: string
    }>
}

export type ConfirmMembershipPayload = MembershipPayload;
export type ConfirmMembershipResponse = MembershipResponse;

export type GenerateMembershipPayload = MembershipPayload & {
    payment_method?: string
};

export type GenerateMembershipResponse = {
    client_secret: string
};