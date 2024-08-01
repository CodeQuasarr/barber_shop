<script setup lang="ts">

import Private from "@/layouts/Private.vue";
import {computed, ref} from "vue";
import {useUserStore} from "../../stores/user";

const reservations = ref([
    { id: 1, date: '2023-10-01', time: '10:00', description: 'Réservation 1', isUpcoming: true },
    { id: 2, date: '2023-09-15', time: '14:00', description: 'Réservation 2', isUpcoming: false },
    { id: 3, date: '2023-11-20', time: '09:00', description: 'Réservation 3', isUpcoming: true },
    { id: 4, date: '2023-12-01', time: '16:00', description: 'Réservation 4', isUpcoming: true },
    { id: 5, date: '2023-08-01', time: '08:00', description: 'Réservation 5', isUpcoming: false },
    { id: 6, date: '2023-07-01', time: '12:00', description: 'Réservation 6', isUpcoming: false },
    { id: 7, date: '2023-06-01', time: '15:00', description: 'Réservation 7', isUpcoming: false },
    { id: 8, date: '2023-05-01', time: '18:00', description: 'Réservation 8', isUpcoming: false },
    { id: 9, date: '2023-04-01', time: '20:00', description: 'Réservation 9', isUpcoming: false },
    { id: 10, date: '2023-03-01', time: '22:00', description: 'Réservation 10', isUpcoming: false },
    { id: 11, date: '2023-02-01', time: '23:00', description: 'Réservation 11', isUpcoming: false },
    { id: 12, date: '2023-01-01', time: '00:00', description: 'Réservation 12', isUpcoming: false },
    { id: 13, date: '2022-12-01', time: '01:00', description: 'Réservation 13', isUpcoming: false },
    { id: 14, date: '2022-11-01', time: '02:00', description: 'Réservation 14', isUpcoming: false },
    { id: 15, date: '2022-10-01', time: '03:00', description: 'Réservation 15', isUpcoming: false },
    { id: 16, date: '2022-09-01', time: '04:00', description: 'Réservation 16', isUpcoming: false },
    { id: 17, date: '2022-08-01', time: '05:00', description: 'Réservation 17', isUpcoming: false },
    { id: 18, date: '2022-07-01', time: '06:00', description: 'Réservation 18', isUpcoming: false },
    { id: 19, date: '2022-06-01', time: '07:00', description: 'Réservation 19', isUpcoming: false },
    { id: 20, date: '2022-05-01', time: '08:00', description: 'Réservation 20', isUpcoming: false },
    { id: 21, date: '2022-04-01', time: '09:00', description: 'Réservation 21', isUpcoming: false },
    { id: 22, date: '2022-03-01', time: '10:00', description: 'Réservation 22', isUpcoming: false },
    { id: 23, date: '2022-02-01', time: '11:00', description: 'Réservation 23', isUpcoming: false },
    { id: 24, date: '2022-01-01', time: '12:00', description: 'Réservation 24', isUpcoming: false },
    { id: 25, date: '2021-12-01', time: '13:00', description: 'Réservation 25', isUpcoming: false },
    { id: 26, date: '2021-11-01', time: '14:00', description: 'Réservation 26', isUpcoming: false },
    { id: 27, date: '2021-10-01', time: '15:00', description: 'Réservation 27', isUpcoming: false },
    { id: 28, date: '2021-09-01', time: '16:00', description: 'Réservation 28', isUpcoming: false },
]);

const filter = ref('upcoming');

const filteredReservations = computed(() => {
    if (filter.value === 'upcoming') {
        return reservations.value.filter(reservation => reservation.isUpcoming);
    } else if (filter.value === 'past') {
        return reservations.value.filter(reservation => !reservation.isUpcoming);
    } else {
        return reservations.value;
    }
});

const filterReservations = () => {
    // This method is triggered when the filter changes
};
</script>

<template>
    <div>
        <Private>
            <div class="py-24">
              dfgdfg
              {{ useUserStore().getToken }}
                <h1 class="text-4xl font-semibold text-gray-800">Dashboard</h1>
                <p class="mt-4 text-gray-600">Welcome to your dashboard</p>

                <div class="py-8">
                    <div class="my-2 flex sm:flex-row flex-col">
                        <div class="flex flex-row mb-1 sm:mb-0">
                            <div class="relative">

                                <select
                                    id="filter"
                                    v-model="filter"
                                    class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    @change="filterReservations"
                                >
                                    <option value="upcoming">À venir</option>
                                    <option value="past">Passées</option>
                                    <option value="all">Toutes</option>
                                </select>
                                <div
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
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
                                        Heure
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="reservation in filteredReservations" :key="reservation.id">

                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {{ reservation.time }}
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {{ reservation.date }}
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span :class="['inline-flex items-center rounded-md', reservation.isUpcoming ? 'bg-green-50' : 'bg-red-50', 'px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20']">
                                            {{ reservation.isUpcoming ? 'À venir' : 'Passée' }}
                                        </span>
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
