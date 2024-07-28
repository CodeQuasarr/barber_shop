<script setup lang="ts">

import { Field, Form, ErrorMessage, type GenericObject } from 'vee-validate';
import {ref} from "vue";
import {useRouter} from "vue-router";
import {emailRule, nameRule, passwordConfirmationRule, passwordRule, phoneRule} from "@/helpers/validationRule";
import {displayErros} from "@/helpers/displayErros";

const router = useRouter();
const registerErrors = ref<Record<string, string>>({});


const handlerRegister = async (values: GenericObject) => {
    try {
        console.log('Valeurs envoyées:', values); // Ajouter ce journal pour vérifier les données envoyées
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const errorData = await response.json();
            registerErrors.value = displayErros(errorData.errors)
            throw new Error(errorData);
        }
        await router.push('/login');

        const responseData = await response.json();
    } catch (error: any) {
        console.log("Erreur lors de la requête:", error);
    }
}
</script>

<template>
    <div>
        <div class="w-full h-[500px] bg-bottom bg-cover bg-[url('@/assets/images/backgrounds/wallpaper_4.webp')] relative">
            <div class="absolute h-full w-full bg-black/70"/>
            <div class="w-full xl:w-4/6 mx-auto z-30 relative h-full flex flex-col gap-10 justify-center items-center xl:items-start">
                <h1 class="w-full text-4xl text-white font-bold uppercase">
                    S'inscrire
                </h1>
            </div>
        </div>
        <div class="min-h-[73vh] flex items-center py-14">
            <div class="w-full xl:w-4/6 mx-auto mt-10">
                <Form @submit="handlerRegister" class="space-y-8 max-w-xl px-5 xl:px-0">
                    <div class="w-full mb-10" v-if="Object.keys(registerErrors).length">
                        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p v-if="registerErrors.name"> {{registerErrors.name}}</p>
                            <p v-if="registerErrors.email"> {{registerErrors.email}}</p>
                            <p v-if="registerErrors.phone"> {{registerErrors.phone}}</p>
                            <p v-if="registerErrors.password"> {{registerErrors.password}}</p>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="name" class="block text-xl leading-6 text-gray-900">Nom et Prénom</label>
                            <ErrorMessage name="name" class="mt-2 text-xl text-red-500" />
                        </div>
                        <div class="mt-2">
                            <Field
                                :rules="nameRule"
                                id="name"
                                name="name"
                                type="text"
                                class="block w-full p-4 text-xl text-gray-900 border border-[#f4f2f1] rounded-lg bg-[#f4f2f1] focus:ring-[#d1b096] focus:border-[#d1b096]"
                            />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="phone" class="block text-xl leading-6 text-gray-900">Téléphone</label>
                            <ErrorMessage name="phone" class="mt-2 text-xl text-red-500" />
                        </div>
                        <div class="mt-2">
                            <Field
                                :rules="phoneRule"
                                id="phone"
                                name="phone"
                                type="phone"
                                class="block w-full p-4 text-xl text-gray-900 border border-[#f4f2f1] rounded-lg bg-[#f4f2f1] focus:ring-[#d1b096] focus:border-[#d1b096]"
                            />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="email" class="block text-xl leading-6 text-gray-900">Adresse Email</label>
                            <ErrorMessage name="email" class="mt-2 text-xl text-red-500" />
                        </div>
                        <div class="mt-2">
                            <Field
                                :rules="emailRule"
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                class="block w-full p-4 text-xl text-gray-900 border border-[#f4f2f1] rounded-lg bg-[#f4f2f1] focus:ring-[#d1b096] focus:border-[#d1b096]"
                            />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-xl leading-6 text-gray-900">Mot de passe</label>
                            <ErrorMessage name="password" class="mt-2 text-xl text-red-500" />
                        </div>
                        <div class="mt-2">
                            <Field
                                :rules="passwordRule"
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                class="block w-full p-4 text-xl text-gray-900 border border-[#f4f2f1] rounded-lg bg-[#f4f2f1] focus:ring-[#d1b096] focus:border-[#d1b096]"
                            />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password_confirmation" class="block text-xl leading-6 text-gray-900">Confirmer</label>
                            <ErrorMessage name="password_confirmation" class="mt-2 text-xl text-red-500" />
                        </div>
                        <div class="mt-2">
                            <Field
                                :rules="passwordConfirmationRule"
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password_confirmation"
                                autocomplete="current-password"
                                class="block w-full p-4 text-xl text-gray-900 border border-[#f4f2f1] rounded-lg bg-[#f4f2f1] focus:ring-[#d1b096] focus:border-[#d1b096]"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            class="bg-[#d1b096] text-xl px-10 py-5 rounded-sm uppercase font-semibold hover:bg-black hover:text-white"
                        >
                            Sign in
                        </button>

                        <p class="max-w-xl px-5 xl:px-0 mt-2 text-sm text-gray-500">
                            Avez vous déjà un compte ?
                            {{ ' ' }}
                            <RouterLink to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Connectez-vous  </RouterLink>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
