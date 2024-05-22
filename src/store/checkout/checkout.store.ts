import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { CheckOutStore } from './checkout.types';

export const useCheckOutStore = create<CheckOutStore>()(
    subscribeWithSelector(
        immer(
            (set) => ({
                checkoutFlow: "paid",
                products: [],
                addProduct(payload) {
                    if (payload.type === "subscription") {
                        set(state => {
                            const subscription = state.products.filter(prod => prod.data.type === "subscription");

                            if (subscription.length > 0) {
                                state.products = state.products.filter(prod => prod.id !== subscription[0].id);
                            }

                            state.products.push({
                                quantity: 1,
                                id: payload.id,
                                data: payload
                            });
                        })
                    } else {
                        set(state => {
                            state.products.push({
                                quantity: 1,
                                id: payload.id,
                                data: payload
                            });
                        })
                    }
                },
                removeProduct(id) {
                    set(state => {
                        state.products = state.products.filter(prod => prod.id !== id)
                    })
                },
                increaseProductQuantity(id) {
                    set(state => {
                        state.products = state.products.map(prod => {
                            if (prod.id === id && prod.data.type === "bundle") {
                                prod.quantity = prod.quantity + 1;
                            }

                            return prod;
                        })
                    })
                },
                decreaseProductQuantity(id) {
                    set(state => {
                        state.products = state.products.map(prod => {
                            if (prod.id === id && prod.data.type === "bundle") {
                                prod.quantity = prod.quantity - 1;
                            }

                            return prod;
                        })
                    })
                }
            })
        )
    )
);

useCheckOutStore.subscribe(
    (state) => state.products,
    (products) => {
        if (products.some(prod => prod.data.type === "subscription") && products.some(prod => prod.data.is_free)) {
            useCheckOutStore.setState({
                checkoutFlow: "free"
            })
        } else {
            useCheckOutStore.setState({
                checkoutFlow: "paid"
            })
        }

        const zeroQuantityProduct = products.find(prod => prod.quantity === 0);

        if (zeroQuantityProduct) {
            useCheckOutStore.setState({
                products: products.filter(prod => prod.id !== zeroQuantityProduct.id)
            })
        }
    }
)