<script setup>
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password =  ref('');

const router = useRouter();
const authStore = useAuthStore();

async function onSubmit(){
  const response = await api.post('/login', {
    email:email.value,
    password:password.value,
  })

  authStore.login(response.data.token, response.data.role);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('role', response.data.role);
  return router.push('/')
}

</script>

<template>

  <div class="bg-emerald-100 min-h-screen w-full flex flex-col pt-20 items-center">

    <span class="text-emerald-900">Inicia Sesion</span>

    <form class=" px-10 w-full flex flex-col gap-10" @submit.prevent="onSubmit" id="login">

      <div class="flex flex-col w-full ">
        <label class="font-bold text-emerald-900" for="login-email">Email</label>
        <input class="border-2 border-emerald-500 bg-emerald-50 min-h-[44px] p-2 rounded-lg" type="text" placeholder="example@user.com" v-model="email" id="login-email">
      </div>

      <div class="flex flex-col w-full ">
        <label class="font-bold text-emerald-900" for="login-password">Contraseña</label>
        <input class="border-2 border-emerald-500 bg-emerald-50 min-h-[44px] p-2 rounded-lg" type="password" placeholder="password" v-model="password" id="login-password">
      </div>

      <button class="bg-emerald-500 rounded-lg font-bold text-emerald-50 p-2">Ok</button>

    </form>

    <div class="pt-5">

      <span class="text-emerald-900">
        No tienes una cuenta?
        <RouterLink class="font-semibold" to="/register">Registrate Aquí</RouterLink>
      </span>

    </div>

  </div>
</template>
