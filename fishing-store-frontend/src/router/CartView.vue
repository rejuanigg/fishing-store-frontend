<script setup>
import api from '@/services/api';
import { cartStore } from '@/stores/cart';

const cart = cartStore();


function confirmOrder(){
  api.post('/orders', { products: cart.product.map(p => ({ product_id: p.id, quantity: p.quantity})) })
}
</script>

<template>
  <ul v-for="product in cart.product">
    <li>Nombre: {{ product.name }}</li>
    <br>
    <li>Descripcion: {{ product.description }}</li>
    <br>
    <li>Price: {{ product.price }}</li>
    <br>
    <button @click="cart.decrement(product.id)">-</button>
    <li>Cantidad: {{ product.quantity }}</li>
    <button @click="cart.increment(product.id)">+</button>
    <br>
    <ul v-for="category in product.categories">
      <li>Categoria: {{ category.name }}</li>
    </ul>
  </ul>
  <br>
  <br>
  <span>Total: {{ cart.total }}</span>
  <br>
  <br>
  <button @click="confirmOrder" >Enviar Orden</button>
</template>
