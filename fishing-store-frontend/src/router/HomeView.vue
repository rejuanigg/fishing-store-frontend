<script setup>
import Nav from '@/components/Nav.vue';
import Hero from '@/components/Hero.vue';
import ProductCard from '@/components/ProductCard.vue';
import { ref , onMounted} from 'vue';
import api from '@/services/api';
import { cartStore } from '@/stores/cart';

const cart = cartStore()
const products = ref([]);

onMounted(async()=>{
  const response = await api.get('/products')
  products.value = response.data.data
})

function addCartItem(product) {
  console.log(product.id)
  cart.addProduct(product);
}

</script>

<template>
  <Nav></Nav>

  <Hero></Hero>
  <div class="flex justify-center items-center">
    <div class="w-3/4 grid grid-cols-3 gap-4 mt-50">
      <ProductCard v-for="product in products" :product="product" @add-cart="addCartItem"></ProductCard>
    </div>
  </div>

</template>

<style scoped>

</style>
