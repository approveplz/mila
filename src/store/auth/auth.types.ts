import { User } from "@/entities"

type AuthUser = User & {
    password: string
}

type State = {
    user: User | null
    authUser:AuthUser | null
}

type Actions = { 
    setUser: (user: User) => void
    setAuthUser: (user: AuthUser) => void
}

export type AuthStore = State & Actions