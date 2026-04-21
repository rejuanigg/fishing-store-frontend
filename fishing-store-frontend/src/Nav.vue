<script setup>
defineProps(['cartCounter']);
</script>

<template>
<div class="nav--container">
  <div class="nav--container__icon">

  </div>
  <ul class="nav--container__routes">
    <li class="route--link">Home</li>
    <li class="route--link">Products</li>
  </ul>
  <div class="cart--counter">
    <p>1</p>
  </div>
</div>
</template>

<style scoped>
.nav--container{
  background-color: antiquewhite;
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.nav--container__icon{
  background-color: aliceblue;
  height: 50px;
  width: 50px;
}

.nav--container__routes{
  display: flex;
  align-items: center;
  gap: 20px;
}

.cart--counter{
  background-color: aliceblue;
  height: 20px;
  width: 20px;
}

</style>
