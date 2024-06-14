import { Product } from "@/entities";
import { useCheckOutStore } from "@/store";
import { getProductPrice } from "@/utils";
import { useEffect, useState } from "react";

const useTotalAmount = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const { products } = useCheckOutStore();

    useEffect(() => {
        if (products?.length > 0) {
            let amount = 0;
            products.forEach(product => {
                if (product?.data?.type === 'subscription') {
                    const quantity = product?.quantity;
                    const pricingData = getProductPrice(product?.data?.prices);
                    amount += pricingData?.isDiscounted ? quantity * pricingData?.discountedPrice : quantity * pricingData?.defaultPrice;
                } else {
                    const quantity = product.quantity;
                    const pricingData = product?.data?.prices[0]?.unit_amount;
                    amount += quantity * Number(pricingData);
                }
            });
            setTotalAmount(amount);
        }
    }, [products]);

    return {totalAmount};
};

export default useTotalAmount;