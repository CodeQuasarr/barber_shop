<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
import {useCartStore} from "@/stores/cart";
import {useUserStore} from "@/stores/user";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {useRouter} from "vue-router";

const router = useRouter()
const logout = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useUserStore().getToken}`,
        },
    });

    if (response.ok) {
        useUserStore().logout();
        await router.push('/login');
    }
}
</script>

<template>
  <header>
    <nav class="z-50 w-full fixed bg-black">
      <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div class="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
          <input aria-hidden="true" type="checkbox" name="toggle_nav" id="toggle_nav" class="hidden peer">
          <div class="relative z-20 w-full flex justify-between lg:w-max md:px-0">
            <RouterLink to="/" aria-label="logo" class="flex space-x-2 items-center">
              <div aria-hidden="true" class="flex space-x-1">
                  <img src="@/assets/images/logo.webp" class="h-20 mr-3 sm:h-9" alt="HairDresser Logo">
              </div>
              <span class="text-2xl font-bold text-white dark:text-white">HairDresser</span>
            </RouterLink>

            <div class="relative flex items-center lg:hidden max-h-10">
              <label role="button" for="toggle_nav" aria-label="humburger" id="hamburger" class="relative  p-6 -mr-6">
                <div aria-hidden="true" id="line" class="m-auto h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                <div aria-hidden="true" id="line2" class="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
              </label>
            </div>
          </div>
          <div aria-hidden="true" class="fixed z-10 inset-0 h-screen w-screen bg-black/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden dark:bg-gray-900/70"></div>
          <div class="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-100 bg-black shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1  absolute top-full left-0 transition-all duration-300 scale-95 origin-top lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none dark:shadow-none dark:bg-gray-800 dark:border-gray-700">

            <div class="text-white dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
              <ul class="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                <li>
                  <RouterLink to="/" class="text-lg block md:px-4 transition hover:text-[#d1b096]">
                    <span>Accueil</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/products" class="text-lg block md:px-4 transition hover:text-[#d1b096]">
                    <span>Boutique</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="abouts" class="text-lg block md:px-4 transition hover:text-[#d1b096]">
                    <span>A propos</span>
                  </RouterLink>
                </li>
                  <li>
                  <RouterLink to="/cart" class="text-lg block md:px-4 transition hover:text-[#d1b096]">
                    <div class="relative">
                        <span class="flex items-center">Panier <ShoppingCartIcon class="size-9 " /></span>
                        <div class="absolute top-1 right-0 mt-[-15px] text-red-500 text-xl font-bold">{{ useCartStore().getQuantity }}</div>
                    </div>
                  </RouterLink>
                </li>
              </ul>
            </div>

            <div class="mt-12 lg:mt-0">
              <Menu v-if="useUserStore().isAuthenticated" as="div" class="relative ml-3">
                <div>
                  <MenuButton class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="absolute -inset-1.5" />
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
<!--                    <MenuItem v-slot="{ active }">-->
<!--                      <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Mon Profile</a>-->
<!--                    </MenuItem>-->
                    <MenuItem v-slot="{ active }">
                      <a href="/dashboard" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">facture</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button @click="logout" :class="['w-full block px-4 py-2 text-sm text-gray-50 bg-red-600']">Se déconnecter</button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
              <RouterLink v-else to="/login" class="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0  before:bg-[#d1b096] before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
                <span class="relative text-sm font-semibold text-black">Se connecter</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
