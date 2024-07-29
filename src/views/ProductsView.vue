<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useHaircutStore} from "@/stores/haircut";
import type {HaircutType} from "@/types/haircutType";

const images = import.meta.glob('@/assets/images/shops/*.webp', {eager: true, as: 'url'});

const products = ref<HaircutType[] | null>(null);

const selects = [
    { value: 1, name: 'Prix croissant' },
    { value: 2, name: 'Prix décroissant' },
    { value: 3, name: 'Nouveautés' },
    { value: 4, name: 'Meilleures ventes' },
    { value: 5, name: 'Promotions' },
]

const haircuts = useHaircutStore().getHaircuts;

const getHairCuts = async () => {
    try {
        if (haircuts && haircuts.length > 0) {
            products.value = haircuts.map((product: HaircutType) => ({
                ...product,
                imageSrc: images[`/src/assets/images/shops/${product.imageSrc}`]
            }));
        } else {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/haircuts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData);
            }
            const haircuts = await response.json();
            products.value = haircuts.data.map((product: HaircutType) => ({
                ...product,
                imageSrc: images[`/src/assets/images/shops/${product.imageSrc}`]
            }));
            useHaircutStore().setHaircuts(haircuts.data);
        }
    } catch (error) {
        console.error(error);
    }
};



const maxPrice = computed(() => {
    if (!products.value || products.value.length === 0) {
        return 0;
    }
    return Math.max(...products.value.map(product => product.price));
});

const price = ref(maxPrice.value);
const selectedCategory = ref<string | null>(null);
const selected = ref<number | null>(null); // Option de tri sélectionnée

const filteredProducts = computed(() => {
    if (!products.value) {
        return [];
    }
    const filtered = products.value.filter(product => product.price <= price.value && (!selectedCategory.value || product.category === selectedCategory.value));
    return sortProducts(filtered, selected.value); // Appliquer le tri
});

function sortProducts(products: HaircutType[], sortBy: number | null) {
    return products.slice().sort((a, b) => {
        switch (sortBy) {
            case 1: // Prix croissant
                return a.price - b.price;
            case 2: // Prix décroissant
                return b.price - a.price;
            case 3: // Nouveautés
                return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(); // Trier par date
            case 4: // Meilleures ventes
                return (b.sales || 0) - (a.sales || 0); // Trier par ventes
            default:
                return 0;
        }
    });
}

const categoryCounts = computed(() => {
    const counts: { [key: string]: number } = {};
    for (const product of products.value || []) {
        if (product.category) {
            if (!counts[product.category]) {
                counts[product.category] = 0;
            }
            counts[product.category]++;
        }
    }
    return counts;
});

function selectCategory(category: string | null) {
    selectedCategory.value = category;
}

onMounted(async () => {
    await getHairCuts();
    price.value = maxPrice.value; // Update the price after products are loaded
});
</script>

<template>
    <div class="grid grid-cols-1 xl:grid-cols-8 py-24 px-5">
        <div class="order-2 xl:order-none col-span-full xl:col-span-6 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-5 pr-0 xl:pr-16">
            <div class="col-span-full">
                <div class="max-w-96 ms-auto">
                    <select
                        v-model="selected"
                        id="countries"
                        class="block w-full p-4 ps-10 text-xl text-gray-900 border border-[#d1b096] rounded-lg bg-accent focus:ring-orange-500 focus:border-orange-500"
                    >
                        <option value="null" disabled selected>Choisir une option</option>
                        <option v-for="select in selects" :key="select.value" :value="select.value">{{ select.name }}</option>
                    </select>
                </div>

            </div>

            <div v-for="product in filteredProducts" :key="product.id" class="group relative">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-[#B2C0B0] lg:aspect-none group-hover:opacity-75">
                    <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div class="mt-4 flex justify-between">
                    <div>
                        <h3 class="text-sm text-gray-700">
                            <RouterLink :to="'products/'+product.id">
                                <span aria-hidden="true" class="absolute inset-0" />
                                {{ product.name }}
                            </RouterLink>
                        </h3>
                    </div>
                    <p class="text-sm font-medium text-gray-900">{{ product.price }} €</p>
                </div>
            </div>
        </div>

        <div class="order-1 xl:order-none col-span-full xl:col-span-2 mt-6">
            <div class="col-span-full">
                <div class="max-w-96 ms-auto xl:mr-auto">
                    <div class="relative">
                        <input
                            type="search"
                            id="default-search"
                            name="search"
                            placeholder="Entrez le titre du film ou de la série."
                            class="block w-full p-4 ps-10 text-xl text-gray-50 border border-[#d1b096] rounded-lg focus:ring-[#d1b096] focus:[#d1b096]"
                            required
                        />
                        <button @click="" class="text-white absolute h-full end-0 bottom-0 bg-[#d1b096] hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-[#d1b096] font-medium rounded-lg text-sm px-8 py-2">
                            <svg class="w-5 h-5 text-white dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </button>
                    </div>

                    <div class="pt-8 ">
                        <label for="priceRange" class="block text-xl font-medium text-gray-700">FILTRER PAR PRIX</label>
                        <input
                            type="range"
                            id="priceRange"
                            v-model="price"
                            :min="0"
                            :max="maxPrice"
                            :step="10"
                            class="w-full mt-2 range-red"
                        />
                        <div class="mt-2 text-sm text-gray-600">Prix sélectionné: <span class="font-bold">${{ price }}</span></div>
                    </div>

                    <div class="pt-8">
                        <label class="block text-xl font-medium text-gray-700">FILTRER PAR CATEGORIES</label>
                        <ul>
                            <li @click="selectCategory(null)" class="cursor-pointer">Tout</li>
                            <li v-for="(count, category, index) in categoryCounts" :key="category+'_'+index" @click="selectCategory(category as string)" class="cursor-pointer">
                                {{ category }} ({{ count }})
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
input[type="range"].range-red {
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    background: #e0e0e0;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
}

input[type="range"].range-red:hover {
    opacity: 1;
}

input[type="range"].range-red::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #d1b096; /* Rouge pour le pouce */
    cursor: pointer;
    border-radius: 50%;
}

input[type="range"].range-red::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #c7a890; /* Rouge pour le pouce */
    cursor: pointer;
    border-radius: 50%;
}
</style>
