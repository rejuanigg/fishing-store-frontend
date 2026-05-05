<script setup>

import { cartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const cart = cartStore();
const router = useRouter()

const logout = () => {
  authStore.logout();
  router.push('/');
}

</script>

<template>

<img class="h-20 w-20" src="../assets/icon-b.png"></img>


  <div v-if="authStore.advancedAccess" class="py-3 px-5 border-2 border-dashed border-emerald-300 rounded-lg text-emerald-900">
    <RouterLink to="/admin-panel">
      CONFIG
    </RouterLink>
  </div>

  <div v-else>

  </div>


  <div v-if="!authStore.isLoggedIn" class="py-3 px-5 bg-emerald-300 rounded-lg text-emerald-900">
    <RouterLink to="/login">Login</RouterLink>
  </div>

  <div v-else class="py-3 px-5 bg-emerald-300 rounded-lg text-emerald-900">
    <button @click="logout">Logout</button>
  </div>

  <div class="">
    <RouterLink to="/cart" class="relative inline-block">
      <svg class="text-emerald-900 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
          <span class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-xs bg-amber-600 px-1 rounded-2xl text-emerald-50">{{ cart.count }}</span>
    </RouterLink>
  </div>
<!-- <div @scroll="" class="h-20 top-0 fixed w-full z-5 flex justify-between items-center px-20 overflow-hidden">
<div class="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-transparent via-black/30 to-black/60 pointer-events-none"></div>
<img class="h-20 w-20" src="../assets/icon-b.png"></img>
  <ul class="w-2/4 flex justify-between font-bold">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/products">Products</RouterLink>
  </ul>

  <div v-if="!authStore.isLoggedIn">
    <RouterLink to="/login">Login</RouterLink>
  </div>

  <div v-else>
    <button @click="logout">Logout</button>
  </div>


  <div v-if="authStore.advancedAccess">
    <RouterLink to="/admin-panel">
      CONFIG
    </RouterLink>
  </div>

  <div v-else>

  </div>



</div>
<component is="currentView" /> -->

</template>

