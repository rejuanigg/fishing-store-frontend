<script setup>
import api from '@/services/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');

const router = useRouter();

async function onSubmit(){
  const response = await api.post('/register',{
    name:name.value,
    email:email.value,
    password:password.value
  })
  return router.push('/login')
}

</script>

<template>

  <div class=" bg-emerald-50 w-full min-h-screen flex flex-col pt-10 items-center">
      <div class="w-full flex pl-10 text-emerald-900">
        <RouterLink to="/"> < Volver</RouterLink>
      </div>
      <span class="text-emerald-900">Bienvenido! Registrate</span>
      <form class=" w-full px-10 flex flex-col gap-10" @submit.prevent="onSubmit" id="login">

        <div class="flex flex-col w-full ">
          <label class="font-bold text-emerald-900" for="">Nombre</label>
          <input class="border-2 border-emerald-500 bg-emerald-50 min-h-[44px] p-2 rounded-lg" type="text" placeholder="Nombre" v-model="name">
        </div>

        <div class="flex flex-col w-full ">
          <label class="font-bold text-emerald-900" for="login-email">Email</label>
          <input class="border-2 border-emerald-500 bg-emerald-50 min-h-[44px] p-2 rounded-lg" type="text" placeholder="example@user.com" v-model="email" id="login-email">
        </div>

        <div class="flex flex-col w-full">
          <label class="font-bold text-emerald-900" for="login-password">Contraseña</label>
          <input class="border-2 border-emerald-500 bg-emerald-50 min-h-[44px] p-2 rounded-lg" type="password" placeholder="password" v-model="password" id="login-password">
        </div>




        <button class="bg-emerald-500 py-2 rounded-lg font-bold text-emerald-50">Ok</button>
      </form>

      <div>
        <span class="text-emerald-900">
          Tienes una cuenta?
          <RouterLink class="font-semibold" to="/login">Ingresá</RouterLink>
        </span>
      </div>


  </div>

</template>
