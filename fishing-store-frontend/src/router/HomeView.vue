<script setup>
import Nav from '@/Nav.vue';
import Hero from '@/Hero.vue';
import ProductCard from '@/ProductCard.vue';
import { ref , onMounted} from 'vue';
import api from '@/services/api';

const products = ref([]);

onMounted(async()=>{
  const response = await api.get('/products')
  products.value = response.data.data
})
</script>

<template>
<Nav></Nav>
<Hero></Hero>
<ProductCard v-for="product in products" :product="product"></ProductCard>
</template>

<style scoped>

</style>
