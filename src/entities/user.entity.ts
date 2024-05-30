export type User = {
    id: string
    full_name: string
    email: string
    phone: string
    state: string
    is_outside_of_us: boolean
    is_over_18: boolean
    onboarding_step: "payment_pending"
    metadata: {
        is_email_verified: boolean
        is_phone_verified: boolean
        has_a_pending_payment: boolean
        is_free_tier_subscriber: boolean
        subscribed_products: SubscribedProduct[]
    }
}

type SubscribedProduct = {
    product:String,
    quantity:number
}