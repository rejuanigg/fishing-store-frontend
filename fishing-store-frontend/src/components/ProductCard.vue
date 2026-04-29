<script setup>
import { useAverage } from '@/composables/useAverage';


const { product } = defineProps(['product']);
defineEmits(['addCart', 'incremento', 'decremento']);

const {average} = useAverage(product.califications)

</script>

<template>

  <div class="ring ring-emerald-900/50 shadow-xl flex flex-col justify-between bg-emerald-950 h-100 w-60">

    <div class="border-b-2 border-b-emerald-500  h-3/5 bg-emerald-200">
      <img :src="product.images[0]?.image" class="w-full h-full object-cover">
    </div>

    <div class="h-1/5  w-full p-5 flex flex-col justify-between gap-2">
      <span class="text-lg text-emerald-50 font-bold">{{ product.name }}</span>
      <div class="w-full flex justify-between">
        <span class="text-emerald-50">{{ average }} ⭐</span>
        <span class="text-center w-3/5 bg-emerald-900 border border-emerald-200 text-emerald-50 font-semibold rounded-lg" v-for="category in product.categories">{{ category.name }}</span>
      </div>
    </div>

    <div class="h-1/5 w-full p-5 flex justify-between items-center">
      <span class="font-bold text-lg text-emerald-100">$ {{ product.price }}</span>
      <button class="bg-emerald-400 w-2/5 h-3/5 rounded-xl text-emerald-50 font-bold" @click="$emit('addCart', product)">Add</button>
    </div>
  </div>

</template>

<style scoped>


</style>
