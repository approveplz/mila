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
                pricingType: "subscription",
                closestGiveAwayDate: "",
                accountTab: 'info',
                setPricingType(type: "subscription" | "bundle") {
                    set(state => {
                        state.pricingType = type;
                    });
                },
                setAccountTab(type: "entries" | "info") {
                    set(state => {
                        state.accountTab = type;
                    });
                },
                setClosestGiveAwayDate(date: string) {
                    set(state => {
                        state.closestGiveAwayDate = date;
                    });
                },
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
                clearProducts(type) {
                    if (type === "subscription") {
                        set(state => {
                            state.products = state.products
                                .filter(product => product.data.type !== "subscription")
                        })
                    }

                    if (type === "bundle") {
                        set(state => {
                            state.products = state.products
                                .filter(product => product.data.type !== "bundle")
                        })
                    }

                    if (type === "all") {
                        set(state => {
                            state.products = []
                        })
                    }
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
        const isFree = products.some(prod => prod.data.type === "subscription") && products.every(prod => prod.data.is_free);

        if (isFree) {
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