<script setup>
import { useRoute } from 'vue-router';
import { RouterView } from 'vue-router';
import NavF from './components/NavF.vue';
import Nav from './components/Nav.vue';
import AdminNav from './components/AdminNav.vue';

const route = useRoute();


</script>

<template>

  <div>

    <header >
      <AdminNav class="h-20 top-0 left-0 border-b object-cover px-5 flex justify-between items-center" v-if="route.meta.layout === 'shop' " :nav-type="'shop'"></AdminNav>
      <AdminNav class="h-20 top-0 left-0 border-b object-cover px-5 flex justify-between items-center" v-else-if="route.meta.layout === 'focus' " :nav-type="'focus'"></AdminNav>
      <AdminNav  v-else-if="route.meta.layout === 'admin' " :nav-type="'admin'"></AdminNav>

      <div v-else class="h-20 top-0 left-0 border-b object-cover px-5 flex justify-between items-center">
        <Nav></Nav>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <nav >
      <NavF class="fixed bottom-0 w-full h-20 px-5 bg-white border-t" v-if="route.meta.layout !== 'focus' && route.meta.layout !== 'shop'"></NavF>
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

