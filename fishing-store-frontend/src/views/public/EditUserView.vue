<script setup>
import Modal from '@/components/UI/Modal.vue';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const auth = useAuthStore();

const router = useRouter();

const name = ref(auth.name);
const email = ref(auth.email);

watch(() => [auth.name, auth.email], ([newName, newEmail]) => {
  name.value = newName
  email.value = newEmail
})

const update = async()=>{
  await api.patch('/edit_profile',{
    name:name.value,
    email:email.value
  });
  modal.value = {
    visible: true,
    variant: 'success',
    title: 'Sus datos se han modificado correctamente',
    text: 'Puede verificar sus datos nuevamente ingresando a su perfil.',
    confirmText: 'Continuar',
    action: successModal,
    showCancel:true
  }
}

//Actualizar contraseña

const actualPassword = ref(null);
const newPassword = ref(null);
const newPasswordConfirm = ref(null);

const changePassword = async()=>{
  await api.patch('/password',{
    actual_password:actualPassword.value,
    new_password:newPassword.value,
    new_password_confirmation:newPasswordConfirm.value
  })
  modal.value = {
    visible: true,
    variant: 'success',
    title: 'Contraseña modificada',
    text: 'La contraseña fue modificada correctamente.',
    confirmText: 'Continuar',
    action: successModal,
    showCancel:true
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

const openWarningPasswordModal = () => {
  modal.value = {
    visible: true,
    variant: 'warning',
    title: 'Está por cambiar su contraseña',
    text: 'IMPORTANTE: Recuerde su nueva contraseña, sin ella no podrá volver a acceder.',
    confirmText: 'Continuar',
    action: changePassword
  }
}
const openWarningProfileModal = () => {
  modal.value = {
    visible: true,
    variant: 'warning',
    title: 'Está modificando sus datos personales',
    text: 'IMPORTANTE: Si usted modificó su correo electronico, recuerdelo, ya que sin el no podrá volver a acceder a la página',
    confirmText: 'Continuar',
    action: update
  }
}

const closeModal = () => {
  modal.value.visible = false
}

const successModal = () => router.push('/')


</script>

<template>
  <div class="min-h-screen bg-gray-50 px-5 pt-8 pb-28 flex flex-col gap-6">

    <section class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold text-emerald-950">
        Gestioná tu cuenta
      </h1>

      <p class="text-sm leading-6 text-gray-500">
        Administrá la información y seguridad de tu cuenta.
      </p>
    </section>

    <section class="bg-white rounded-[32px] border border-gray-100 shadow-sm p-5">
  <form @submit.prevent="openWarningProfileModal" class="flex flex-col gap-6">

    <div class="flex flex-col gap-1">
      <h2 class="text-lg font-bold text-emerald-950">
        Información personal
      </h2>

      <p class="text-sm leading-6 text-gray-500">
        Actualizá los datos asociados a tu cuenta.
      </p>
    </div>

    <div class="flex flex-col gap-5">

      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Nombre
        </label>

        <input
          v-model="name"
          type="text"
          placeholder="Tu nombre"
          class="h-13 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:bg-white"
        >
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Email
        </label>

        <input
          v-model="email"
          type="email"
          placeholder="tuemail@email.com"
          class="h-13 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:bg-white"
        >
      </div>

    </div>

    <div class="flex flex-col gap-3 pt-2">
      <button
        class="h-13 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition"
      >
        Guardar cambios
      </button>

      <p class="text-xs text-center text-gray-400">
        Los cambios se aplicarán inmediatamente en tu cuenta.
      </p>
    </div>

  </form>
</section>

    <section class="bg-white rounded-[32px] border border-gray-100 shadow-sm p-5 flex flex-col gap-5">
      <form @submit.prevent="openWarningPasswordModal" class="flex flex-col gap-6">

        <div class="flex flex-col gap-1">
          <h2 class="text-lg font-bold text-emerald-950">
            Seguridad
          </h2>

          <p class="text-sm text-gray-500">
            Cambiá tu contraseña para proteger tu cuenta.
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-emerald-900">
            Contraseña actual
          </label>

          <input
          v-model="actualPassword"
            type="password"
            class="h-13 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-emerald-500"
          >
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-emerald-900">
            Nueva contraseña
          </label>

          <input
            v-model="newPassword"
            type="password"
            class="h-13 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-emerald-500"
          >
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-emerald-900">
            Confirmar nueva contraseña
          </label>

          <input
          v-model="newPasswordConfirm"
            type="password"
            class="h-13 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-emerald-500"
          >
        </div>

        <button class="mt-2 h-13 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition">
          Cambiar contraseña
        </button>
      </form>

    </section>

    <section class="bg-red-50 border border-red-100 rounded-[32px] p-5 flex flex-col gap-4">

      <div class="flex flex-col gap-1">
        <h2 class="text-lg font-bold text-red-600">
          Sesión
        </h2>

        <p class="text-sm text-red-500 leading-6">
          Cerrá tu sesión actual en este dispositivo.
        </p>
      </div>

      <button class="h-13 rounded-2xl bg-red-500 text-white text-sm font-semibold active:scale-[0.98] transition">
        Cerrar sesión
      </button>

    </section>

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

  </div>
</template>

