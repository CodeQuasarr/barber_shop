import {defineStore} from "pinia";
import type {HaircutType, shopType} from "@/types/haircutType";
import type {CartType} from "@/types/cartType";


export const useUserStore = defineStore('user', {
    state: () => ({
        access_token: null as string | null,
    }),

    actions: {
        setAccessToken(token: string) {
            this.access_token = token;
        },

        resetAccessToken() {
            this.access_token = null;
        },
    },

    getters: {
        getToken(): string | null {
            return this.access_token;
        },

        isAuthenticated(): boolean {
            return this.access_token !== null && this.access_token.trim() !== '';
        }
    },
    persist: true,
});
