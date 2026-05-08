<script setup>
import api from '@/services/api';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCategory } from '@/composables/useCategory';
import Modal from '@/components/Modal.vue';

const route = useRoute();
const router = useRouter();

//Traemos las secciones
const {categories, sections} = useCategory()

//Traer la categoria de la ruta anterior, catId guarda el id a editar.
const catId = Number(route.params.id)

//Traer las categorias de la base de datos
const cat = ref(null)

//Mostrar datos anteriores
const name = ref('');
const selectedSection = ref(null)
////Acá vamos a buscar a la seccion que teniamos seleccionada
watch([categories, sections], ([actualCat, ActualSec])=>{
  if (actualCat.length > 0 || ActualSec.length > 0){
    const found = actualCat.find(c=>c.id === catId)
    if(found){
      cat.value = found;
      name.value = found.name;
      selectedSection.value = found.section_id;
    }
  }
})

//Manejo del modal
const isModalVisible = ref(false);

const openModal = () => isModalVisible.value = true
const closeModal = () => isModalVisible.value = false

//Delete
async function handleDelete(){
  const response = await api.delete(`/categories/${catId}`)
  return router.push('/')
}

// Editar

async function onSubmit(){
  const response = await api.put(`/categories/${catId}`,{
    name:name.value,
    section_id:selectedSection.value
  })

  return router.push('/')
}

</script>

<template>

<section class="min-h-screen w-full flex flex-col justify-between">
  <div class="px-5 pt-6 flex flex-col gap-6">
    <div class="flex flex-col gap-2">

      <h1 class="text-2xl font-bold text-emerald-950">Configuración de Categoría</h1>

      <p class="text-sm leading-6 text-gray-500">Modificá el nombre y la sección asociada a esta categoría.</p>
    </div>

    <form @submit.prevent="onSubmit" class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Sección
        </label>

        <select
          v-model="selectedSection"
          class="h-13 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none focus:border-emerald-500">
          <option v-for="value in sections" :value="value.id">
              {{ value.name }}
          </option>
        </select>

      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Nombre
        </label>

        <input type="text" v-model="name" placeholder="Ej: Cañas de pesca"
        class="h-13 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none focus:border-emerald-500">
      </div>

      <button
        class="h-13 mt-2 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition">
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
