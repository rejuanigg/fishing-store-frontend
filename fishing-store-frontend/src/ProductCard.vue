<script setup>

defineProps(['product'])


</script>

<template>

  <div class="product--card">
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
      <button class="card--foot__add-button">Add</button>
    </div>
  </div>

</template>

<style scoped>


.product--card{
  background-color: antiquewhite;
  width: 300px;
  height: 500px;
  margin: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 5px;
}

.product--card__header{
  background-color: cornsilk;
  height: 60%;
  width: 100%;
}

.product--card__body{
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;

}

.card--body__metrics{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.product--card__foot{
  display: flex;
  justify-content: space-between;
}

.product--name{
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
}

.product--category{
  background-color: aliceblue;
  padding: 5px;
  border-radius: 20px;
}

.product--price{
  font-size: 20px;
}

.card--foot__add-button{
  width: 40%;
}

</style>
