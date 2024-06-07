import { GiveawayItem } from "@/entities"

export type ListUpcomingGiveawaysResponse = {
    count: number
    next: string | null
    previous: string | null
    results: Array<GiveawayItem>
}

export type CheckEligibilityPayload = {
    secret: string
    email?: string
    phone?: string
    giveaway: string
}

export type CheckEligibilityResponse = {
    is_eligible: boolean
}

export type ValidateCodePayload = {
    secret: string
    code: string
}

export type ValidateCodeResponse = {
    is_verified: boolean
}

export type SendVerificationEmailPayload = {
    secret: string
    email: string
}

export type SendVerificationEmailResponse = {
    sent_email: boolean
}

export type SendVerificationSMSPayload = {
    secret: string
    email: string
    phone: string
}

export type SendVerificationSMSResponse = {
    sent_sms: boolean
}

export type CreateAMOEPayload = {
    secret: string
    giveaway: string
    user: {
        first_name: string
        last_name: string
        email: string
        phone: string
    }
    address: {
        line_1: string
        line_2?: string
        postal_code: string
        city: string
        region: string
        country: string
    }
    is_over_18_and_agrees_tc: boolean
}

export type CreateAMOEResponse = {
    id: string
    giveaway: string
    user: {
        first_name: string
        last_name: string
        email: string
        phone: string
    }
    address: {
        line_1: string
        line_2: string
        postal_code: string
        city: string
        region: string
        country: string
    }
    is_over_18_and_agrees_tc: boolean
}