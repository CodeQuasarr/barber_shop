<script setup lang="ts">



import {ref} from "vue";
import type {ProductType} from "@/types/productType";

const images = import.meta.glob('@/assets/images/products/*.webp', {eager: true, as: 'url'});
const products = ref<ProductType[]>([
  {
    id: 1,
    name: "Biocoiff",
    description: "En tant que pionniers de la coloration végétale, nous vous proposons une alternative fiable aux produits chimiques.",
    image: images['/src/assets/images/products/product_1.webp'],
    price: 100,
  },
  {
    id: 1,
    name: "Les secrets de Loly",
    description: "Pour mettre à disposition des personnes aux cheveux texturés, des produits naturels de qualité.",
    image: images['/src/assets/images/products/product_2.webp'],
    price: 100,
  },
  {
    id: 1,
    name: "Lashilé",
    description: "Pour fournir des gummies 100 % vegan, fabriquées en France, avec des principes actifs de qualité et une efficacité prouvée.",
    image: images['/src/assets/images/products/product_3.webp'],
    price: 100,
  },
  {
    id: 1,
    name: "Douceur Nature",
    description: "Pour offrir une alliance naturelle et performante avec des formules ultra-raisonnées.",
    image: images['/src/assets/images/products/product_4.webp'],
    price: 100,
  },
  // {
  //   id: 1,
  //   name: "Ybera",
  //   description: "fondée au Brésil, cette marque allie haute technologie, qualité et Beauté avec une forte touche d’innovation pour la santé du cheveu, grâce à ses lissages et soins capillaires sans formol et à base de composants naturels.",
  //   image: images['/src/assets/images/products/product_5.webp'],
  //   price: 100,
  // },
]);
</script>

<template>
  <div class="container mx-auto flex flex-col items-center justify-center gap-28 min-h-screen">
    <div class="text-center">
      <p class="text-sm text-[#8E9A8D] uppercase font-bold">aussi en vente au salon</p>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Nos produits sélectionnés avec soin</h2>
    </div>

    <div>
      <div class="grid grid-cols-4 gap-10">

        <div
            v-for="product in products"
            :key="product.id"
            class="max-w-sm bg-white rounded-lg"
        >
          <a href="#">
            <img class="shadow rounded-lg" :src="product.image" alt=""/>
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ product.name }}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {{ product.description }}
            </p>
            <a href="#"
               class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>

</style>