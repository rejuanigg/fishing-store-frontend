<script setup>
import { computed, onMounted } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import NavF from './components/NavF.vue';
import Nav from './components/Nav.vue';
import AdminNav from './components/AdminNav.vue';

import { useAuthStore } from './stores/auth';
import Toast from './components/UI/Toast.vue';
import { useToastStore } from './stores/toast';

const toast = useToastStore();
const route = useRoute();
const authStore = useAuthStore();

const layout = computed(() => {
  return route.meta.layout ?? 'default';
});

const isFullPage = computed(() => {
  return route.meta.fullPage === true;
});

const showHeader = computed(() => {
  return route.meta.hideHeader !== true;
});

const showBottomNav = computed(() => {
  return route.meta.showBottomNav === true;
});

const mainPaddingClass = computed(() => {
  return showBottomNav.value ? 'pb-24' : 'pb-6';
});

onMounted(async () => {
  if (authStore.token) {
    await authStore.fetchMe();
  }
});
</script>

<template>
  <div class="min-h-[100dvh] bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50">
    <header v-if="showHeader" class="sticky top-0 z-50 h-16 w-full border-b border-slate-100 bg-white/90 px-5 shadow-[0_8px_24px_rgba(15,23,42,0.03)] backdrop-blur-xl">
      <div class="mx-auto flex h-full w-full max-w-screen-md items-center justify-between">
        <AdminNav v-if="layout === 'shop'" nav-type="shop" />
        <AdminNav v-else-if="layout === 'focus'" nav-type="focus" />
        <AdminNav v-else-if="layout === 'admin'" nav-type="admin" />

        <div v-else class="w-full">
          <Nav />
        </div>
      </div>
    </header>

    <main :class="[isFullPage ? 'min-h-[100dvh] w-full' : 'mx-auto min-h-[calc(100dvh-4rem)] w-full max-w-screen-md bg-slate-50 shadow-[0_0_60px_rgba(15,23,42,0.06)]', isFullPage ? '' : mainPaddingClass]">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <div :key="route.path" :class="isFullPage ? 'min-h-[100dvh]' : 'min-h-[calc(100dvh-4rem)]'">
            <component :is="Component" />
          </div>
        </Transition>
      </RouterView>
    </main>

    <nav v-if="showBottomNav" class="fixed inset-x-0 bottom-0 z-[999] border-t border-slate-100 bg-white/95 shadow-[0_-8px_26px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div class="mx-auto h-[68px] w-full max-w-screen-md px-3 pb-[env(safe-area-inset-bottom)]">
        <NavF class="h-full w-full" />
      </div>
    </nav>
  </div>

  <Toast
    v-if="toast.toast"
    :title="toast.toast.title"
    :text="toast.toast.text"
    :variant="toast.toast.variant"
    @close-modal="toast.hide()"
  />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
@import "tailwindcss";

html {
  background-color: #F9FAFB;
}

body {
  overflow-x: hidden;
  background-color: #F9FAFB;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

button,
input,
select,
textarea {
  font-family: inherit;
}

button,
a,
select {
  -webkit-tap-highlight-color: transparent;
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
  transition: opacity .16s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
