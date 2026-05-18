<script setup>
import api from '@/services/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '@/components/UI/Modal.vue';

const router = useRouter();
const name = ref('');

async function onSubmit() {
  const response = await api.post('/sections', {
    name: name.value
  })

  modal.value = {
    visible: true,
    variant: 'success',
    title: 'Seccion Creada',
    text: 'La sección fué creada correctamente, puedes visualizarla desde el panel de administrador',
    confirmText: 'Continuar',
    action: successModal,
    showCancel:false
  }
}

const modal = ref({
  visible: false,
  variant: 'warning',
  title: '',
  text: '',
  confirmText: '',
  action: null,
  showCancel:true
})

const successModal = () => router.push('/admin-panel/dashboard')


</script>

<template>


  <div class="px-5 pt-6 pb-32 flex flex-col gap-8">

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
</template>
