<script setup>
import { cartStore } from '@/stores/cart';

const cart = cartStore();

</script>

<template>

  <div class="relative border-2 gap-4 border-emerald-500 p-5 rounded-lg flex items-center" v-for="product in cart.product">
    <div class=" shrink-0 rounded-lg border-2 border-emerald-400 h-20 w-20">
      <img class="rounded-lg":src="product.images[0]?.image">
    </div>
    <div class="flex flex-1 flex-col items-end py-6 px-10">
      <span class="font-semibold text-emerald-900">{{ product.name }}</span>
      <span>$ {{ product.price }}</span>
      <div class="flex gap-5 items-center">
            <button class="flex items-center justify-center h-5 w-5 rounded-sm bg-emerald-950 text-emerald-50 border border-solid border-emerald-500 hover:bg-emerald-200 hover:text-emerald-950"
            @click="cart.decrement(product.id)">
              -
            </button>
            <span class="text-emerald-950 font-bold">{{ product.quantity }}</span>
            <button class="flex items-center justify-center h-5 w-5 rounded-sm bg-emerald-950 text-emerald-50 border border-solid border-emerald-500 hover:bg-emerald-200 hover:text-emerald-950"
            @click="cart.increment(product.id)">
              +
            </button>
      </div>
    </div>
<button
    class="absolute top-2 right-2 text-amber-600 hover:text-red-700 font-bold leading-none p-1"
    @click="cart.removeProduct(product.id)"
  >
    ✕
  </button>
  </div>

</template>
