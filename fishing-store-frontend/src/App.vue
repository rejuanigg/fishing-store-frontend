<script setup>
import { useRoute } from 'vue-router';
import { RouterView } from 'vue-router';
import NavF from './components/NavF.vue';
import Nav from './components/Nav.vue';
import AdminNav from './components/AdminNav.vue';
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const route = useRoute();
const authStore = useAuthStore()

onMounted(async() => {
  if(authStore.token){
    await authStore.fetchMe()
  }
})

</script>

<template>

  <div class="min-h-screen flex flex-col bg-[#F9FAFB]">

    <header class="sticky top-0 z-50 h-16 px-5 border-b bg-white/90 backdrop-blur-md w-full flex items-center justify-between">      <AdminNav  v-if="route.meta.layout === 'shop' " :nav-type="'shop'"></AdminNav>
      <AdminNav  v-else-if="route.meta.layout === 'focus' " :nav-type="'focus'"></AdminNav>
      <AdminNav  v-else-if="route.meta.layout === 'admin' " :nav-type="'admin'"></AdminNav>

      <div v-else class="w-full">
        <Nav></Nav>
      </div>
    </header>

    <main class="flex-1 pb-24 max-w-screen-md mx-auto w-full">
      <transition name="fade" mode="out-in">
        <RouterView />
      </transition>
    </main>

    <nav class="fixed bottom-0 w-full z-50 flex justify-center" >
      <NavF class="w-full max-w-screen-md h-20 px-5 bg-white/90 backdrop-blur-md border-t pb-[env(safe-area-inset-bottom)]" v-if="route.meta.layout !== 'focus' && route.meta.layout !== 'shop'"></NavF>
    </nav>

  </div>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

@import "tailwindcss";
body{
  background-color: #F9FAFB;
  font-family: 'Plus Jakarta Sans';
  overflow-x: hidden;
}

ol,
ul,
menu {
  list-style: none;
}

*{
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>

