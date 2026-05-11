<script setup>
import Nav from '@/components/Nav.vue';
import Hero from '@/components/Hero.vue';
import { ref , onMounted} from 'vue';
import api from '@/services/api';
import { cartStore } from '@/stores/cart';
import OrderCard from '@/components/OrderCard.vue';

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

const orders = ref(null)

onMounted(async()=>{
  const response = await api.get('/orders')
  orders.value = response.data.data
})

</script>

<template>
  <Hero></Hero>
  <OrderCard :orders="orders"></OrderCard>
</template>

<style scoped>

</style>
