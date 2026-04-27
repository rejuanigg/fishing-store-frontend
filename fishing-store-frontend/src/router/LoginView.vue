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

  authStore.login(response.data.token);
  localStorage.setItem('token', response.data.token);

  return router.push('/')
}

</script>

<template>

<button @click="authStore.logout">LOGOUT</button>

  <div class="w-full h-svh flex justify-center items-center">
    <div class="bg-emerald-300 h-100 w-100 flex flex-col justify-center gap-5 items-center">
      <div class="w-full flex pl-10">
        <RouterLink to="/"> < Volver</RouterLink>
      </div>
      <span>Inicia Sesion</span>
      <form class="h-2/4 w-3/5 flex flex-col gap-10" @submit.prevent="onSubmit" id="login">
        <div class="flex flex-col w-full h-15">
          <label class="font-bold text-emerald-900" for="login-email">Email</label>
          <input class="bg-emerald-50 h-full p-2 rounded-lg" type="text" placeholder="example@user.com" v-model="email" id="login-email">
        </div>

        <div class="flex flex-col w-full h-15">
          <label class="font-bold text-emerald-900" for="login-password">Contraseña</label>
          <input class="bg-emerald-50 h-full p-2 rounded-lg" type="password" placeholder="password" v-model="password" id="login-password">
        </div>

        <button class="bg-emerald-500 rounded-lg font-bold text-emerald-50">Ok</button>
      </form>

      <div>
        <span>
          No tienes una cuenta?
          <RouterLink to="/register">Registrate</RouterLink>
        </span>
      </div>

    </div>

  </div>
</template>
