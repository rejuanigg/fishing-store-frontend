<script setup>
import Nav from '@/components/Nav.vue';
import SideBar from '@/components/SideBar.vue';
import { RouterView } from 'vue-router';

</script>

<template>

  <Nav></Nav>

  <div class="w-full h-lvh pt-20 flex">

    <SideBar></SideBar>

    <div class="bg-emerald-50 w-3/4 h-full">
      <main class="h-full w-full flex">
        <RouterView/>
      </main>
    </div>

  </div>


</template>
