<script lang="ts" setup>
const images = import.meta.glob('@/assets/images/shops/*.webp', {eager: true, as: 'url'});
import aboutImage3 from "@/assets/images/abouts/about3.webp";

const products = [
    {
        id: 1,
        name: 'Perruque style tête rouge',
        description: 'Work from home accessories',
        imageSrc: images['/src/assets/images/shops/shop-1.webp'],
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '/products/1',
        price: 350 + ' €',
    },
    {
        id: 2,
        name: 'Perruque de cheveux blonds',
        description: 'Journals and note-taking',
        imageSrc: images['/src/assets/images/shops/shop-2.webp'],
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '/products/2',
        price: 300 + ' €',
    },
    {
        id: 3,
        name: 'Perruque à cheveux courts',
        description: 'Daily commute essentials',
        imageSrc: images['/src/assets/images/shops/shop-3.webp'],
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/products/3',
        price: 290 + ' €',
    },
    {
        id: 4,
        name: 'Cheveux humains noirs de jais',
        description: 'Work from home accessories',
        imageSrc: images['/src/assets/images/shops/shop-4.webp'],
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '/products/4',
        price: 240 + ' €',
    },
    {
        id: 5,
        name: 'Perruque de cheveux raides',
        description: 'Journals and note-taking',
        imageSrc: images['/src/assets/images/shops/shop-5.webp'],
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '/products/5',
        price: 340 + ' €',
    },
    {
        id: 6,
        name: 'Perruque humaine marron',
        description: 'Daily commute essentials',
        imageSrc: images['/src/assets/images/shops/shop-5.webp'],
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/products/6',
        price: 260 + ' €',
    },
]
</script>

<template>
    <div class=" min-h-screen py-24 px-5 xl:px-24 bg-[#C0A28A]/10">
        <div class="grid grid-cols-1 xl:grid-cols-2">
            <div class="flex flex-col justify-center items-center">
                <h1 class="text-4xl text-center font-bold mb-5">Meilleure collection</h1>
                <p class="max-w-md text-lg font-normal text-center mb-8">Perruques synthétiques, mélangées et pré-bouclées
                    de style naturel et perruques douces au toucher</p>
                <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-5 pr-0 xl:pr-16">
                    <div v-for="product in products" :key="product.id" class="group relative">
                        <div
                            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-[#B2C0B0] lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img :alt="product.imageAlt" :src="product.imageSrc"
                                 class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>
                        <div class="mt-4 flex justify-between">
                            <div>
                                <h3 class="text-sm text-gray-700">
                                    <RouterLink :to="product.href">
                                        <span aria-hidden="true" class="absolute inset-0"/>
                                        {{ product.name }}
                                    </RouterLink>
                                </h3>
                            </div>
                            <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hidden xl:block">
                <img :src="aboutImage3" alt="" class="h-full w-full object-cover object-center">
            </div>
        </div>
        <div class="mt-24 text-center">
            <RouterLink class="bg-[#d1b096] text-xl px-10 py-5 rounded-sm uppercase font-semibold hover:bg-black hover:text-white"
                        to="/products">
                Plus d'articles
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>

</style>
