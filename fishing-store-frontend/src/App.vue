<script setup>
import { ref } from 'vue';
import ProductCard from './ProductCard.vue';
import Nav from './Nav.vue';

const products = ref([
  {
    name:"Caster Snipper",
    section:"Cañas",
    category:"Fibra de Vidrio",
    description:"Its good",
    score:"8.9",
    price:9999,
    image:2
  },
  {
    name:"Caster Trigger",
    section:"Cañas",
    category:"Aluminio",
    description:"Its sooooo goood",
    score:"9.9",
    price:999229,
    image:2
  },
  {
    name:"Caster Reel",
    section:"Reel",
    category:"Grafito",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque perspiciatis ",
    score:"7.9",
    price:123,
    image:2
  }
]);


</script>

<template>

<section class="hero">

</section>

<Nav></Nav>

<ProductCard v-for="product in products" :product="product">

</ProductCard>

</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  outline: none;
}

</style>
