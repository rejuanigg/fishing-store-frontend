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
  <form @submit.prevent="onSubmit" id="login">
    <input type="text" placeholder="example@user.com" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button>Ok</button>
  </form>
</template>
