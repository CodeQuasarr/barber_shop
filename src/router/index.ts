import { createRouter, createWebHistory } from 'vue-router'
import DefautTemplate from "@/layouts/DefautTemplate.vue";
import HomeView from "@/views/HomeView.vue";
import PurchaseView from "@/views/PurchaseView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DefautTemplate,
        children: [
          {path: '/', name: 'HOME', component: HomeView},
          {path: '/products/:id', name: 'PRODUCT_ITEM', component: PurchaseView}
        ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      left: 0,
      behavior: 'smooth'
    }
  }
})

export default router
