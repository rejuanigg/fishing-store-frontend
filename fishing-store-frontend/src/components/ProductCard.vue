<script setup>
import { useAverage } from '@/composables/useAverage';


const { product } = defineProps(['product']);
defineEmits(['addCart', 'incremento', 'decremento']);

const {average} = useAverage(product.califications)

</script>

<template>

  <div class="border-2 border-emerald-500 flex flex-col justify-between bg-emerald-100 h-120 w-80 rounded-xl">

    <div class="border-b-2 border-b-emerald-500 rounded-t-xl h-2/5 bg-emerald-200">
      <img :src="product.images[0]?.image" class="w-full h-full rounded-t-xl object-cover">
    </div>

    <div class="h-2/5  w-full p-5 flex flex-col justify-between">
      <span class="text-2xl text-emerald-900 font-bold">{{ product.name }}</span>
      <div class="w-full flex justify-between">
        <span class="product--score">{{ average }} ⭐</span>
        <span class="text-center w-3/5 bg-emerald-200 border border-emerald-600 text-emerald-700 rounded-xl" v-for="category in product.categories">{{ category.name }}</span>
      </div>
      <span class="product--description">{{ product.description }} lore</span>
    </div>

    <div class="h-1/5 w-full p-5 flex justify-between items-center">
      <span class="font-bold text-xl text-emerald-800">$ {{ product.price }}</span>
      <button class="bg-emerald-400 w-2/4 h-3/5 rounded-xl text-emerald-50 font-bold" @click="$emit('addCart', product)">Add</button>
    </div>
  </div>

</template>

<style scoped>


</style>
