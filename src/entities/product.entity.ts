
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
    type: "recurring"
    unit_amount: number
    unit_amount_decimal: number
    is_default: boolean
    sort_order: number
    livemode: boolean
}

export interface Product {
    id: string;
    name: string;
    description: string;
    product_type: ProductType;
    active: boolean;
    is_default: boolean;
    sort_order: number;
    livemode: boolean;
    prices: Array<Price>
} 