<script setup>
import api from '@/services/api';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCategory } from '@/composables/useCategory';
import Modal from '@/components/Modal.vue';

const {sections} = useCategory()

const route = useRoute();
const router = useRouter();

const secId = Number(route.params.id)

const sec = ref(null)
const name = ref('');

watch(sections, (actualValue)=>{
  if (actualValue.length>0){
    const found = actualValue.find(s => s.id === secId);
    if (found){
      sec.value = found
      name.value = found.name
    }
  }
})

async function onSubmit(){
  const response = await api.put(`/sections/${secId}`,{
    name:name.value
  })

  return router.push('/')
}

const isModalVisible = ref(false);

const openModal = () => isModalVisible.value = true
const closeModal = () => isModalVisible.value = false

async function handleDelete(){
  const response = await api.delete(`/sections/${secId}`)
  return router.push('/')
}

</script>

<template>
<section class="min-h-screen w-full flex flex-col">

  <div class="px-5 pt-6  flex flex-col gap-8">

    <section class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold text-emerald-950">
        Crear Seccion
      </h1>
    </section>

    <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">Nombre</label>
        <input v-model="name" type="text" placeholder="Ej: Accesorios" class="h-13 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none focus:border-emerald-500">
      </div>
      <button class="h-13 mt-2 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition">
        Guardar cambios
      </button>

    </form>
  </div>

  <div class="px-5 pb-28 pt-10">
    <button
      @click="openModal"
      class="w-full h-13 rounded-2xl border border-red-200 bg-red-50 text-red-600 text-sm font-semibold active:scale-[0.98] transition">
      Eliminar categoría
    </button>

  </div>

  <Modal
    v-if="isModalVisible"
    text="Estas por borrar una categoria, ¿Desea continuar?"
    type="actionCaution"
    action="Eliminar"
    @close-modal="closeModal"
    @action="handleDelete"
  />

</section>
</template>

