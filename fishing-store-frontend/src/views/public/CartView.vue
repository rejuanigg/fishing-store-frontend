<script setup>
import CartItem from '@/components/CartItem.vue';
import { cartStore } from '@/stores/cart';
import CartInfo from '@/components/CartInfo.vue';

const cart = cartStore();

</script>

<template>

  <section class=" min-h-screen flex flex-col items-center pt-20 py-20 gap-5">
    <h2 class="text-xl text-emerald-800 font-semibold">Tu Carrito de compras</h2>
    <div class="px-5 flex flex-col gap-5">
      <CartItem></CartItem>
    </div>
    <div class="w-full px-2">
      <CartInfo></CartInfo>
    </div>
  </section>


</template>
