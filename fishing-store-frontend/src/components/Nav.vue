<script setup>

import { useAuthStore } from '@/stores/auth';
import { Settings } from '@lucide/vue';
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter()

const logout = () => {
  authStore.logout();
  router.push('/');
}

</script>

<template>

  <div class="w-full flex items-center gap-3">

    <RouterLink to="/" class="shrink-0 active:scale-95 transition">
      <img class="h-14 w-14 object-contain" src="../assets/icon-b.png" />
    </RouterLink>

    <div class="ml-auto flex items-center gap-2">

      <RouterLink v-if="authStore.advancedAccess" to="/admin-panel/dashboard" class="h-11 w-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 active:scale-95 transition">
        <Settings class="w-5 h-5" />
      </RouterLink>

      <RouterLink v-if="!authStore.isLoggedIn" to="/login" class="h-11 px-5 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-sm font-semibold active:scale-95 transition">
        Login
      </RouterLink>

    </div>

  </div>

</template>

