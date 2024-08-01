<script setup lang="ts">
import CBanner from "@/components/CBanner.vue";
import CClientTestimonials from "@/components/CClientTestimonials.vue";
import CCollection from "@/components/CCollection.vue";
import CAbout from "@/components/CAbout.vue";
</script>

<template>
  <div>
      <CBanner/>

      <CAbout link="/abouts" title="À propos de nous"/>

      <!--    <CSelection />-->

      <CCollection/>

      <CClientTestimonials/>
  </div>
</template>
