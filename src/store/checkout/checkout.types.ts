import { Product, ProductType } from "@/entities"

export type CheckoutProduct = {
    id: string
    quantity: number
    data: Product
}

type State = {
    checkoutFlow: "free" | "paid"
    products: Array<CheckoutProduct>
}

type Actions = {
    addProduct: (payload: Product) => void
    removeProduct: (id: string) => void
    increaseProductQuantity: (id: string) => void
    decreaseProductQuantity: (id: string) => void
}

export type CheckOutStore = State & Actions