import { Product, ProductType } from "@/entities"

export type CheckoutProduct = {
    id: string
    quantity: number
    data: Product
}

type State = {
    checkoutFlow: "free" | "paid"
    products: Array<CheckoutProduct>
    pricingType?: "subscription" | "bundle"
}

type Actions = {
    addProduct: (payload: Product) => void
    removeProduct: (id: string) => void
    clearProducts: (type: ProductType | "all") => void
    increaseProductQuantity: (id: string) => void
    decreaseProductQuantity: (id: string) => void
    setPricingType: (type: "subscription" | "bundle") => void
}

export type CheckOutStore = State & Actions