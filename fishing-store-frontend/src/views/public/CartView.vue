<script setup>
import CartItem from '@/components/CartItem.vue';
import { cartStore } from '@/stores/cart';
import CartInfo from '@/components/CartInfo.vue';
import Nav from '@/components/Nav.vue';

const cart = cartStore();

</script>

<template>
<Nav></Nav>

  <div class="mt-20 flex justify-between gap-15 flex-col items-center py-10 px-60 bg-emerald-50">
    <h1 class="font-bold text-2xl">Cart</h1>
    <div v-if="cart.product.length>0" class="flex justify-around gap-50">
      <div class="flex flex-col gap-3">
        <CartItem></CartItem>
      </div>
      <div>
        <CartInfo></CartInfo>
      </div>
    </div>

    <div v-else>
      <p>No has añadido ningun producto aún.</p>
    </div>
  </div>

  <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6 stroke-blue-500 fill-none"> <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
</template>
