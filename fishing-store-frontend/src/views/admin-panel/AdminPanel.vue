<script setup>
import Nav from '@/components/Nav.vue';
import SideBar from '@/components/SideBar.vue';
import { RouterView } from 'vue-router';

</script>

<template>

  <Nav></Nav>

  <div class="bg-red-50 w-full h-lvh pt-20 flex">

    <SideBar></SideBar>

    <div class="bg-red-400 w-3/4 h-full ">
      <main class="pt-20 flex items-center flex-col">
        <RouterView/>
      </main>
    </div>

  </div>


</template>
