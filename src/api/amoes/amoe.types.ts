import { GiveawayItem } from "@/entities"

export type ListUpcomingGiveawaysResponse = {
    count: number
    next: string | null
    previous: string | null
    results: Array<GiveawayItem>
}