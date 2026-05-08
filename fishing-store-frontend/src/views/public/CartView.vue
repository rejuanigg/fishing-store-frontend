<script setup>
import CartItem from '@/components/CartItem.vue';
import { cartStore } from '@/stores/cart';
import CartInfo from '@/components/CartInfo.vue';

const cart = cartStore();

</script>

<template>

<section class="min-h-screen pb-40">

  <div class="px-5 pt-6 flex flex-col gap-2">
    <h1 class="text-2xl font-bold text-emerald-950">
      Tu carrito
    </h1>
    <p class="text-sm leading-6 text-gray-500">
      Revisá tus productos antes de continuar con la compra.
    </p>
  </div>

  <div class="px-5 pt-6 flex flex-col gap-4">
    <CartItem />
  </div>

  <div class="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 px-5 py-4">
    <div class="max-w-screen-md mx-auto">
      <CartInfo />
    </div>
  </div>
</section>
</template>
