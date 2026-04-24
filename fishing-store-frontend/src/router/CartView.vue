<script setup>
import { cartStore } from '@/stores/cart';
defineEmits(['incremento']);

const cart = cartStore();
console.log(cart.product)
</script>

<template>
  <ul v-for="product in cart.product">
    <li>Nombre: {{ product.name }}</li>
    <br>
    <li>Descripcion: {{ product.description }}</li>
    <br>
    <li>Price: {{ product.price }}</li>
    <br>
    <button @click="('decremento', cart.decrement(product.id))">-</button>
    <li>Cantidad: {{ product.quantity }}</li>
    <button @click="('incremento', cart.increment(product.id))">+</button>
    <br>
    <ul v-for="category in product.categories">
      <li>Categoria: {{ category.name }}</li>
    </ul>
  </ul>
  <span>Total: {{ cart.total }}</span>

</template>
