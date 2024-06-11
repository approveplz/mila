import api from "@/api";
import {
    ConfirmMembershipPayload,
    ConfirmMembershipResponse,
    CouponResponse,
    GenerateMembershipPayload,
    GenerateMembershipResponse,
    GetCouponCategoriesResponse,
    GetCouponDetailParams,
    GetCouponsParams,
    GetCouponsResponse,
    RefreshTokenPayload,
    RefreshTokenResponse,
    GetProfileParams,
    GetProfileResponse,
    SendVerificationSmsResponse,
    SignInWithCredentialsPayload,
    SignInWithCredentialsResponse,
    SignUpWithPricesPayload,
    SignUpWithPricesResponse,
    UpdateProfilePayload,
    VerifyEmailOrSMSPayload,
    VerifyEmailOrSMSResponse,
    ProfileEntryResponse,
    GetMeResponse,
    SendUserVerificationEmailResponse,
    LatestInvoicePaymentStatusPayload,
    LatestInvoicePaymentStatusResponse,
    MarkLatestInvoicePaidPayload,
    MarkLatestInvoicePaidResponse,
    SubscribeToNewsletterPayload,
    SubscribeToNewsletterResponse
} from "./auth.types";

export const signInWithCredentials = (payload: SignInWithCredentialsPayload) => {
    return api
        .post<SignInWithCredentialsResponse>("/auth/v0/token", payload)
        .then(res => res.data)
}

export const refreshToken = (payload: RefreshTokenPayload) => {

    return api
        .post<RefreshTokenResponse>("/auth/v0/token/refresh", payload)
        .then(res => {
            console.log("res: ", res);
            return res.data
        })
}

export const signUpWithPrices = (payload: SignUpWithPricesPayload) => {
    return api
        .post<SignUpWithPricesResponse>("/users/v0/sign-up", payload)
        .then(res => res.data)
}

export const sendVerificationEmail = () => {
    return api
        .put<SendUserVerificationEmailResponse>("/users/v0/send-verification-email")
        .then(res => res.data)
}

export const sendVerificationSms = () => {
    return api
        .put<SendVerificationSmsResponse>("/users/v0/send-verification-sms")
        .then(res => res.data)
}

export const verifyEmailOrSMS = (payload: VerifyEmailOrSMSPayload) => {
    return api
        .post<VerifyEmailOrSMSResponse>("/users/v0/verify", payload)
        .then(res => res.data)
}

export const confirmMembership = (payload: ConfirmMembershipPayload) => {
    return api
        .put<ConfirmMembershipResponse>(`/users/v0/user/${payload.user}/confirm-membership-details`, payload)
        .then(res => res.data)
}

export const generateMembership = (payload: GenerateMembershipPayload) => {
    return api
        .put<GenerateMembershipResponse>(`/users/v0/user/${payload.user}/generate-membership`, payload)
        .then(res => res.data)
}

export const getCouponCategories = () => {
    return api
        .get<GetCouponCategoriesResponse>(`/coupons/v0/coupon-categories`)
        .then(res => res.data);
}


export const getCoupons = (params: GetCouponsParams) => {
    return api
        .get<GetCouponsResponse>(`/coupons/v0/coupons`, { params })
        .then(res => res.data);
}

export const getProfileDetails = (params: GetProfileParams) => {
    return api
        .get<GetProfileResponse>(`/users/v0/user/${params.profileId}/account`)
        .then(res => res.data)
}

export const updateProfileDetails = (profileId: string, payload: UpdateProfilePayload) => {
    return api
        .put<GetProfileResponse>(`/users/v0/user/${profileId}/account`, payload)
        .then(res => res.data)
}

export const getProfileEntries = (params: GetProfileParams) => {
    return api
        .get<ProfileEntryResponse>(`/users/v0/user/${params?.profileId}/entries-details`)
        .then(res => res.data)
}

export const getMe = () => {
    return api
        .get<GetMeResponse>("/users/v0/me")
        .then(res => res.data)
}

export const latestInvoicePaymentStatus = ({ userId, ...payload }: LatestInvoicePaymentStatusPayload) => {
    return api
        .put<LatestInvoicePaymentStatusResponse>(`/users/v0/user/${userId}/latest-invoice-payment-status`, payload)
        .then(res => res.data)
}

export const markLatestInvoicePaid = ({ userId, ...payload }: MarkLatestInvoicePaidPayload) => {
    return api
        .put<MarkLatestInvoicePaidResponse>(`/users/v0/user/${userId}/mark-latest-invoice-paid`, payload)
        .then(res => res.data)
}

export const subscribeToNewsletter = (payload: SubscribeToNewsletterPayload) => {
    return api
        .post<SubscribeToNewsletterResponse>("/users/v0/subscribe-to-newsletter", payload)
        .then(res => res.data)
}

export const getCouponDetail = (payload: GetCouponDetailParams) => {
    return api
        .get<CouponResponse>(`/coupons/v0/coupons/${payload.couponId}`)
        .then(res => res.data);
}