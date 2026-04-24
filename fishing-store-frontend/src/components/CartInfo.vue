<script setup>
import api from '@/services/api';
import { cartStore } from '@/stores/cart';

const cart = cartStore();


function confirmOrder(){
  api.post('/orders', { products: cart.product.map(p => ({ product_id: p.id, quantity: p.quantity})) })
}
</script>




<template>
  <div class="flex flex-col justify-center items-center gap-10 bg-emerald-500 h-50 w-100 rounded-xl border-2 border-emerald-800">
    <span class="font-bold text-xl text-emerald-100" >Total: {{ cart.total }}</span>
    <button @click="confirmOrder" class="bg-emerald-100 w-3/4 border-2 border-solid border-emerald-800 rounded-md hover:bg-emerald-700 hover:border-emerald-200 hover:text-emerald-200 text-emerald-900 font-bold" >Enviar Orden</button>
  </div>
</template>
