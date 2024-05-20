import { ProductType } from "@/entities"
import { SubCard } from "../sub-card/sub-card.component"
import { HiPlus } from "react-icons/hi2";

export function PricingList({
    products
}: {
    products: Array<{
        id: string
        name: string
        quantity: number
        productType: ProductType
        units: number
        price: number
    }>
}) {
    return (
        <div className="flex flex-col items-center gap-8 [&>*]:self-stretch w-full">
            {products.map(product => (
                <div key={product.id} className="flex justify-end [&>*]:flex-1">
                    <SubCard type="free" count={product.units} />
                </div>
            ))}

            {/* <div className="flex justify-center">
                    <HiPlus className="h-6 w-6" />
                </div>

                <div className="flex justify-end [&>*]:flex-1">
                    <SubCard type="bronze" count={40} />
                </div>

                <div className="flex justify-end [&>*]:flex-1">
                    <p className="text-lg text-center font-semibold">Total amount: $120</p>
                </div> 
            */}
        </div>
    )
}
