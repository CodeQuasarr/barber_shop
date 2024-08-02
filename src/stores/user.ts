import {defineStore} from "pinia";
import type {HaircutType, shopType} from "@/types/haircutType";
import type {CartType} from "@/types/cartType";


export const useUserStore = defineStore('user', {
    state: () => ({
        access_token: null as string | null,
        name: null as string | null,
    }),

    actions: {
        setName(name: string) {
            this.name = name;
        },

        setAccessToken(token: string) {
            this.access_token = token;
        },

        logout() {
            this.access_token = null;
            this.name = null;
            localStorage.clear();
        },
    },

    getters: {
        getToken(): string | null {
            return this.access_token;
        },

        getName(): string | null {
            return this.name;
        },

        isAuthenticated(): boolean {
            return this.access_token !== null && this.access_token.trim() !== '';
        }
    },
    persist: true,
});
