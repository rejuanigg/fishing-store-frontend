<script setup>
import { cartStore } from '@/stores/cart';
import { FishingRod } from '@lucide/vue';

const cart = cartStore();

</script>

<template>

<div v-if="cart.product.length === 0" class="flex p-50 w-full items-center justify-center overflow-hidden">
  <div class="flex flex-col justify-center items-center gap-10">
    <FishingRod :size="50" class="text-emerald-500"/>
    <p class="text-lg leading-6 text-gray-500">Aun no tienes productos</p>
  </div>
</div>

<div v-else v-for="product in cart.product" :key="product.id" class="relative bg-white border border-gray-100 rounded-3xl p-4 shadow-sm">
  <div class="flex gap-4">

    <div class="h-24 w-24 shrink-0 rounded-2xl overflow-hidden bg-gray-100">
      <img class="h-full w-full object-cover" :src="product.images[0]?.image">
    </div>

    <div class="flex-1 flex flex-col justify-between">
      <div class="flex flex-col gap-1 pr-6">
        <span class="text-base font-semibold text-emerald-950 leading-5">
          {{ product.name }}
        </span>

        <span class="text-lg font-bold text-emerald-700">
          $ {{ product.price }}
        </span>
      </div>

      <div class="flex items-center justify-between mt-4">
        <div class="flex items-center gap-3 bg-gray-100 rounded-2xl px-3 py-2">
          <button
            class="h-8 w-8 rounded-xl bg-white text-emerald-900 font-bold active:scale-95 transition"
            @click="cart.decrement(product.id)"
          >
            -
          </button>

          <span class="min-w-[20px] text-center text-sm font-bold text-emerald-950">
            {{ product.quantity }}
          </span>

          <button
            class="h-8 w-8 rounded-xl bg-emerald-500 text-white font-bold active:scale-95 transition"
            @click="cart.increment(product.id)"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>

  <button
    class="absolute top-4 right-4 h-8 w-8 rounded-xl bg-red-50 text-red-500 text-sm font-bold active:scale-95 transition"
    @click="cart.removeProduct(product.id)"
  >
    ✕
  </button>
</div>

</template>
