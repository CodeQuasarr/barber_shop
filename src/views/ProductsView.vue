<script setup lang="ts">
import {computed, ref} from "vue";

const images = import.meta.glob('@/assets/images/shops/*.webp', {eager: true, as: 'url'});

interface Product {
    id: number;
    name: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
    price: number;
    category: string;
    date?: Date; // Propriété optionnelle
    sales?: number; // Propriété optionnelle
    isOnSale?: boolean; // Propriété optionnelle
}
const products: Product[] = [
    {
        id: 1,
        name: 'Perruque style tête rouge',
        description: 'Work from home accessories',
        imageSrc: images['/src/assets/images/shops/shop-1.webp'],
        imageAlt: 'Image description for product 1.',
        href: '/products/1',
        price: 350,
        category: 'Accessories',
        date: new Date('2024-01-01'), // Date d'ajout
        sales: 20, // Ventes pour le tri
        isOnSale: false, // Promotion
    },
    {
        id: 2,
        name: 'Perruque de cheveux blonds',
        description: 'Journals and note-taking',
        imageSrc: images['/src/assets/images/shops/shop-2.webp'],
        imageAlt: 'Image description for product 2.',
        href: '/products/2',
        price: 300,
        category: 'Accessories',
        date: new Date('2024-02-01'),
        sales: 30,
        isOnSale: true,
    },
    {
        id: 3,
        name: 'Perruque de cheveux noirs',
        description: 'Work from home accessories',
        imageSrc: images['/src/assets/images/shops/shop-3.webp'],
        imageAlt: 'Image description for product 3.',
        href: '/products/3',
        price: 400,
        category: 'Accessories',
        date: new Date('2024-03-01'),
        sales: 10,
        isOnSale: false,
    },
    {
        id: 4,
        name: 'Perruque de cheveux bruns',
        description: 'Journals and note-taking',
        imageSrc: images['/src/assets/images/shops/shop-4.webp'],
        imageAlt: 'Image description for product 4.',
        href: '/products/4',
        price: 250,
        category: 'Accessories',
        date: new Date('2024-04-01'),
        sales: 40,
        isOnSale: true,
    },
    {
        id: 5,
        name: 'Perruque de cheveux gris',
        description: 'Work from home accessories',
        imageSrc: images['/src/assets/images/shops/shop-5.webp'],
        imageAlt: 'Image description for product 5.',
        href: '/products/5',
        price: 200,
        category: 'Accessories',
        date: new Date('2024-05-01'),
        sales: 50,
        isOnSale: false,
    },
    {
        id: 6,
        name: 'Perruque de cheveux blancs',
        description: 'Journals and note-taking',
        imageSrc: images['/src/assets/images/shops/shop-6.webp'],
        imageAlt: 'Image description for product 6.',
        href: '/products/6',
        price: 150,
        category: 'Accessories',
        date: new Date('2024-06-01'),
        sales: 60,
        isOnSale: true,
    },
    {
        id: 7,
        name: 'Perruque de cheveux roux',
        description: 'Work from home accessories',
        imageSrc: images['/src/assets/images/shops/shop-1.webp'],
        imageAlt: 'Image description for product 7.',
        href: '/products/7',
        price: 100,
        category: 'Accessories',
        date: new Date('2024-07-01'),
        sales: 70,
        isOnSale: false,
    },
    {
        id: 8,
        name: 'Perruque de cheveux châtains',
        description: 'Journals and note-taking',
        imageSrc: images['/src/assets/images/shops/shop-2.webp'],
        imageAlt: 'Image description for product 8.',
        href: '/products/8',
        price: 50,
        category: 'Accessories',
        date: new Date('2024-08-01'),
        sales: 80,
        isOnSale: true,
    },
    {
        id: 9,
        name: 'Perruque de cheveux blonds',
        description: 'Work from home accessories',
        imageSrc: images['/src/assets/images/shops/shop-3.webp'],
        imageAlt: 'Image description for product 9.',
        href: '/products/9',
        price: 450,
        category: 'Accessories',
        date: new Date('2024-09-01'),
        sales: 90,
        isOnSale: false,
    },
    {
        id: 10,
        name: 'Perruque de cheveux noirs',
        description: 'Journals and note-taking',
        imageSrc: images['/src/assets/images/shops/shop-4.webp'],
        imageAlt: 'Image description for product 10.',
        href: '/products/10',
        price: 500,
        category: 'Accessories',
        date: new Date('2024-10-01'),
        sales: 100,
        isOnSale: true,
    },
    {
        id: 11,
        name: 'Perruque de cheveux bruns',
        description: 'Work from home accessories',
        imageSrc: images['/src/assets/images/shops/shop-5.webp'],
        imageAlt: 'Image description for product 11.',
        href: '/products/11',
        price: 550,
        category: 'Accessories',
        date: new Date('2024-11-01'),
        sales: 110,
        isOnSale: false,
    },
    {
        id: 12,
        name: 'Perruque de cheveux gris',
        description: 'Journals and note-taking',
        imageSrc: images['/src/assets/images/shops/shop-6.webp'],
        imageAlt: 'Image description for product 12.',
        href: '/products/12',
        price: 600,
        category: 'Accessories',
        date: new Date('2024-12-01'),
        sales: 120,
        isOnSale: true,
    },

];

const selects = [
    { value: 1, name: 'Prix croissant' },
    { value: 2, name: 'Prix décroissant' },
    { value: 3, name: 'Nouveautés' },
    { value: 4, name: 'Meilleures ventes' },
    { value: 5, name: 'Promotions' },
]



const maxPrice = computed(() => {
    return Math.max(...products.map(product => product.price));
});
const price = ref(maxPrice.value);
const selectedCategory = ref<string | null>(null);
const selected = ref<number | null>(null); // Option de tri sélectionnée
const filteredProducts = computed(() => {
    const filtered = products.filter(product =>
        product.price <= price.value &&
        (!selectedCategory.value || product.category === selectedCategory.value)
    );
    return sortProducts(filtered, selected.value); // Appliquer le tri
});

function sortProducts(products: Product[], sortBy: number | null) {
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
    for (const product of products) {
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
                            <RouterLink :to="product.href">
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
