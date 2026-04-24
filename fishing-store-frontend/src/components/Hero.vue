<script setup>

</script>
<template>
<div class="hero">
  <div class="hero--container">
    <h1 class="text-3xl font-bold underline">Los mejores precios</h1>
    <p class="hero--pharagraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt iure laudantium cupiditate
      recusandae maiores explicabo vero, tempore ullam eaque excepturi
      enim maxime repellat incidunt ab voluptatum provident quibusdam eum neque?</p>
    <button class="bg-sky-500 hover:bg-sky-700 ">Info...</button>
  </div>
</div>
</template>
<style scoped>

.hero {
  height: 70vh;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(../assets/dorado1.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}

.hero--container{
  height: 60%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(15px);
}

.hero--title {
  color: antiquewhite;
}

.hero--pharagraph{
  color: antiquewhite;
  text-align: justify;
}

.hero--button {
  height: 30px;
  width: 120px;
}

</style>
