import { Product, ProductType } from "@/entities"
import { SubscriptionCard, BundleCard } from "../sub-card/sub-card.component"
import { HiPlus } from "react-icons/hi2";
import { CheckoutProduct } from "@/store/checkout/checkout.types";
import { getDefaultPrice, getDiscountedPrice, getProductPrice } from "@/utils";

function calculateTotal(products: Array<CheckoutProduct>) {
    const getPrice = (prices: Product["prices"]) => {
        let price = 0;

        const actualPrice = getProductPrice(prices);
        // if (product.prices.length > 0) {
        //     price = getDiscountedPrice(product.prices);
        // } else {
        //     price = getDefaultPrice(product.prices)
        // }

        if (actualPrice.isDiscounted) {
            return actualPrice.discountedPrice
        } else {
            return actualPrice.defaultPrice
        }
    }

    return products.reduce((accumulator, currentValue) => getPrice(currentValue.data.prices) + accumulator, 0);
}

export function ProductPriceSelector({
    product,
    view
}: {
    product: CheckoutProduct,
    view: (props: { defaultPrice: number }) => React.ReactNode
}) {
    const defaultPrice = getDefaultPrice(product.data.prices)

    return (
        <>
            {view({ defaultPrice })}
        </>
    )
}

export function PricingList({
    products
}: {
    products: Array<CheckoutProduct>
}) {
    const subscriptions = products.filter(product => product.data.type === "subscription");
    const bundles = products.filter(product => product.data.type === "bundle");

    return (
        <div className="flex flex-col items-center gap-8 [&>*]:self-stretch w-full">
            {subscriptions.map(product => (
                <div
                    key={product.id}
                    className="flex justify-end [&>*]:flex-1"
                >
                    {/* <ProductPriceSelector
                        product={product}
                        view={({ defaultPrice }) => (
                            <SubscriptionCard type={product.data.tier as any} count={defaultPrice} />
                        )}
                    /> */}

                    <SubscriptionCard type={product.data.tier as any} count={product.data.number_of_entries} />
                </div>
            ))}

            {bundles.length > 0 && (
                <>
                    {subscriptions.length > 0 && (
                        <div className="flex justify-center">
                            <HiPlus className="h-6 w-6" />
                        </div>
                    )}

                    <div className="flex justify-end [&>*]:flex-1">
                        <BundleCard
                            type="bronze"
                            count={bundles.reduce((total, bundle) => total + bundle.data.number_of_entries, 0)}
                        />
                    </div>
                </>
            )}


            <div className="flex justify-end [&>*]:flex-1">
                <p className="text-lg text-center font-semibold">
                    Total amount: ${calculateTotal(products)}
                </p>
            </div>
        </div>
    )
}
