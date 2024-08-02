<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {loadStripe, type Stripe, type StripeElements} from "@stripe/stripe-js";
import PageTitleBanner from "@/components/views/PageTitleBanner.vue";
import {useCartStore} from "@/stores/cart";
import type {CartType} from "@/types/cartType";
import router from "@/router";
import BtnLoading from "@/components/BtnLoading.vue";
import {useUserStore} from "@/stores/user";

const images = import.meta.glob('@/assets/images/shops/*.webp', {eager: true, as: 'url'});
const cart = useCartStore();
const items = ref<CartType[] | null>(null);
const canPay = ref(false);

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const stripe = ref<Stripe | null>(null);
const elements = ref<StripeElements | null>(null);
const error = ref<string | null>(null);
const clientSecret = ref<string | null>(null);

const reorganizeCart = () => {
    if (cart.getItemsLength) {
        items.value = cart.getItems as CartType[] | null;
        if (items.value) {
            items.value.map((item: CartType) => {
                item.imageSrc = images[`${item.imageSrc}`];
            });
            // canPay.value = true;
        }
    }
}

const incrementQuantity = (product: CartType) => {
    cart.addItem(product);
    reorganizeCart();
};

const decrementQuantity = (product: CartType) => {
    cart.removeItem(product.haircut_id);
    reorganizeCart();
};

const removeItem = (product: CartType) => {
    cart.removeItem(product.haircut_id);
    reorganizeCart();
};

const totalSum = computed(() => {
    return cart.getTotalPrice;
});

const paymentCallback = async () => {
    if (useUserStore().isAuthenticated) {
        await initPayment();
    } else {
        await router.push('/login');
    }
}

const initPayment = async () => {

    canPay.value = true;
    stripe.value = await stripePromise;
    elements.value = stripe.value?.elements() as StripeElements;
    const cartContent = cart.getItems?.reduce((acc, item) => {
        acc[item.haircut_id] = item.quantity;
        return acc;
    }, {} as Record<number, number>);



    const cardElement = elements.value?.create('card');
    cardElement?.mount('#card-element');

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useUserStore().getToken}`,
        },
        body: JSON.stringify({cartContent}),
    });

    const data = await response.json();
    clientSecret.value = data.client_secret;
};

const checkout = async () => {
    if (!stripe.value || !elements.value || !clientSecret.value) return;

    const cardElement = elements.value.getElement('card');
    const result = await stripe.value.confirmCardPayment(clientSecret.value, {
        payment_method: {
            card: cardElement!,
            billing_details: {
                name: useUserStore().getName,
            },
        },
    });

    if (result.error) {
        error.value = result.error.message ?? 'An error occurred';
    } else {
        if (result.paymentIntent?.status === 'succeeded') {
            error.value = 'Payment successful!';

            const cartContent = cart.getItems?.reduce((acc, item) => {
                acc[item.haircut_id] = item.quantity;
                return acc;
            }, {} as Record<number, number>);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useUserStore().getToken}`,
                },
                body: JSON.stringify({cartContent}),
            });

            const data = await response.json();

            if (response.ok) {
                useCartStore().clearCart();
                await router.push('/dashboard');
                return;
            } else {
                console.error(data);
            }
        }
    }
};

onMounted(async () => {
    reorganizeCart();

});

</script>

<template>
    <div>
        <PageTitleBanner title="Mon Panier"/>

        <div class="container mx-auto py-24">
            <div v-if="cart.getItemsLength" class="grid grid-cols-1 xl:grid-cols-3 gap-24 px-5">
                <div class="col-span-full xl:col-span-2">
                    <p class="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">Liste</p>

                    <div
                        v-for="product in items" :key="product.haircut_id"
                        class="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
                        <div class="md:w-4/12 w-full">
                            <img
                                :src="product.imageSrc"
                                alt="scared-main" class="hidden sm:inline-flex" height="64" width="64"
                            >
                        </div>
                        <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                            <div class="flex items-center justify-between w-full pt-1">
                                <p class="text-2xl font-black leading-none text-gray-800 dark:text-white">
                                    {{ product.name }}</p>
                                <div class="flex">
                                    <button class="border border-[#D1B096]/40 px-5 py-3"
                                            @click="decrementQuantity(product)"> -
                                    </button>
                                    <div
                                        class="border border-t-[#D1B096] border-b-[#D1B096] border-r-0 border-l-0 px-5 py-3">
                                        {{ product.quantity }}
                                    </div>
                                    <button class="border border-[#D1B096]/40 px-5 py-3"
                                            @click="incrementQuantity(product)"> +
                                    </button>
                                </div>
                            </div>
                            <div class="flex items-center justify-between pt-5">
                                <div class="">
                                    <button class="text-md leading-3 underline text-red-500 cursor-pointer"
                                            @click="removeItem(product)">
                                        Supprimer
                                    </button>
                                </div>
                                <p class="text-base font-black leading-none text-gray-800 dark:text-white">
                                    {{ product.price }} €</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-full xl:col-span-1">
                    <div>
                        <p class="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white"></p>
                        <div class="flex items-center justify-between pt-16">
                            <p class="text-base leading-none text-gray-800 dark:text-white">Sous-total</p>
                            <p class="text-base leading-none text-gray-800 dark:text-white">{{ totalSum }}</p>
                        </div>
                        <div class="flex items-center justify-between pt-5 mt-5">
                            <p class="text-base leading-none text-gray-800 dark:text-white">Tax</p>
                            <p class="text-base leading-none text-gray-800 dark:text-white"> 20%</p>
                        </div>
                    </div>
                    <div class="mt-12">
                        <div class="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                            <p class="text-2xl leading-normal text-gray-800 dark:text-white">Total</p>
                            <p class="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">
                                {{ totalSum }} €</p>
                        </div>
                        <button v-if="!canPay" :disabled="false" class=" w-full bg-[#D1B096] tracking-wide text-sm px-10 py-5 rounded-sm uppercase font-semibold hover:bg-black hover:text-white"
                                @click="paymentCallback()">
                            <BtnLoading/>
                            Valider le panier
                        </button>
                    </div>
                    <div v-if="canPay" class="mt-8">
                        <form id="payment-form" @submit.prevent="checkout">
                            <div id="card-element" class="border-2 border-black p-2"></div>
                            <button
                                class=" w-full bg-black tracking-wide text-sm px-10 py-5 mt-5 rounded-sm uppercase font-semibold hover:bg-black/80 text-white"
                                type="submit"
                            >
                                Payer
                            </button>
                            <p v-if="error">{{ error }}</p>
                        </form>
                    </div>
                </div>
            </div>

            <div v-else class="mt-10 max-w-5xl mx-auto flex flex-col items-center">
                <div class="bg-[#f4f2f1] py-5 mb-5 w-full text-center text-[18px]">
                    Votre panier est vide!
                </div>
                <RouterLink class="bg-[#D1B096] tracking-wide text-sm px-10 py-5 rounded-sm uppercase font-semibold hover:bg-black hover:text-white"
                            to="/products">
                    Retour à la boutique
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
