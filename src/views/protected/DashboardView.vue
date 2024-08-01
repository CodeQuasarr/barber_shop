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

onMounted(async () => {
  await getOrders();
});
</script>

<template>
    <div>
        <Private>
            <div class="py-24">
                <h1 class="text-4xl font-semibold text-gray-800">Dashboard</h1>
                <p class="mt-4 text-gray-600">Welcome to your dashboard</p>
                {{ useUserStore().name }}
                <div class="py-8">
                    <div class="my-2 flex sm:flex-row flex-col">
                        <div class="flex flex-row mb-1 sm:mb-0">
                            <div class="relative">


                            </div>
                        </div>
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table class="min-w-full leading-normal">
                                <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Numéro
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Prix
                                    </th>
                                  <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="order in orders" :key="order.id">

                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {{ order.id }}
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {{ order.date }}
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {{ order.total }}
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button @click="downloadInvoice(order.id)">Télécharger</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div
                                class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span class="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
                                <div class="inline-flex mt-2 xs:mt-0">
                                    <button
                                        class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                        Prev
                                    </button>
                                    <button
                                        class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Private>
    </div>
</template>

<style scoped>

</style>
