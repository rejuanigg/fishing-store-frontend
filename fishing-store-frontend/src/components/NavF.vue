<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
  active: {
    type:Boolean,
    default:true
  }
})

</script>

<template>

  <div v-if="active" class="flex justify-between items-center py-3 w-full">

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
  </div>


</template>
