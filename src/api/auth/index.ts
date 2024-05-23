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
    SendVerificationSmsResponse,
    SignInWithCredentialsPayload,
    SignInWithCredentialsResponse,
    SignUpWithPricesPayload,
    SignUpWithPricesResponse,
    VerifyEmailOrSMSPayload,
    VerifyEmailOrSMSResponse
} from "./auth.types";

export const signInWithCredentials = (payload: SignInWithCredentialsPayload) => {
    return api
        .post<SignInWithCredentialsResponse>("/auth/v0/token", payload)
        .then(res => res.data)
}

export const signUpWithPrices = (payload: SignUpWithPricesPayload) => {
    console.log("payload: ", payload);
    return api
        .post<SignUpWithPricesResponse>("/users/v0/sign-up", payload)
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

export const getCouponDetail = (payload: GetCouponDetailParams) => {
    return api
        .get<CouponResponse>(`/coupons/v0/coupons/${payload.couponId}`)
        .then(res => res.data);
}