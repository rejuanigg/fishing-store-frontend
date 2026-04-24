<script setup>
import { ref, onMounted } from 'vue';
import { cartStore } from '@/stores/cart';
import ProductCard from '@/components/ProductCard.vue';
import Nav from '@/components/Nav.vue';
import api from '@/services/api';

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

  <div class="grid grid-cols-2 sm:grid-cols-3">
    <ProductCard v-for="product in products" :product="product" @add-cart="addCartItem"></ProductCard>
  </div>

</template>



<style scoped>

</style>
