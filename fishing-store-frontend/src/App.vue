<script setup>

import { RouterView } from 'vue-router';
import NavF from './components/NavF.vue';
import Nav from './components/Nav.vue';

</script>

<template>

  <div>

    <header class="h-20 top-0 left-0 border-b object-cover px-5 flex justify-between items-center">
      <Nav></Nav>
    </header>

    <main>
      <RouterView />
    </main>

    <nav class="fixed bottom-0 w-full h-20 px-5 bg-white border-t">
      <NavF></NavF>
    </nav>

  </div>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

@import "tailwindcss";
body{
  background-color: #F9FAFB;
}

ol,
ul,
menu {
  list-style: none;
}

</style>

