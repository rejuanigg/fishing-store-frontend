<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import api from './services/api';
import ProductCard from './ProductCard.vue';
import Nav from './Nav.vue';
import Hero from './Hero.vue';

const products = ref([]);

onMounted(async()=>{
  const response = await api.get('/products')
  console.log(response.data)
  products.value = response.data.data
})

</script>

<template>

<section class="hero">

</section>

<Nav></Nav>

<Hero></Hero>

<ProductCard v-for="product in products" :product="product">

</ProductCard>

</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  outline: none;
  font-family: "Plus Jakarta Sans", sans-serif;

}

</style>

