<script setup lang="ts">

import CHeader from "@/layouts/visitors/CHeader.vue";
</script>

<template>
  <div>
    <CHeader />
    <div class="w-full h-[700px] bg-cover bg-[url('@/assets/images/backgrounds/wallpape.webp')] relative">
      <div class="w-full h-full flex flex-col gap-10 justify-center items-center xl:items-start">
        <h1 class="max-w-md xl:max-w-3xl ps-0 xl:ps-16 text-4xl text-center xl:text-start text-white/70 font-bold uppercase">
          Une personne qui se coupe les cheveux est une personne qui s’apprête à changer de vie
        </h1>
        <div class="max-w-md xl:max-w-3xl ps-0 xl:ps-16 ">

          <div class="relative bg-white rounded-full px-7 py-3 text-sm leading-6 text-gray-600 ring-1 ring-white/60 hover:ring-white/90">
            <a href="#" class="text-xl font-semibold text-[#8E9A8D]"><span class="absolute inset-0" aria-hidden="true" />Je découvre les offres <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto flex flex-col items-center justify-center min-h-screen">
      <div class="text-center">
        <p class="text-sm text-[#8E9A8D] uppercase font-bold">aussi en vente au salon</p>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Nos produits sélectionnés avec soin</h2>
      </div>

      <div>
        <div class="grid grid-cols-4 gap-10">


          <div class="max-w-sm bg-white rounded-lg">
            <a href="#">
              <img class="shadow rounded-lg" src="@/assets/images/products/product_2.webp" alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>