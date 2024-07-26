<script setup lang="ts">
import CHeader from "@/layouts/visitors/CHeader.vue";
import CFooter from "@/layouts/visitors/CFooter.vue";
</script>

<template>
  <div class="jost">
      <CHeader/>
      <RouterView />
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
