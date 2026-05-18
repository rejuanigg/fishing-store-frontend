<script setup>
import Modal from '@/components/UI/Modal.vue';
import api from '@/services/api';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/category';

const categoryStore = useCategoryStore()

onMounted(() => categoryStore.fetch())

const sections = computed(() => categoryStore.sections)

const router = useRouter();
const name = ref('');
const sectionId = ref(null);

const isModalVisible = ref(false);
const closeModal = () => isModalVisible.value = false


async function onSubmit(){
  const response = await api.post('/categories',{
    name: name.value,
    section_id: sectionId.value
  })
  return isModalVisible.value = true
}

const modalAction = () => {
  closeModal();
  return router.push('/admin-panel/dashboard');
}

</script>


<template>

  <div class="min-h-screen flex flex-col">

    <div class="px-5 pt-6 pb-20 flex flex-col gap-8">
      <section class="flex flex-col gap-2">
        <h1 class="text-2xl font-bold text-emerald-950">Creá una categoria</h1>
        <p class="text-sm leading-6 text-gray-500">Elige una seccion y crea un nombre para tu nueva seccion</p>
      </section>


      <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-emerald-900 font-semibold">Nombre</label>
          <input v-model="name" placeholder="Introduce el nombre de categoria" class="h-13 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none focus:border-emerald-500" type="text" >
        </div>

        <div class="flex flex-col gap-2">

          <label class="text-emerald-900 font-semibold">Seccion</label>
          <select
                class="h-13 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none focus:border-emerald-500"
                v-model="sectionId" >
                  <option v-for="section in sections" :value="section.id">{{ section.name }}</option>
          </select>
        </div>

        <button class="h-13 mt-2 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition">Guardar</button>
      </form>
    </div>
  </div>

  <Modal
      v-if="isModalVisible"
      variant="success"
      title="Categoria Creada"
      text="La categoria fué creada correctamente, pudes visualizarla desde el panel de administrador"
      confirm-text="Continuar"
      @confirm-action="modalAction"
    />
</template>
