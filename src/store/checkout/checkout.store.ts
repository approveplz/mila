import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { CheckOutStore } from './checkout.types'

export const useCheckOutStore = create<CheckOutStore>()(immer(set => ({
    checkoutFlow: "free",
    products: [
        {
            id: "prd_bd393da27a524bd6ab68e7395b84e9",
            name: "Free",
            price: 0,
            quantity: 1,
            units: 1,
            productType: "subscription"
        }
    ],
    addProduct(payload) { },
})));