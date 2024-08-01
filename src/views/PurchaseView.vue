<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {StarIcon} from '@heroicons/vue/24/solid'
import type {HaircutDetailType} from "@/types/haircutType";
import {useRoute} from "vue-router";
import {useCartStore} from "@/stores/cart";
import BtnLoading from "@/components/BtnLoading.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const images = import.meta.glob('@/assets/images/shops/*.webp', {eager: true, as: 'url'});
const route = useRoute();
const product = ref<HaircutDetailType | null>(null);

const getProductDetail = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/haircuts/${route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }
    product.value = await response.json();
    product.value?.images.map((image: any) => {
      image.src = images[`/src/assets/images/shops/${image.src}`]
    });
  } catch (error) {
    console.error(error);
  }
};

const reviews = {href: '#', average: 4, totalCount: 117}

const selectedSize = ref(product?.value?.sizes[2])
const loadBtn = ref<boolean>(false)

const addToCart = () => {
  try {
    loadBtn.value = true
    if (product.value && selectedSize.value) {
      const item = {
        haircut_id: product.value.id,
        price: product.value.price,
        name: product.value.name,
        imageSrc: product.value.images[0].src,
        imageAlt: product.value.images[0].alt,
        quantity: 1,
      };
      useCartStore().addItem(item);
      toast.success('Produit ajouté au panier', {
        position: 'top-center',
      });
    }
  } catch (error) {
    toast.error('Erreur lors de l\'ajout au panier', {
      position: 'top-center',
    });
    console.error(error);
  } finally {
    loadBtn.value = false
  }
}

onMounted(async () => {
  await getProductDetail();
  selectedSize.value = product.value?.sizes[2];
})
</script>

<template>
  <div class="bg-white py-24">
    <div v-if="product && Object.entries(product).length" class="pt-6">
      <nav aria-label="Breadcrumb">
        <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <li>
            <div class="flex items-center">
              <RouterLink to="/products" class="mr-2 text-sm font-medium text-gray-900"> retour</RouterLink>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Image gallery -->
      <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block relative">
          <img :src="product.images[0].src" :alt="product.images[0].alt"
               class="h-full w-full object-cover object-center"/>
        </div>

        <div class="aspect-h-5 aspect-w-4 lg:aspect-h-2 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <img :src="product.images[1].src" :alt="product.images[1].alt"
               class="h-full w-full object-cover object-center"/>
        </div>
      </div>

      <!-- Product info -->
      <div
          class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ product.name }}</h1>
        </div>

        <!-- Options -->
        <div class="mt-4 lg:row-span-3 lg:mt-0">
          <h2 class="sr-only">Product information</h2>
          <p class="text-3xl tracking-tight text-gray-900">{{ product.price }} €</p>

          <!-- Reviews -->
          <div class="mt-6">
            <h3 class="sr-only">Reviews</h3>
            <div class="flex items-center">
              <div class="flex items-center">
                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                          :class="[reviews.average > rating ? 'text-[#d1b096]' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                          aria-hidden="true"/>
              </div>
              <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
            </div>
          </div>

          <div class="mt-10">

            <!-- Sizes -->
            <div class="mt-10">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-900">Taille</h3>
              </div>

              <p class="mt-4">
                Découvrez notre perruque de cheveux noirs, alliant confort optimal et cheveux de haute qualité. Profitez
                d'une facilité d'entretien sans pareil et d'une allure élégante qui s'adapte à toutes vos envies.
              </p>
            </div>
            <button
                @click="addToCart"
                class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#d1b096] px-8 py-3 text-base font-medium hover:bg-black hover:text-white uppercase"
            >
              <BtnLoading v-if="loadBtn"/>
              Ajouter au panier
            </button>
          </div>
        </div>

        <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <!-- Description and details -->
          <div>
            <h3 class="sr-only">Description</h3>

            <div class="space-y-6">
              <p class="text-base text-gray-900">{{ product.description }}</p>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Points forts</h3>

            <div class="mt-4">
              <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                <li v-for="highlight in product.highlights" :key="highlight" class="text-gray-400">
                  <span class="text-gray-600">{{ highlight }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900">Details</h2>

            <div class="mt-4 space-y-6">
              <p class="text-sm text-gray-600">{{ product.details }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
