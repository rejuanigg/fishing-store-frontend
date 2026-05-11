<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';


const authStore = useAuthStore();



</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-28">

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

        <button class="h-13 rounded-2xl bg-red-50 text-red-600 text-sm font-semibold">
          Cerrar sesión
        </button>
      </section>
    </main>
  </div>
</template>

