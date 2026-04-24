<script setup>
import CartItem from '@/components/CartItem.vue';
import api from '@/services/api';
import { cartStore } from '@/stores/cart';
import CartInfo from '@/components/CartInfo.vue';

const cart = cartStore();

function confirmOrder(){
  api.post('/orders', { products: cart.product.map(p => ({ product_id: p.id, quantity: p.quantity})) })
}
</script>

<template>
  <div class="flex justify-between gap-15 flex-col items-center py-10 px-60 bg-emerald-50">
    <h1 class="font-bold text-2xl">Cart</h1>
    <div class="flex justify-around gap-50">
      <div class="flex flex-col gap-3">
        <CartItem></CartItem>
      </div>
      <div>
        <CartInfo></CartInfo>
      </div>
    </div>
  </div>


</template>
