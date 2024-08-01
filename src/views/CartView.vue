<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {loadStripe, type Stripe, type StripeElements} from "@stripe/stripe-js";
import PageTitleBanner from "@/components/views/PageTitleBanner.vue";
import {useCartStore} from "@/stores/cart";
import type {CartType} from "@/types/cartType";
import router from "@/router";

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
  stripe.value = await stripePromise;
  elements.value = stripe.value?.elements() as StripeElements;
  const ids = cart.getItems?.map((item) => item.haircut_id);

  const cardElement = elements.value?.create('card');
  cardElement?.mount('#card-element');

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer 2|CA4usmhyRNjsCMtdDxZtBZKrOvuNJvd4QIHI2GPe1dc2523e`,
    },
    body: JSON.stringify({ids}),
  });

  const data = await response.json();
  console.log('data0', data);
  clientSecret.value = data.client_secret;
};

const checkout = async () => {
    console.log('stripe', stripe.value);
    console.log('elements', elements.value);
    console.log('clientSecret', clientSecret.value);
    if (!stripe.value || !elements.value || !clientSecret.value) return;

    const cardElement = elements.value.getElement('card');
    const result = await stripe.value.confirmCardPayment(clientSecret.value, {
        payment_method: {
            card: cardElement!,
        },
    });

    if (result.error) {
        error.value = result.error.message ?? 'An error occurred';
    } else {
        if (result.paymentIntent?.status === 'succeeded') {
            error.value = 'Payment successful!';

            const haircutIds = cart.getItems?.map((item) => item.haircut_id);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 2|CA4usmhyRNjsCMtdDxZtBZKrOvuNJvd4QIHI2GPe1dc2523e`,
                },
                body: JSON.stringify({haircutIds}),
            });

            const data = await response.json();

            if (response.ok) {
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

      <div class="flex items-center hover:text-gray-600 dark:text-white cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="16" height="16"
             viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
             stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <polyline points="15 6 9 12 15 18"/>
        </svg>
        <p class="text-sm pl-2 leading-none dark:hover:text-gray-200">Retour</p>
      </div>

      <div v-if="cart.getItemsLength" class="grid grid-cols-1 xl:grid-cols-3 gap-24 px-5">
        <div class="col-span-full xl:col-span-2">
          <p class="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">Liste</p>

          <div
              v-for="product in items" :key="product.haircut_id"
              class="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
            <div class="md:w-4/12 w-full">
              <img
                  alt="scared-main"
                  class="hidden sm:inline-flex" height="64" :src="product.imageSrc" width="64"
              >
            </div>
            <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
              <div class="flex items-center justify-between w-full pt-1">
                <p class="text-2xl font-black leading-none text-gray-800 dark:text-white">{{ product.name }}</p>
                <div class="flex">
                  <button @click="decrementQuantity(product)" class="border border-[#D1B096]/40 px-5 py-3"> -</button>
                  <div class="border border-t-[#D1B096] border-b-[#D1B096] border-r-0 border-l-0 px-5 py-3">
                    {{ product.quantity }}
                  </div>
                  <button @click="incrementQuantity(product)" class="border border-[#D1B096]/40 px-5 py-3"> +</button>
                </div>
              </div>
              <div class="flex items-center justify-between pt-5">
                <div class="">
                  <button @click="removeItem(product)" class="text-md leading-3 underline text-red-500 cursor-pointer">
                    Supprimer
                  </button>
                </div>
                <p class="text-base font-black leading-none text-gray-800 dark:text-white">{{ product.price }} €</p>
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
              <p class="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">{{ totalSum }} €</p>
            </div>
            <button :disabled="false" v-if="!canPay" @click="paymentCallback()"
                    class=" w-full bg-[#D1B096] tracking-wide text-sm px-10 py-5 rounded-sm uppercase font-semibold hover:bg-black hover:text-white">
              <svg aria-hidden="true" role="status"
                   class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101"
                   fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"/>
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="black"/>
              </svg>
              Valider le panier
            </button>
          </div>
        </div>
      </div>

      <div v-else class="mt-10 max-w-5xl mx-auto flex flex-col items-center">
        <div class="bg-[#f4f2f1] py-5 mb-5 w-full text-center text-[18px]">
          Votre panier est vide!
        </div>
        <RouterLink to="/"
                    class="bg-[#D1B096] tracking-wide text-sm px-10 py-5 rounded-sm uppercase font-semibold hover:bg-black hover:text-white">
          Retour à la boutique
        </RouterLink>
      </div>

                  <div>
                      <form id="payment-form" @submit.prevent="checkout">
                          <div id="card-element"></div>
                          <button type="submit">Payer</button>
                          <p v-if="error">{{ error }}</p>
                      </form>
                  </div>
    </div>
  </div>
</template>

<style scoped>
#card-element {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
}
</style>
