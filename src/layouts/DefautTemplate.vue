<script setup lang="ts">
import CHeader from "@/layouts/visitors/CHeader.vue";
import CFooter from "@/layouts/visitors/CFooter.vue";
</script>

<template>
  <div class="jost flex flex-col min-h-screen">
      <CHeader/>
      <div class="flex-1">
          <RouterView />
      </div>
      <CFooter/>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');

.jost {
  font-family: "Jost", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
