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
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="Nombre" v-model="name">
    <input type="text" placeholder="example@user.com" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button>Ok</button>
  </form>
</template>
