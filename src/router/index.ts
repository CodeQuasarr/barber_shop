import { createRouter, createWebHistory } from 'vue-router'
import DefautTemplate from "@/layouts/DefautTemplate.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DefautTemplate,
        children: [
          {path: '/', name: 'HOME', component: HomeView},
        ]
    },
  ]
})

export default router
