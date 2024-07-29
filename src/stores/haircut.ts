import {defineStore} from "pinia";
import type {HaircutType} from "@/types/haircutType";


export const useHaircutStore = defineStore('haircut', {
    state: () => ({
        haircuts: null as HaircutType[] | null,
    }),
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        setHaircuts(haircuts: HaircutType[]) {
            this.haircuts = haircuts;
        },

        resetHaircut() {
            this.haircuts = null;
        },
    },

    getters: {
        getHaircuts(): HaircutType[] | null {
            return this.haircuts;
        },
    },
});
