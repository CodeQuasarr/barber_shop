<script setup lang="ts">

import aboutImage1 from "@/assets/images/abouts/about1.webp";
import aboutImage2 from "@/assets/images/abouts/about2.webp";
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">

    <div class="w-2/5 p-24">
      <div class="mb-8 pr-20">
        <h1 class="text-xl text-[#D1B096] italic font-medium">C'est ici</h1>
        <h2 class="text-4xl max-w-xl font-bold uppercase">Bienvenue au salon de coiffure Miroir de Style</h2>
      </div>
      <div>
        <p class="mb-10">
          Aqestic optio amet a ququam saepeqal aliquid voluate dicta fugaosat dolor error sed earum a magni bladiis
          dolores, veritatis soluta autem quo eveniet eligendi magni natus ipsama beatae officia aliquid rerum sit
          bladiis dolores provent sed earum quo delectus.
        </p>
        <p class="mb-10">
          Nam risus dolor, ut ornare mauris non. Praent non voluptate dicta fuga dolor error sed earum a aliqdpp quis
          tempor arcuam aliquet metus non neque vitae.
        </p>
      </div>
      <div class="my-10">
        <RouterLink to="#" class="bg-[#d1b096] text-xl px-10 py-5 rounded-sm uppercase font-semibold hover:bg-black hover:text-white">
          A propos de nous
        </RouterLink>
      </div>
    </div>

    <div class="w-3/5 grid grid-cols-2 p-24 gap-12">
      <div ><img :src="aboutImage1" alt=""></div>
      <div><img :src="aboutImage2" alt=""></div>
    </div>
  </div>
</template>

<style scoped>

</style>