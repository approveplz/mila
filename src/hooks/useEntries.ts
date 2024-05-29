import { CheckoutProduct } from '@/store/checkout/checkout.types';
import { useEffect, useState } from 'react';

const useCalculateEntries = (pricingType: "subscription" | "bundle", products: CheckoutProduct[]) => {
    const [entries, setEntries] = useState(0);

    useEffect(() => {
        const calculateEntries = (type: string) => {
            let tempEntries = 0;
            products?.forEach((product: CheckoutProduct) => {
                if (product?.data?.type === type) {
                    tempEntries += (product.quantity * product.data.number_of_entries);
                }
            });
            return tempEntries;
        };

        const type = pricingType === 'bundle' ? 'bundle' : 'subscription';
        setEntries(calculateEntries(type));
    }, [pricingType, products]);

    return entries;
};

export default useCalculateEntries;
