<script setup>
import { cartStore } from '@/stores/cart';
import { useFormatPrice } from '@/composables/useFormatPrice';

import { Minus, Plus, Trash, Trash2Icon } from '@lucide/vue';

const cart = cartStore();
const { formatPrice } = useFormatPrice();

//Lo que hice acá es obtener la imagen del producto, pero la diferencia es que le seteo algo por si no llega a llegar la imagen correctamente
const getProductImage = (product) => {
  return product.images?.[0]?.image ?? new URL('../assets/1.png', import.meta.url).href;
};

</script>

<template>
  <article v-for="product in cart.product" :key="product.id" class="group overflow-hidden rounded-[30px] border border-blue-100/80 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.06)] transition active:scale-[0.99]">

    <div class="flex gap-4 p-4">

      <button class="h-24 w-24 shrink-0 overflow-hidden rounded-[24px] bg-blue-50" @click="$router.push(`/products/${product.id}`)">
        <img :src="getProductImage(product)" :alt="product.name" class="h-full w-full object-cover transition duration-300 group-active:scale-105">
      </button>

      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-3">
          <button class="min-w-0 text-left" @click="$router.push(`/products/${product.id}`)">
            <h3 class="line-clamp-2 text-sm font-black leading-5 text-blue-950">
              {{ product.name }}
            </h3>

            <p class="mt-2 text-lg font-black tracking-tight text-blue-700">
              {{ formatPrice(product.price) }}
            </p>
          </button>

          <button @click="cart.removeProduct(product.id)" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-500 transition active:scale-[0.95]">
            <Trash class="h-4 w-4" />
          </button>
        </div>

        <div class="mt-4 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2 rounded-2xl bg-slate-50 p-1.5 ring-1 ring-slate-100">
            <button @click="cart.decrement(product.id)" class="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-blue-950 shadow-sm transition active:scale-[0.95]">
              <Minus class="h-4 w-4" />
            </button>

            <span class="min-w-[28px] text-center text-sm font-black text-blue-950">
              {{ product.quantity }}
            </span>

            <button @click="cart.increment(product.id)" class="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500 text-white shadow-sm transition active:scale-[0.95]">
              <Plus class="h-4 w-4" />
            </button>
          </div>

          <div class="text-right">
            <span class="block text-[11px] font-black uppercase tracking-wide text-slate-400">
              Subtotal
            </span>

            <span class="block text-sm font-black text-blue-950">
              {{ formatPrice(product.price * product.quantity) }}
            </span>
          </div>
        </div>
      </div>

    </div>

  </article>
</template>
