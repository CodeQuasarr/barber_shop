import { createRouter, createWebHistory } from 'vue-router'
import DefautTemplate from "@/layouts/DefautTemplate.vue";
import HomeView from "@/views/HomeView.vue";
import PurchaseView from "@/views/PurchaseView.vue";
import ProductsView from "@/views/ProductsView.vue";
import AboutView from "@/views/AboutView.vue";
import Register from "@/views/register.vue";
import Login from "@/views/Login.vue";
import DashboardView from "@/views/protected/DashboardView.vue";
import CartView from "@/views/CartView.vue";
import {useUserStore} from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DefautTemplate,
        children: [
          {path: '/register', name: 'REGISTER', component: Register, meta: {requiresGuest: true}},
          {path: '/login', name: 'LOGIN', component: Login, meta: {requiresGuest: true}},
          {path: '/', name: 'HOME', component: HomeView},
          {path: '/products/:id', name: 'PRODUCT_ITEM', component: PurchaseView},
          {path: '/products', name: 'PRODUCT', component: ProductsView},
          {path: '/abouts', name: 'ABOUT', component: AboutView},
          {path: '/dashboard', name: 'DASHBOARD', component: DashboardView, meta: {requiresAuth: true}},
          {path: '/cart', name: 'CART', component: CartView},
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

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'LOGIN' });
  } else if (to.matched.some(record => record.meta.requiresGuest) && isAuthenticated) {
    next({ name: 'DASHBOARD' });
  } else {
    next();
  }
});

export default router
