<script setup>
import { computed, onMounted } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import NavF from './components/NavF.vue';
import Nav from './components/Nav.vue';
import AdminNav from './components/AdminNav.vue';

import { useAuthStore } from './stores/auth';

const route = useRoute();
const authStore = useAuthStore();

const layout = computed(() => route.meta.layout);

const showBottomNav = computed(() => {
  return route.meta.showBottomNav === true;
});

onMounted(async () => {
  if (authStore.token) {
    await authStore.fetchMe();
  }
});
</script>

<template>
  <div class="min-h-screen bg-[#F9FAFB]">

    <header class="sticky top-0 z-50 h-16 w-full border-b border-gray-100 bg-white/90 px-5 backdrop-blur-md">
      <div class="mx-auto flex h-full w-full max-w-screen-md items-center justify-between">

        <AdminNav v-if="layout === 'shop'" nav-type="shop" />
        <AdminNav v-else-if="layout === 'focus'" nav-type="focus" />
        <AdminNav v-else-if="layout === 'admin'" nav-type="admin" />

        <div v-else class="w-full">
          <Nav />
        </div>

      </div>
    </header>

    <main class="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-screen-md pb-28">
      <RouterView />
    </main>

    <nav v-if="showBottomNav" class="fixed bottom-0 left-0 right-0 z-[999] flex justify-center">
      <NavF class="h-20 w-full max-w-screen-md border-t border-gray-100 bg-white/90 px-5 pb-[env(safe-area-inset-bottom)] backdrop-blur-md" />
    </nav>

  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
@import "tailwindcss";

body {
  overflow-x: hidden;
  background-color: #F9FAFB;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

ol,
ul,
menu {
  list-style: none;
}

* {
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
