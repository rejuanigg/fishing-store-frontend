<script setup>
import Nav from '@/components/Nav.vue';
import SideBar from '@/components/SideBar.vue';
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const toggle = ref(false)

const toggleOpen = () => { toggle.value = true }
const toggleClose = () => { toggle.value = false }

</script>

<template>

  <main class="w-full">
    <span @click="toggleOpen">Opciones</span>
    <RouterView/>
  </main>

  <div v-if="toggle === true">
    <div class="absolute inset-0 bg-black/30 z-40"></div>
      <SideBar @toggle-close="toggleClose" />
  </div>


</template>
