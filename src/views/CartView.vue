<script lang="ts" setup>

import {useHaircutStore} from "@/stores/haircut";
import {onMounted, ref} from "vue";
import type {shopType} from "@/types/haircutType";

const images = import.meta.glob('@/assets/images/shops/*.webp', {eager: true, as: 'url'});

const cart = useHaircutStore();

const allProducts = ref<shopType[] | null>(null);

const reorganizeCart = () => {
    if (cart.getShopLength) {
        console.log(cart.getShop);
        allProducts.value = cart.getShop?.map((product: shopType) => ({
            ...product,
            imageSrc: images[`${product.imageSrc}`],
            price: product.price,
            sizes: product.sizes,
        })) as shopType[] | null;
    }
    console.log(allProducts.value);
}

onMounted(() => {
    reorganizeCart();
})
</script>

<template>
    <div class="container mx-auto py-24">

        <div

            class="flex items-center hover:text-gray-600 dark:text-white cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="15 6 9 12 15 18" />
            </svg>
            <p class="text-sm pl-2 leading-none dark:hover:text-gray-200">Retour</p>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-24 px-5">
            <div class="col-span-full xl:col-span-2">
                <p class="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">Liste</p>

                <div
                    v-for="product in allProducts" :key="product.stripe_product_id"
                    class="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
                    <div class="md:w-4/12 w-full">
                        <img :src="product.imageSrc" alt="Black Leather Bag" class="h-80 object-center object-cover md:block hidden" />
                        <img :src="product.imageSrc" alt="Black Leather Bag" class="md:hidden w-full h-full object-center object-cover" />
                    </div>
                    <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                        <div class="flex items-center justify-between w-full pt-1">
                            <p class="text-2xl font-black leading-none text-gray-800 dark:text-white">{{ product.name }}</p>
                            <select aria-label="Select quantity" class="py-2 px-1 border border-gray-200">
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                            </select>
                        </div>
                        <p class="text-md leading-3 text-gray-600 dark:text-white pt-2">Taille: <span class="font-bold">{{ product.sizes }}</span></p>
                        <div class="flex items-center justify-between pt-5">
                            <div class="">
                                <p class="text-md leading-3 underline text-red-500 cursor-pointer">Supprimer</p>
                            </div>
                            <p class="text-base font-black leading-none text-gray-800 dark:text-white">{{ product.price }} €</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-full xl:col-span-1">
                <div>
                    <p class="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white"></p>
                    <div class="flex items-center justify-between pt-16">
                        <p class="text-base leading-none text-gray-800 dark:text-white">Subtotal</p>
                        <p class="text-base leading-none text-gray-800 dark:text-white">,000</p>
                    </div>
                    <div class="flex items-center justify-between pt-5">
                        <p class="text-base leading-none text-gray-800 dark:text-white">Shipping</p>
                        <p class="text-base leading-none text-gray-800 dark:text-white"></p>
                    </div>
                    <div class="flex items-center justify-between pt-5">
                        <p class="text-base leading-none text-gray-800 dark:text-white">Tax</p>
                        <p class="text-base leading-none text-gray-800 dark:text-white"></p>
                    </div>
                </div>
                <div>
                    <div class="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                        <p class="text-2xl leading-normal text-gray-800 dark:text-white">Total</p>
                        <p class="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">,240</p>
                    </div>
                    <button class="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700">Checkout</button>
                </div>
            </div>
        </div>



    </div>
</template>

<style scoped>

</style>
