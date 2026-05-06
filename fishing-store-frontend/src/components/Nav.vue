<script setup>

import { useAuthStore } from '@/stores/auth';
import { useRouter } from "vue-router";

const authStore = useAuthStore();
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

