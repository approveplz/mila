import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components";
import { AmoeStepType } from "../../amoe-drawer.type";
import { useQuery } from "react-query";
import { listUpcomingGiveaways } from "@/api/amoes";

export function GiveawayStep({ actions }: AmoeStepType) {
    const { data: giveAways } = useQuery({
        queryFn: () => listUpcomingGiveaways(),
        select: (data) => data.results
    });

    const isValid = () => Promise.reject(false);

    console.log("giveAways: ", giveAways);
    return (
        <div className="flex flex-col gap-12">
            <p>GiveawayStep</p>

            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="e.g. Lorem ipsum" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>

            {actions && actions(isValid, false)}
        </div>
    )
}
