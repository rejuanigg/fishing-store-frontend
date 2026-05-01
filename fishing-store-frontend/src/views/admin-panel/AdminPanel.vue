<script setup>
import Nav from '@/components/Nav.vue';
import SideBar from '@/components/SideBar.vue';
import { RouterView } from 'vue-router';

</script>

<template>

  <Nav></Nav>

  <div class="w-full min-h-screen flex pt-20">

    <SideBar class="sticky top-20 h-[calc(100vh-5rem)]"></SideBar>

    <div class="bg-emerald-50 flex-1">
      <main class="w-full">
        <RouterView/>
      </main>
    </div>

  </div>


</template>
