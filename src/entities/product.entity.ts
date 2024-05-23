
export type ProductType = "subscription" | "bundle"

export interface Price {
    id: string
    product: string
    title: string
    description: string
    nickname: string
    active: boolean,
    billing_scheme: "per_unit"
    currency: "usd"
    lookup_key: string | null
    interval: "day"
    interval_count: number
    type: "recurring" | "one_time"
    unit_amount: number
    unit_amount_decimal: string
    sort_order: number
    is_default: boolean
    is_discounted: boolean
    livemode: boolean
}

export interface Product {
    id: string;
    name: string;
    description: string;
    // product_type: ProductType;
    number_of_entries: number
    access_duration: number
    type: ProductType;
    tier: "free" | "bronze" | "silver" | "gold" | "bundle";
    // active: boolean;
    sort_order: number;
    livemode: boolean;
    is_default: boolean;
    is_free: boolean;
    prices: Array<Price>
} 