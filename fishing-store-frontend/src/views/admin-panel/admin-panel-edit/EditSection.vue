<script setup>
import api from '@/services/api';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCategory } from '@/composables/useCategory';
import Modal from '@/components/UI/Modal.vue';

const {sections} = useCategory()

const route = useRoute();
const router = useRouter();

const secId = Number(route.params.id)

const sec = ref(null)
const name = ref('');

//Muestra los datos anteriores
watch(sections, (actualValue)=>{
  if (actualValue.length>0){
    const found = actualValue.find(s => s.id === secId);
    if (found){
      sec.value = found
      name.value = found.name
    }
  }
})

//Sube los nuevos datos y muestra un modal de satisfaccion

async function onSubmit(){
  const response = await api.put(`/sections/${secId}`,{
    name:name.value
  })
  modal.value = {
    visible: true,
    variant: 'success',
    title: 'Cambios aplicados',
    text: 'Las modificaciones se aplicaron correctamente. Puedes ver los cambios en el panel de administrador',
    confirmText: 'Continuar',
    action: successModal,
    showCancel:false
  }
}

//Modal

const modal = ref({
  visible: false,
  variant: 'warning',
  title: '',
  text: '',
  confirmText: '',
  action: null,
  showCancel:true
})

// Modal de advetencia

const openSuccessModal = () => {
  modal.value = {
    visible: true,
    variant: 'warning',
    title: 'Está por modificar una sección',
    text: 'Tenga en cuenta los cambios serán visibles para todos los productos ya existentes.',
    confirmText: 'Continuar',
    action: onSubmit
  }
}

//Modal para confirmar eliminacion

const openDeleteModal = () => {
  modal.value = {
    visible: true,
    variant: 'danger',
    title: 'Eliminar sección',
    text: 'Está por borrar una sección. ¿Desea continuar?',
    confirmText: 'Eliminar',
    action: handleDelete,
    showCancel:true
  }
}

const closeModal = () => {
  modal.value.visible = false
}

//Request para borrar la seccion
async function handleDelete(){
  const response = await api.delete(`/sections/${secId}`)
  modal.value = {
    visible: true,
    variant: 'success',
    title: 'Seccion eliminada',
    text: 'La seccion fue eliminada correctamente.',
    confirmText: 'Continuar',
    action: successModal,
    showCancel:true
  }
}

const successModal = () => router.push('/admin-panel/dashboard')

</script>

<template>
<section class="min-h-screen w-full flex flex-col">

  <div class="px-5 pt-6  flex flex-col gap-8">

    <section class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold text-emerald-950">
        Crear Seccion
      </h1>
    </section>

    <form @submit.prevent="openSuccessModal" class="flex flex-col gap-6">
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
      @click="openDeleteModal"
      class="w-full h-13 rounded-2xl border border-red-200 bg-red-50 text-red-600 text-sm font-semibold active:scale-[0.98] transition">
      Eliminar sección
    </button>

  </div>

  <Modal
  v-if="modal.visible"
  :variant="modal.variant"
  :title="modal.title"
  :text="modal.text"
  :confirm-text="modal.confirmText"
  :show-cancel="modal.showCancel"
  @confirm-action="modal.action"
  @close-modal="closeModal"
  />

</section>
</template>

