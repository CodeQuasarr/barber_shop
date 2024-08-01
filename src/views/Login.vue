<script setup lang="ts">
import {Field, Form, ErrorMessage, type GenericObject} from 'vee-validate';
import {emailRule, passwordRule} from "@/helpers/validationRule";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";

const errorMessage = ref<string | null>(null);
const router = useRouter();

const onSubmit = async (values: GenericObject) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            const user = await response.json();
            console.log(user.data);
            useUserStore().setAccessToken(user.data.token);
            await router.push('/dashboard');
        } else {
            const data = await response.json();
            errorMessage.value = data.message;
            throw new Error(data.message);
        }
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div>
        <div class="w-full h-[500px] bg-bottom bg-cover bg-[url('@/assets/images/backgrounds/wallpaper_4.webp')] relative">
            <div class="absolute h-full w-full bg-black/70"/>
            <div class="w-full xl:w-4/6 mx-auto z-30 relative h-full flex flex-col gap-10 justify-center items-center xl:items-start">
                <h1 class="w-full text-4xl text-white font-bold uppercase">
                    Se connecter
                </h1>
            </div>
        </div>
        <div class="min-h-[73vh] flex items-center">
            <div class="w-full xl:w-4/6 mx-auto mt-10">
                <Form @submit="onSubmit" class="space-y-8 max-w-xl px-5 xl:px-0">
                    <div v-if="errorMessage && errorMessage.trim()" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {{ errorMessage }}
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="email" class="block text-xl leading-6 text-gray-900">Email adresse</label>
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
                        <button
                            class="bg-[#d1b096] text-xl px-10 py-5 rounded-sm uppercase font-semibold hover:bg-black hover:text-white"
                        >
                            Sign in
                        </button>

                        <p class="max-w-xl px-5 xl:px-0 mt-2 text-sm text-gray-500">
                            Pas encore de compte ?
                            {{ ' ' }}
                            <RouterLink to="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Créer votre compte gratuitement  </RouterLink>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
