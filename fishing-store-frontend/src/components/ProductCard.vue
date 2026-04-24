<script setup>

defineProps(['product']);
defineEmits(['addCart', 'incremento', 'decremento']);

</script>

<template>

  <div class="w-90 h-100">
    <div class="product--card__header">
      <div class="card--header__image">
        {{ product.image }}
      </div>
    </div>
    <div class="product--card__body">
      <span class="product--name">{{ product.name }}</span>
      <div class="card--body__metrics">
        <span class="product--score">{{ product.score }} ⭐</span>
        <span class="product--category" v-for="category in product.categories">{{ category.name }}</span>
      </div>
      <span class="product--description">{{ product.description }}</span>
    </div>
    <div class="product--card__foot">
      <span class="product--price">$ {{ product.price }}</span>
      <button class="card--foot__add-button" @click="$emit('addCart', product)">Add</button>
    </div>
  </div>

</template>

<style scoped>


</style>
