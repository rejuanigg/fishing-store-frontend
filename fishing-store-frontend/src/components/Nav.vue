<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { LogOut, Settings } from '@lucide/vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const isReady = ref(false);
const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 16;
}

function logout() {
  authStore.logout();
  router.push('/');
}

onMounted(() => {
  requestAnimationFrame(() => {
    isReady.value = true;
  });

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header class="sticky top-0 z-50 px-4 pt-3 transition-all duration-500" :class="isScrolled ? 'pb-2' : 'pb-3'">
    <nav class="nav-motion mx-auto flex w-full max-w-6xl items-center justify-between transition-all duration-500" :class="[isReady ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0', isScrolled ? 'rounded-[28px] border border-white/70 bg-white/85 px-3 py-2 shadow-[0_16px_45px_rgba(15,23,42,0.10)] backdrop-blur-xl' : 'rounded-[32px] border border-transparent bg-transparent px-0 py-1']">
      <RouterLink to="/" class="brand-motion group flex min-w-0 items-center gap-3 active:scale-[0.98] transition">
        <div class="relative flex items-center justify-center transition-all duration-500" :class="isScrolled ? 'h-12 w-12' : 'h-14 w-14'">
          <div class="logo-glow absolute inset-0 rounded-3xl bg-blue-300/20 blur-xl transition duration-500 group-hover:bg-blue-300/35"></div>
          <img class="relative z-[1] h-full w-full object-contain drop-shadow-sm transition duration-500 group-hover:scale-105" src="../assets/icon-b.png" alt="Logo">
        </div>

        <div class="hidden min-[430px]:block">
          <span class="block text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">sweet store</span>
          <span class="mt-0.5 block text-sm font-black text-blue-950 transition-all duration-500" :class="isScrolled ? 'opacity-100' : 'opacity-90'">Tienda genérica</span>
        </div>
      </RouterLink>

      <div class="actions-motion flex items-center gap-2">
        <RouterLink v-if="authStore.advancedAccess" to="/admin-panel/dashboard" class="nav-action group flex h-11 items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-3 text-sm font-black text-blue-700 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:bg-blue-600 hover:text-white active:scale-[0.96]">
          <Settings class="h-5 w-5 transition group-hover:rotate-45" />
          <span class="hidden sm:inline">Panel</span>
        </RouterLink>

        <RouterLink v-if="!authStore.isLoggedIn" to="/login" class="nav-action relative flex h-11 items-center justify-center overflow-hidden rounded-2xl bg-blue-600 px-5 text-sm font-black text-white shadow-[0_14px_32px_oklch(0.623 0.214 259.815)] transition hover:bg-blue-700 active:scale-[0.96]">
          <span class="absolute inset-y-0 -left-12 w-10 rotate-12 bg-white/25 blur-sm transition duration-700 hover:left-[120%]"></span>
          <span class="relative">Login</span>
        </RouterLink>

        <button v-else type="button" @click="logout" class="nav-action flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-3 text-sm font-black text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:border-red-100 hover:bg-red-50 hover:text-red-500 active:scale-[0.96]">
          <LogOut class="h-5 w-5" />
          <span class="hidden sm:inline">Salir</span>
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-motion {
  will-change: transform, opacity;
}

.brand-motion {
  animation: nav-fade-in 360ms ease-out both;
}

.actions-motion {
  animation: nav-fade-in 420ms ease-out 80ms both;
}

.nav-action {
  will-change: transform;
}

.logo-glow {
  animation: logo-breathe 4.8s ease-in-out infinite;
}

@keyframes nav-fade-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes logo-breathe {
  0%,
  100% {
    opacity: 0.65;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.04);
  }
}

@media (prefers-reduced-motion: reduce) {
  .brand-motion,
  .actions-motion,
  .logo-glow {
    animation: none;
  }
}
</style>
