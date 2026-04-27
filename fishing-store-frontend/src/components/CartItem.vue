<script setup>
import { cartStore } from '@/stores/cart';

const cart = cartStore();


</script>

<template>

  <div v-for="product in cart.product"
  class="flex justify-between rounded-xl px-5 items-center  border border-solid border-emerald-500 bg-emerald-200 h-30 w-120">

    <div class=" bg-cover bg-center h-20 w-30">
      <img :src="product.images[0]?.image" class="w-full h-full object-fill rounded-xl">
    </div>

    <div class="flex flex-col m-5 h-2/3 w-4/5 justify-between">
      <div class="itemdetail">
        <div class="w-full">
          <span>Nombre: {{ product.name }}</span>
        </div>
        <div class="category">
          <ul v-for="category in product.categories">
            <li>Categoria: {{ category.name }}</li>
          </ul>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="flex items-center w-30 justify-between">
            <button class="flex items-center justify-center h-5 w-5 rounded-sm bg-emerald-950 text-emerald-50 border border-solid border-emerald-500 hover:bg-emerald-200 hover:text-emerald-950"
            @click="cart.decrement(product.id)">
              -
          </button>
            <span class="text-emerald-950 font-bold">{{ product.quantity }}</span>
            <button class="flex items-center justify-center h-5 w-5 rounded-sm bg-emerald-950 text-emerald-50 border border-solid border-emerald-500 hover:bg-emerald-200 hover:text-emerald-950"
            @click="cart.increment(product.id)">
              +
          </button>
        </div>
        <div class="font-bold">$ {{ product.price }}</div>
      </div>
    </div>

    <div>
      <span class="text-red-300 font-bold cursor-pointer"
      @click="cart.removeProduct(product.id)">
        X
    </span>
    </div>

  </div>
</template>
