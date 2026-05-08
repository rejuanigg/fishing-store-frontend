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

  <div class="w-full flex items-center">

    <img class="h-14 w-14 object-contain shrink-0" src="../assets/icon-b.png"></img>

    <div class="ml-auto flex items-center gap-2">
      <div v-if="authStore.advancedAccess" class="flex items-center gap-2 py-3 px-5 bg-transparent   border border-emerald-100 rounded-2xl">
        <RouterLink to="/admin-panel">
          <Settings />
        </RouterLink>
      </div>

      <div class="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium active:scale-95 transition">

          <RouterLink v-if="!authStore.isLoggedIn" to="/login">Login</RouterLink>
          <button v-else @click="logout">Cerrar Sesíon</button>

      </div>
    </div>
  </div>




</template>

