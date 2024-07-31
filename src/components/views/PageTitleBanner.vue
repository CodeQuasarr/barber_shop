<script setup lang="ts">

const props = defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="w-full h-[500px] bg-bottom bg-cover bg-[url('@/assets/images/backgrounds/wallpaper_4.webp')] relative">
    <div class="absolute h-full w-full bg-black/70"/>
    <div class="w-full xl:w-4/6 mx-auto z-30 relative h-full flex flex-col gap-10 justify-center items-center xl:items-start">
      <h1 class="w-full text-4xl text-white font-bold uppercase">
        {{ props.title }}
      </h1>
    </div>
  </div>
</template>

<style scoped>

</style>