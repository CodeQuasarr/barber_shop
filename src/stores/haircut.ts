import {defineStore} from "pinia";
import type {HaircutType, shopType} from "@/types/haircutType";


export const useHaircutStore = defineStore('haircut', {
    state: () => ({
        haircuts: null as HaircutType[] | null,
        shop: null as shopType[] | null,
    }),
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        setHaircuts(haircuts: HaircutType[]) {
            this.haircuts = haircuts;
        },

        setShop(shop: shopType) {
            if (this.shop === null) {
                this.shop = [];
            }
            this.shop.push(shop);
        },

        updateShop(shop: shopType[]) {
            this.shop = shop;
        },

        resetShop() {
            this.shop = null;
        },

        resetHaircut() {
            this.haircuts = null;
        },
    },

    getters: {
        getHaircuts(): HaircutType[] | null {
            return this.haircuts;
        },

        getShop(): shopType[] | null {
            return this.shop
        },

        getShopLength(): number {
            return this.shop ? this.shop.length : 0;
        }


    },
});
