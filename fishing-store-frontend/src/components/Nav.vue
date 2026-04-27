<script setup>
import CartView from '@/router/CartView.vue';
import HomeView from '@/router/HomeView.vue';
import ProductView from '@/router/ProductView.vue';
import { cartStore } from '@/stores/cart';
import { computed, ref } from 'vue';

const cart = cartStore();

const routes = {
  '/': HomeView,
  '/products': ProductView,
  '/cart':CartView
}

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', ()=>{
  currentPath.value = window.location.hash;
})

const currentView = computed(()=>{
  return routes[currentPath.value.slice(1)||'/|| NotFound']
})

</script>

<template>
<div class="h-20 top-0 fixed w-full z-2 bg-emerald-50 flex justify-between items-center px-20">
  <img class="h-20 w-20" src="../assets/hellfish.jpg">

  </img>
  <ul class="w-2/4 flex justify-between">
    <a href="/">Home</a>
    <a href="/products">Productos</a>
  </ul>
  <div class="">
    <a href="/cart">Carrito</a>
    <span>{{ cart.count }}</span>
  </div>
</div>
<component is="currentView" />
</template>

