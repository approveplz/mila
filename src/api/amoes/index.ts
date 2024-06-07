import api from "@/api";
import {
    CheckEligibilityPayload,
    CheckEligibilityResponse,
    CreateAMOEPayload,
    CreateAMOEResponse,
    ListUpcomingGiveawaysResponse,
    SendVerificationEmailPayload,
    SendVerificationEmailResponse,
    SendVerificationSMSPayload,
    SendVerificationSMSResponse,
    ValidateCodePayload,
    ValidateCodeResponse
} from "./amoe.types";

export const listUpcomingGiveaways = () => {
    return api
        .get<ListUpcomingGiveawaysResponse>("/amoes/v0/upcoming-giveaways", { params: { secret: "F83C63FEB5E3E6768D86281E2B2F7" } })
        .then(res => res.data)
}

export const checkEligibility = (payload: CheckEligibilityPayload) => {
    return api
        .post<CheckEligibilityResponse>("/amoes/v0/check-eligibility", payload)
        .then(res => res.data)
}

export const sendVerificationEmail = (payload: SendVerificationEmailPayload) => {
    return api
        .put<SendVerificationEmailResponse>("/amoes/v0/send-verification-email", payload)
        .then(res => res.data)
}

export const sendVerificationSMS = (payload: SendVerificationSMSPayload) => {
    return api
        .put<SendVerificationSMSResponse>("/amoes/v0/send-verification-sms", payload)
        .then(res => res.data)
}

export const validateCode = (payload: ValidateCodePayload) => {
    return api
        .post<ValidateCodeResponse>("/amoes/v0/validate-code", payload)
        .then(res => res.data)
}

export const createAMOE = (payload: CreateAMOEPayload) => {
    return api
        .post<CreateAMOEResponse>("/amoes/v0/amoes", payload)
        .then(res => res.data)
}