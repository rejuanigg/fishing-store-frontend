<script setup>

import { cartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const cart = cartStore();

const hasToken = localStorage.getItem("token")

</script>

<template>
<div class="h-20 top-0 fixed w-full z-2 bg-emerald-50 flex justify-between items-center px-20">
  <img class="h-20 w-20" src="../assets/hellfish.jpg"></img>
  <ul class="w-2/4 flex justify-between">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/products">Products</RouterLink>
  </ul>

  <div v-if="hasToken === null">
    <RouterLink to="/login">Login</RouterLink>
  </div>

  <div v-else>
    <button @click="authStore.logout">Logout</button>
  </div>

  <div class="">
    <RouterLink to="/cart">Cart</RouterLink>
    <span>{{ cart.count }}</span>
  </div>
</div>
<component is="currentView" />
</template>

