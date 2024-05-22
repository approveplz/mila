import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { CheckOutStore } from './checkout.types';
import { Product } from '@/entities';

const products: Array<Product> = [
    // {
    //     id: "prd_bd393da27a524bd6ab68e7395b84e9",
    //     name: "Free",
    //     description: "",
    //     type: "subscription",
    //     is_default: false,
    //     sort_order: 0,
    //     livemode: false,
    //     prices: [
    //         {
    //             id: "ppr_bd393da27a524bd6ab68e7395b84e9",
    //             product: "prd_bd393da27a524bd6ab68e7395b84e9",
    //             title: "Free - Default",
    //             description: "",
    //             nickname: "",
    //             active: true,
    //             billing_scheme: "per_unit",
    //             currency: "usd",
    //             lookup_key: null,
    //             interval: "day",
    //             interval_count: 30,
    //             type: "recurring",
    //             unit_amount: 0,
    //             unit_amount_decimal: "0",
    //             is_default: true,
    //             sort_order: 0,
    //             livemode: false
    //         }
    //     ]
    // },
    // {
    //     id: "prd_d243be29728db3a67864e5978a4d5b",
    //     name: "Silver",
    //     description: "",
    //     type: "subscription",
    //     is_default: false,
    //     sort_order: 2,
    //     livemode: false,
    //     prices: [
    //         {
    //             id: "ppr_d243be29728db3a67864e5978a4d5b",
    //             product: "prd_d243be29728db3a67864e5978a4d5b",
    //             title: "Silver - Default",
    //             description: "",
    //             nickname: "",
    //             active: true,
    //             billing_scheme: "per_unit",
    //             currency: "usd",
    //             lookup_key: null,
    //             interval: "day",
    //             interval_count: 30,
    //             type: "recurring",
    //             unit_amount: 40,
    //             unit_amount_decimal: "",
    //             is_default: true,
    //             sort_order: 0,
    //             livemode: false
    //         }
    //     ]
    // },
    // {
    //     id: "prd_e49e9db2752a4bd65467e893583a4a",
    //     name: "Bundle I",
    //     description: "",
    //     type: "bundle",
    //     is_default: false,
    //     sort_order: 4,
    //     livemode: false,
    //     prices: [
    //         {
    //             id: "ppr_e49e9db2752a4bd65467e893583a4a",
    //             product: "prd_e49e9db2752a4bd65467e893583a4a",
    //             title: "Bundle I",
    //             description: "",
    //             nickname: "",
    //             active: true,
    //             billing_scheme: "per_unit",
    //             currency: "usd",
    //             lookup_key: null,
    //             interval: "day",
    //             interval_count: 30,
    //             type: "one_time",
    //             unit_amount: 10,
    //             unit_amount_decimal: "",
    //             is_default: true,
    //             sort_order: 0,
    //             livemode: false
    //         }
    //     ]
    // },
]

export const useCheckOutStore = create<CheckOutStore>()(
    subscribeWithSelector(
        immer(
            (set) => ({
                checkoutFlow: "paid",
                products: [],
                addProduct(payload) {
                    if(payload.type === "subscription") {
                        set(state => {
                            const subscription = state.products.filter(prod => prod.type === "subscription");

                            if(subscription.length > 0) {
                                state.products = state.products.filter(prod => prod.id !== subscription[0].id);
                            }

                            state.products.push(payload);
                        })
                    }
                },
            })
        )
    )
);

useCheckOutStore.subscribe(
    (state) => state.products,
    (products) => {
        if(products.some(prod => prod.type === "subscription") && products.some(prod => prod.is_free)) {
            useCheckOutStore.setState({
                checkoutFlow: "free"
            })
        } else {
            useCheckOutStore.setState({
                checkoutFlow: "paid"
            })
        }
    }
)