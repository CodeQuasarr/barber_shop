<script setup lang="ts">
import {ref} from "vue";
import aboutImage4 from "@/assets/images/abouts/about4.webp";

const clientsSays = ref([
  {
    id: 1,
    name: 'Sophie Lefèvre',
    description: 'Le Salon est tout simplement extraordinaire ! Les coiffeuses sont non seulement talentueuses mais aussi très attentionnées. J\'ai toujours été satisfaite de mes coupes et colorations. Elles savent vraiment comment mettre en valeur ma personnalité à travers mes cheveux. Je recommande ce salon à tout le monde !',
  },
  {
    id: 1,
    name: 'Julie Moreau',
    description: 'Chaque visite est un vrai moment de détente. Les coiffeuses sont très professionnelles et à l\'écoute de mes besoins. La coupe est toujours impeccable et je ressors toujours avec le sourire. C\'est le meilleur salon de coiffure que j\'ai pu fréquenter',
  },
  {
    id: 1,
    name: 'Claire Dubois',
    description: 'Je suis cliente depuis des années et je n\'ai jamais été déçue. Les coiffeuses sont incroyablement douées et elles utilisent des produits de haute qualité. J\'apprécie particulièrement leurs conseils personnalisés pour entretenir mes cheveux à la maison. Une expérience exceptionnelle à chaque fois !',
  }
])

const currentIndex = ref(0);

const setCurrentIndex = (index: number) => {
  currentIndex.value = index;
};

</script>

<template>
  <div class="w-4/6 mx-auto min-h-[700px] flex justify-center items-center">
    <div>
      <div class="grid grid-cols-2 items-center justify-center">
        <div>
          <h1 class="text-xl text-[#D1B096] italic font-medium">Avis des clients</h1>
          <h2 class="text-4xl max-w-xl font-bold uppercase mb-16">Ce que disent nos clients</h2>
          <div v-for="(client, index) in clientsSays" :key="client.id" v-show="index === currentIndex" class="flex flex-col">
            <p class="text-xl">{{ client.description }}</p>
            <h3 class="text-3xl font-semibold uppercase mt-5">{{ client.name }}</h3>
          </div>
        </div>

        <div class="ms-auto">
          <img :src="aboutImage4" alt="">
        </div>
      </div>
      <div class="flex space-x-2 mt-4 items-center justify-center">
      <span v-for="(client, index) in clientsSays" :key="client.id"
            @click="setCurrentIndex(index)"
            class="cursor-pointer w-10 h-1 "
            :class="{'bg-gray-400': index !== currentIndex, 'bg-[#D1B096]': index === currentIndex}">
      </span>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>