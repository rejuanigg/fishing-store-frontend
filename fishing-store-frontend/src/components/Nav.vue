<script setup>
import { cartStore } from '@/stores/cart';

const cart = cartStore();

</script>

<template>
<div class="h-20 top-0 fixed w-full z-2 bg-emerald-50 flex justify-between items-center px-20">
  <img class="h-20 w-20" src="../assets/hellfish.jpg">

  </img>
  <ul class="w-2/4 flex justify-between">
    <li class="">Home</li>
    <li class="">Products</li>
    <li>//////</li>
    <li>//////</li>
  </ul>
  <div class="" >
    <span>{{ cart.count }}</span>
  </div>
</div>
</template>

