import {defineStore} from "pinia";
import type {HaircutType, shopType} from "@/types/haircutType";
import type {CartType} from "@/types/cartType";


export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartType[] | null,
    }),

    actions: {

        addItem(item: CartType) {
            const existingItem = this.items?.find((i) => i.haircut_id === item.haircut_id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.items?.push(item);
            }
        },

        removeItem(haircut_id: number) {
            const itemIndex = this.items?.findIndex((i) => i.haircut_id === haircut_id);
            if (itemIndex !== -1 && itemIndex !== undefined) {
                const item = this.items![itemIndex];
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    this.items?.splice(itemIndex, 1);
                }
            }
        },

        clearCart() {
            this.items = [];
        }
    },

    getters: {
        getItems(): CartType[] | null {
            return this.items;
        },

        getItemsLength(): number {
            return this.items ? this.items.length : 0;
        },

        getTotalPrice(): number {
            return this.items?.reduce((acc, item) => {
                return acc + item.price * item.quantity;
            }, 0) || 0;
        },

        getQuantity(): number {
            return this.items?.reduce((acc, item) => {
                return acc + item.quantity;
            }, 0) || 0;
        },


    },
    persist: true,
});
