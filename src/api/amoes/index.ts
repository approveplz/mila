import api from "@/api";
import { ListUpcomingGiveawaysResponse } from "./amoe.types";

export const listUpcomingGiveaways = () => {
    return api
        .get<ListUpcomingGiveawaysResponse>("/amoes/v0/upcoming-giveaways", { params: { secret: "F83C63FEB5E3E6768D86281E2B2F7" } })
        .then(res => res.data)
}