import { Product, ProductType } from "@/entities"
import { SubscriptionCard, BundleCard } from "../sub-card/sub-card.component"
import { HiPlus } from "react-icons/hi2";
import { CheckoutProduct } from "@/store/checkout/checkout.types";
import { getDefaultPrice, getDiscountedPrice } from "@/utils";

function calculateTotal(products: Array<CheckoutProduct>) {
    const getPrice = (product: Product) => {
        let price = 0;

        if(product.prices.length > 0) {
            price = getDiscountedPrice(product.prices);
        } else {
            price = getDefaultPrice(product.prices)
        }

        return price;
    }

    return products.reduce((accumulator, currentValue) => getPrice(currentValue.data) + accumulator, 0);
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
                    <ProductPriceSelector
                        product={product}
                        view={({ defaultPrice }) => (
                            <SubscriptionCard type={product.data.tier as any} count={defaultPrice} />
                        )}
                    />
                </div>
            ))}

            {bundles.length > 0 && (
                <>
                    <div className="flex justify-center">
                        <HiPlus className="h-6 w-6" />
                    </div>

                    <div className="flex justify-end [&>*]:flex-1">
                        <BundleCard type="bronze" count={40} />
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
