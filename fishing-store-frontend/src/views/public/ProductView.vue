<script setup>
import { ref, onMounted, computed } from 'vue';
import { cartStore } from '@/stores/cart';
import ProductCard from '@/components/ProductCard.vue';
import Nav from '@/components/Nav.vue';
import api from '@/services/api';
import FilterProduct from '@/components/FilterProduct.vue';

const cart = cartStore()
const products = ref([]);
const selectedCategory = ref(null);

const getSelect = (id) =>{return selectedCategory.value = id}


onMounted(async()=>{
  const response = await api.get('/products')
  products.value = response.data.data
})


const filterProdByCat =  computed(()=>{
    if (selectedCategory.value === null) {
      return products.value;
    }
    else{
      return products.value.filter(products=>products.categories.some((category => category.id === selectedCategory.value)))
    }
  });

function addCartItem(product) {
  console.log(product)
  cart.addProduct(product);
}

const viewAll = () =>{ return selectedCategory.value = null}

console.log(products)

</script>



<template>
  <Nav></Nav>
  <div class="mt-20 pt-20 flex flex-col items-center">
    <h1 class="text-2xl text-emerald-800 font-bold">Productos</h1>
    <div class="flex justify-center items-start w-full my-20 gap-20">

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-10">
        <ProductCard v-for="product in filterProdByCat" :key="product.id" :product="product" @add-cart="addCartItem"/>
      </div>

      <FilterProduct class="sticky top-24" @send-cat="getSelect" @view-all="viewAll" />

    </div>
  </div>
</template>






<style scoped>

</style>
