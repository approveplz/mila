import { User } from "@/entities";

type AuthCredentials = {
    refresh: string;
    access: string;
}

export type SignInWithCredentialsPayload = {
    email: string;
    password: string;
};

export type SignInWithCredentialsResponse = AuthCredentials & {
    user: User
}

export type RefreshTokenPayload = AuthCredentials;
export type RefreshTokenResponse = AuthCredentials;

export type SignInWithCredentialsErrorResponse = {
    detail: string
}

export type SignUpWithPricesPayload = {
    full_name: string
    email: string
    phone: string
    password: string
    state: string
    is_over_18_and_agrees_tc: boolean
    prices: Array<{
        price: string
        quantity: number
    }>
}

export type SignUpWithPricesResponse = AuthCredentials & {
    user: User
}

export type SendUserVerificationEmailResponse = User;

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

export type GetCouponCategoriesResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: CouponCategory[]
};

export type CouponCategory = {
    id: string;
    name: string;
    created: string;
    modified: string;
}

export type GetCouponsParams = {
    category: string,
    page?: number
};

export type GetCouponDetailParams = {
    couponId: string
};



export type BusinessLogo = {
    id: string;
    title: string;
    description: string | null;
    filename: string;
    type: string;
    size: number;
    mime_type: string;
    file_url: string;
    linked: boolean;
    is_internal: boolean;
    created: string;
    modified: string;
    created_by: any;
}

export type Business = {
    id: string;
    logo: BusinessLogo;
    name: string;
    description?: string;
    address?: string | null;
    phone?: string;
    email?: string;
    category: string;
    categorical_hierarchy?: string;
    socials?: Social[];
    created?: string;
    modified?: string;
}


export type CouponResponse = {
    id: string | null;
    minimum_plan?: string
    business: Business;
    off_label?: string;
    description: string;
    clip?: string | null;
    link?: string | null;
    instructions?: string;
    is_active?: boolean;
    created?: string;
    modified?: string;
}


export type GetCouponsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: CouponResponse[];
}

export type Social = {
    id: string;
    business: string;
    url: string;
    platform: string;
    created: string;
    modified: string;
}


export type GetProfileParams = {
    profileId: string;
}

export type Address = {
    id?: string;
    line_1?: string;
    line_2?: string;
    city?: string;
    region?: string;
    postal_code?: string;
};

export type GetProfileResponse = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: Address;
};


export type UpdateProfilePayload = {
    first_name?: string;
    last_name?: string;
    address?: Address;
    current_password?: string;
    new_password_1?: string;
    new_password_2?: string;
};

export type ProfileEntryResponse = {
    id: string;
    entries: {
        subscription_count: number;
        subscription_expiry: string;
        bundle_count: number;
        bundle_expiry: string;
        total_count: number;
    };
}

export type GetMeResponse = User;

export type LatestInvoicePaymentStatusPayload = {
    secret: string
    userId: string
}

export type LatestInvoicePaymentStatusResponse = {
    is_paid: boolean
}

export type MarkLatestInvoicePaidPayload = {
    secret: string
    userId: string
}

export type MarkLatestInvoicePaidResponse = {
    processing: boolean
}