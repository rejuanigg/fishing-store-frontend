<script setup>
import api from '@/services/api';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const userId = route.params.id;
const user = ref(null);

const users = async () => {
  const response = await api.get(`/users/${userId}`)
  user.value = response.data.data
}


</script>

<template>
  <div class="min-h-screen bg-gray-50 px-5 pt-8 pb-28 flex flex-col gap-6">

    <section v-if="user" class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold text-emerald-950">
        {{user.name}}
      </h1>

      <p class="text-sm leading-6 text-gray-500">
        Administrá la información y seguridad de tu cuenta.
      </p>
    </section>

    <section class="bg-white rounded-[32px] border border-gray-100 shadow-sm p-5 flex flex-col gap-5">

      <div class="flex flex-col gap-1">
        <h2 class="text-lg font-bold text-emerald-950">
          Información personal
        </h2>

        <p class="text-sm text-gray-500">
          Actualizá tus datos visibles dentro de la cuenta.
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Nombre
        </label>

        <input
          type="text"
          value="Ignacio"
          class="h-13 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-emerald-500"
        >
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Email
        </label>

        <input
          type="email"
          value="ignacio@email.com"
          class="h-13 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-emerald-500"
        >
      </div>

      <button class="mt-2 h-13 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition">
        Guardar información
      </button>

    </section>

    <section class="bg-white rounded-[32px] border border-gray-100 shadow-sm p-5 flex flex-col gap-5">

      <div class="flex flex-col gap-1">
        <h2 class="text-lg font-bold text-emerald-950">
          Seguridad
        </h2>

        <p class="text-sm text-gray-500">
          Cambiá tu contraseña para proteger tu cuenta.
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Contraseña actual
        </label>

        <input
          type="password"
          placeholder="••••••••"
          class="h-13 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-emerald-500"
        >
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Nueva contraseña
        </label>

        <input
          type="password"
          placeholder="••••••••"
          class="h-13 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-emerald-500"
        >
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Confirmar nueva contraseña
        </label>

        <input
          type="password"
          placeholder="••••••••"
          class="h-13 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-emerald-500"
        >
      </div>

      <button class="mt-2 h-13 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition">
        Cambiar contraseña
      </button>

    </section>

    <section class="bg-red-50 border border-red-100 rounded-[32px] p-5 flex flex-col gap-4">

      <div class="flex flex-col gap-1">
        <h2 class="text-lg font-bold text-red-600">
          Sesión
        </h2>

        <p class="text-sm text-red-500 leading-6">
          Cerrá tu sesión actual en este dispositivo.
        </p>
      </div>

      <button class="h-13 rounded-2xl bg-red-500 text-white text-sm font-semibold active:scale-[0.98] transition">
        Cerrar sesión
      </button>

    </section>

  </div>
</template>

