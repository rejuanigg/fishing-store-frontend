<script setup>
import CartItem from '@/components/CartItem.vue';
import api from '@/services/api';
import { cartStore } from '@/stores/cart';

const cart = cartStore();


function confirmOrder(){
  api.post('/orders', { products: cart.product.map(p => ({ product_id: p.id, quantity: p.quantity})) })
}
</script>

<template>
  <CartItem></CartItem>

  <br>
  <br>
  <span>Total: {{ cart.total }}</span>
  <br>
  <br>
  <button @click="confirmOrder" >Enviar Orden</button>
</template>
