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

<section v-if="!authStore.isLoggedIn" class="px-5 pt-8 pb-28 flex flex-col gap-6">

  <div class="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm flex flex-col items-center text-center gap-5">

    <div class="h-20 w-20 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600">

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-9">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>

    </div>

    <div class="flex flex-col gap-2">

      <h1 class="text-2xl font-bold text-emerald-950">
        Iniciá sesión
      </h1>

      <p class="text-sm leading-6 text-gray-500 max-w-[280px]">
        Accedé a tu cuenta para ver tus pedidos, actualizar tus datos y seguir el estado de tus compras.
      </p>

    </div>

    <div class="w-full flex flex-col gap-3">

      <RouterLink to="/login" class="h-13 rounded-2xl bg-emerald-500 text-white text-sm font-semibold flex items-center justify-center active:scale-[0.98] transition">
        Iniciar sesión
      </RouterLink>

      <RouterLink to="/register" class="h-13 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-semibold flex items-center justify-center active:scale-[0.98] transition">
        Crear cuenta
      </RouterLink>

    </div>

  </div>

  <section class="bg-emerald-950 rounded-[32px] p-6 text-white flex flex-col gap-4">

    <div class="flex flex-col gap-2">

      <span class="text-sm font-semibold text-emerald-200">
        ¿Por qué crear una cuenta?
      </span>

      <h2 class="text-xl font-bold leading-tight">
        Comprá más rápido y seguí tus pedidos.
      </h2>

    </div>

    <div class="flex flex-col gap-3">

      <div class="flex items-center gap-3">
        <div class="h-9 w-9 rounded-2xl bg-white/10 flex items-center justify-center text-sm font-bold">1</div>
        <span class="text-sm text-emerald-100">Guardá tus datos de cuenta.</span>
      </div>

      <div class="flex items-center gap-3">
        <div class="h-9 w-9 rounded-2xl bg-white/10 flex items-center justify-center text-sm font-bold">2</div>
        <span class="text-sm text-emerald-100">Consultá el estado de tus pedidos.</span>
      </div>

      <div class="flex items-center gap-3">
        <div class="h-9 w-9 rounded-2xl bg-white/10 flex items-center justify-center text-sm font-bold">3</div>
        <span class="text-sm text-emerald-100">Accedé a futuras promociones.</span>
      </div>

    </div>

  </section>

</section>

  <section v-else class="min-h-screen bg-gray-50 pb-28">

    <section  class="bg-emerald-500 px-5 pt-12 pb-8 rounded-b-[40px] text-white">
      <div class="flex items-center gap-4 px-20">
        <div class="flex flex-col gap-1">
          <span class="text-sm opacity-80">Bienvenido</span>
          <h1 class="text-2xl font-bold">{{authStore.name}}</h1>

        </div>
      </div>

      </section>

    <main class="px-5 pt-6 flex flex-col gap-6">

      <section class="bg-white rounded-[28px] p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-bold text-emerald-950">Información Personal</h2>
            <p class="text-sm text-gray-500">Datos principales del usuario.</p>
          </div>

        </div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</span>
            <span class="text-sm text-emerald-950">{{authStore.email}}</span>
          </div>
        </div>
      </section>

      <section class="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm flex flex-col gap-4">
        <div>
          <h2 class="text-lg font-bold text-emerald-950">Seguridad</h2>
          <p class="text-sm text-gray-500 mt-1">Administrá tu cuenta.</p>
        </div>

        <RouterLink to="/user/edit" class="flex justify-center items-center h-13 rounded-2xl bg-gray-100 text-gray-700 text-sm font-semibold text-left px-5">
          Modificar datos personales
        </RouterLink>

        <button @click="logout" class="h-11 px-5 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-95 transition">
          Cerrar sesión
        </button>
      </section>
    </main>
  </section>
</template>

