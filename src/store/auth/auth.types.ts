import { User } from "@/entities"

type State = {
    user: User | null
}

type Actions = { 
    setUser: (user: User) => void
}

export type AuthStore = State & Actions