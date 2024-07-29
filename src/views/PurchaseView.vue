<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {StarIcon} from '@heroicons/vue/24/solid'
//@ts-ignore
import {RadioGroup, RadioGroupOption} from '@headlessui/vue'
import type {HaircutDetailType} from "@/types/haircutType";
import {useRoute} from "vue-router";


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

const reviews = { href: '#', average: 4, totalCount: 117 }

const selectedSize = ref(product?.value?.sizes[2])

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
                    <img :src="product.images[0].src" :alt="product.images[0].alt" class="h-full w-full object-cover object-center" />
                </div>

                <div class="aspect-h-5 aspect-w-4 lg:aspect-h-2 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img :src="product.images[1].src" :alt="product.images[1].alt" class="h-full w-full object-cover object-center" />
                </div>
            </div>

            <!-- Product info -->
            <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
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
                                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[reviews.average > rating ? 'text-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
                            </div>
                            <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
                            <a :href="reviews.href" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{{ reviews.totalCount }} reviews</a>
                        </div>
                    </div>

                    <form class="mt-10">

                        <!-- Sizes -->
                        <div class="mt-10">
                            <div class="flex items-center justify-between">
                                <h3 class="text-sm font-medium text-gray-900">Taille</h3>
                            </div>

                            <fieldset aria-label="Choose a size" class="mt-4">
                                <RadioGroup v-model="selectedSize" class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                    <RadioGroupOption as="template" v-for="size in product.sizes" :key="size.name" :value="size" :disabled="!size.inStock" v-slot="{ active, checked }">
                                        <div :class="[size.inStock ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200', active ? 'ring-2 ring-indigo-500' : '', 'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6']">
                                            <span>{{ size.name }}</span>
                                            <span v-if="size.inStock" :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-md']" aria-hidden="true" />
                                            <span v-else aria-hidden="true" class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                        <svg class="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                          <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
                        </svg>
                      </span>
                                        </div>
                                    </RadioGroupOption>
                                </RadioGroup>
                            </fieldset>
                        </div>
                        <button type="submit" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#d1b096] px-8 py-3 text-base font-medium hover:bg-black hover:text-white uppercase">Add to bag</button>
                    </form>
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
