<script setup>
import { cartStore } from '@/stores/cart';

const cart = cartStore();


</script>

<template>
  <div v-for="product in cart.product"
  class="flex rounded-xl px-10 items-center justify-between bg-red-200 h-50 w-200">
    <div style="background-image: url('../assets/dorado1.jpg')" class="bg-cover bg-center rounded-xl h-4/5 w-50 bg-red-500">

    </div>
    <div class="flex flex-col px-20 py-7 h-40 w-4/5 justify-between bg-slate-500">
      <div class="itemdetail">
        <div class="text-xl">Nombre: {{ product.name }}</div>
        <div class="category">
          <ul v-for="category in product.categories">
            <li>Categoria: {{ category.name }}</li>
          </ul>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="flex items-center w-30 justify-between">
            <button class="flex items-center justify-center h-5 w-5 rounded-sm bg-gray-700 hover:bg-slate-400" @click="cart.decrement(product.id)">-</button>
            <span>{{ product.quantity }}</span>
            <button class="flex items-center justify-center h-5 w-5 rounded-sm bg-gray-700 hover:bg-slate-400" @click="cart.increment(product.id)">+</button>
        </div>
        <div class="price">$ {{ product.price }}</div>
      </div>
    </div>
  </div>
</template>
