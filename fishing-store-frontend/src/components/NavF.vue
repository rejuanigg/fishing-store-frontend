<script setup>
import { RouterLink } from 'vue-router';
import CartIcon from './CartIcon.vue';
import { FishingRod } from '@lucide/vue';

const props = defineProps({
  active: {
    type:Boolean,
    default:true
  }
})

</script>

<template>

  <div v-if="active" class="flex justify-between items-center py-3 w-full">

    <RouterLink to="/" class="flex flex-col p-2 text-sm items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>

      <span>Home</span>
    </RouterLink>
    <RouterLink to="/products" class="flex flex-col p-2 text-sm items-center">
      <FishingRod/>
      <span to="/products">Productos</span>
    </RouterLink>
    <RouterLink to="/cart" class="flex flex-col p-2 text-sm items-center">
      <CartIcon></CartIcon>
      <span>Carrito</span>

    </RouterLink>
    <RouterLink to="/" class=" flex flex-col p-2 text-sm items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span>Whatsapp</span>
    </RouterLink>
  </div>


</template>
