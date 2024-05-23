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

export const getProductPrice = (prices: Array<Price>, is_free: boolean | undefined = false) => {
    const sortedPrices = [...prices]
        .sort((priceA, priceB) => priceA.sort_order - priceB.sort_order);

    const discountedPrice = sortedPrices.find(price => price.is_discounted)?.unit_amount || 0;
    const defaultPrice = sortedPrices.find(price => price.is_default)?.unit_amount || 0;

    return {
        isDiscounted: !!discountedPrice,
        defaultPrice: defaultPrice,
        discountedPrice: discountedPrice
    }
}