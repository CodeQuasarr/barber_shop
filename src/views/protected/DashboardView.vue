<script setup lang="ts">

import Private from "@/layouts/Private.vue";
import {useUserStore} from "@/stores/user";
import {onMounted, ref} from "vue";
import type {OrderType} from "@/types/orderType";

const orders = ref<OrderType[] | null>(null);

const getOrders = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useUserStore().getToken}`,
        },
    });

    const all = await response.json();
    if (!response.ok) {
      throw new Error(all.message);

    } else {
      orders.value = all.data;
    }
};


const downloadInvoice = async (orderId: number) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}/invoice`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useUserStore().getToken}`,
        },
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `invoice_${1}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    return;
};

const formatFrenchDate = (dateString: string): string =>{
    const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const date = new Date(dateString);
    const jour = date.getUTCDate().toString().padStart(2, '0');
    const moisNom = mois[date.getUTCMonth()];
    const annee = date.getUTCFullYear();
    return `${jour} ${moisNom} ${annee}`;
}

onMounted(async () => {
  await getOrders();
});
</script>

<template>
    <div>
        <Private>
            <div class="py-24">
                <h1 class="text-4xl font-semibold text-gray-800">Mes factures</h1>
                <p class="mt-4 text-gray-600">Liste de mes factures </p>
                <div class="py-8">
                    <div class="my-2 flex sm:flex-row flex-col">
                        <div class="flex flex-row mb-1 sm:mb-0">
                            <div class="relative">


                            </div>
                        </div>
                    </div>
                    <div v-if="orders && orders.length" class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table class="min-w-full leading-normal">
                                <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 border-b-2 border-[#D1B096]/50 bg-[#D1B096]/50 text-left text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                                        date
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-[#D1B096]/50 bg-[#D1B096]/50 text-left text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                                        Neméro de commande
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-[#D1B096]/50 bg-[#D1B096]/50 text-left text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                                        Prix
                                    </th>
                                    <th class="px-5 py-3 border-b-2 border-[#D1B096]/50 bg-[#D1B096]/50 text-left text-xs text-gray-600 uppercase tracking-wider">></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="order in orders" :key="order.id">

                                    <td class="px-5 py-5 border-b border-[#D1B096]/50 bg-white text-sm font-bold">
                                        {{ formatFrenchDate(order.created_at) }}
                                    </td>
                                    <td class="px-5 py-5 border-b border-[#D1B096]/50 bg-white text-sm font-bold">
                                        {{ order.user }}
                                    </td>
                                    <td class="px-5 py-5 border-b border-[#D1B096]/50 bg-white text-sm font-bold">
                                        {{ order.total_price }} €
                                    </td>
                                    <td class="px-5 py-5 border-b border-[#D1B096]/50 bg-white text-sm">
                                        <button class="bg-[#D1B096] tracking-wide text-sm px-4 py-2 rounded-sm uppercase font-semibold hover:bg-black hover:text-white" @click="downloadInvoice(order.id)">Télécharger</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div v-else class="mt-10 max-w-5xl mx-auto flex flex-col items-center">
                        <div class="bg-[#f4f2f1] py-5 mb-5 w-full text-center text-[18px]">
                            Aucune facture disponible
                        </div>
                        <RouterLink to="/products"
                                    class="bg-[#D1B096] tracking-wide text-sm px-10 py-5 rounded-sm uppercase font-semibold hover:bg-black hover:text-white">
                            Allez à la boutique
                        </RouterLink>
                    </div>
                </div>

            </div>
        </Private>
    </div>
</template>

<style scoped>

</style>
