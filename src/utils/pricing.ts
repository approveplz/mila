import { Price } from "@/entities";

export const getDefaultPrice = (prices: Array<Price>, is_free: boolean | undefined = false) => {
    const price = [...prices].sort((priceA, priceB) => priceA.sort_order - priceB.sort_order)
        .find(price => price.is_default)

    if (price) {
        return price.unit_amount
    }

    return 0;
}

export const getDiscountedPrice = (prices: Array<Price>, is_free: boolean | undefined = false) => {
    const price = [...prices]
        .sort((priceA, priceB) => priceA.sort_order - priceB.sort_order)
        .find(price => price.is_discounted);

    if (price) {
        return price.unit_amount
    }

    return 0;
}