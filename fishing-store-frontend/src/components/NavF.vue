<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
  <button class="flex flex-col p-2 bg-emerald-200 text-sm">
    ⭐
    <RouterLink to="/">Home</RouterLink>
  </button>
  <button class="flex flex-col p-2 bg-emerald-200 text-sm">
    ⭐
    <RouterLink to="/products">Productos</RouterLink>
  </button>
  <button class="flex flex-col p-2 bg-emerald-200 text-sm">
    ⭐
    <RouterLink to="/">Usuario</RouterLink>
  </button>
  <button class="flex flex-col p-2 bg-emerald-200 text-sm">
    ⭐
    <RouterLink to="/">Whatsapp</RouterLink>
  </button>

</template>
