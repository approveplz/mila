import { Product, ProductType } from "@/entities"

type CheckoutProduct = {
    id: string
    name: string
    quantity: number
    productType: ProductType
    units: number
    price: number
}

type State = {
    checkoutFlow: "free" | "paid"
    products: Array<CheckoutProduct>
}

type Actions = {
    addProduct: (payload: Product) => void
}

export type CheckOutStore = State & Actions