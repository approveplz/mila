import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { AuthStore } from './auth.types';

export const useAuthStore = create<AuthStore>()(
    subscribeWithSelector(
        immer(
            (set) => ({
                user: null,
                authUser: null,
                setUser(user) {
                    set(state => {
                        state.user = user; 
                    })
                },
                setAuthUser(user) {
                    set(state => {
                        state.authUser = user; 
                    })
                }
            }
        )
    )
));