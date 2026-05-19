<script setup>
import Modal from '@/components/UI/Modal.vue';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/toast';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const toast = useToastStore();
const router = useRouter();

const name = ref(authStore.name ?? '');
const email = ref(authStore.email ?? '');

const actualPassword = ref('');
const newPassword = ref('');
const newPasswordConfirm = ref('');

const profileLoading = ref(false);
const passwordLoading = ref(false);
const logoutLoading = ref(false);

const modal = ref({
  visible: false,
  variant: 'warning',
  title: '',
  text: '',
  confirmText: '',
  action: null,
  showCancel: true,
});

watch(
  () => [authStore.name, authStore.email],
  ([newName, newEmail]) => {
    name.value = newName ?? '';
    email.value = newEmail ?? '';
  }
);

const canUpdateProfile = computed(() => {
  return name.value.trim() !== '' && email.value.trim() !== '' && !profileLoading.value;
});

const canChangePassword = computed(() => {
  return actualPassword.value !== '' && newPassword.value !== '' && newPasswordConfirm.value !== '' && newPassword.value === newPasswordConfirm.value && !passwordLoading.value;
});

function closeModal() {
  if (profileLoading.value || passwordLoading.value || logoutLoading.value) return;

  modal.value.visible = false;
}

async function handleModalConfirm() {
  if (typeof modal.value.action !== 'function') {
    modal.value.visible = false;
    return;
  }

  await modal.value.action();
}

async function refreshAuthUser() {
  if (typeof authStore.fetchMe === 'function') {
    await authStore.fetchMe();
  }
}

function openWarningProfileModal() {
  if (!canUpdateProfile.value) {
    toast.show('Atención', 'Completá tu nombre y email antes de guardar.', 'warning');
    return;
  }

  modal.value = {
    visible: true,
    variant: 'warning',
    title: 'Modificar datos personales',
    text: 'Si cambiás tu correo electrónico, recordalo para poder acceder nuevamente a tu cuenta.',
    confirmText: 'Guardar cambios',
    action: updateProfile,
    showCancel: true,
  };
}

async function updateProfile() {
  if (!canUpdateProfile.value) return;

  profileLoading.value = true;

  try {
    await api.patch('/edit_profile', {
      name: name.value.trim(),
      email: email.value.trim(),
    });

    await refreshAuthUser();

    modal.value = {
      visible: true,
      variant: 'success',
      title: 'Datos actualizados',
      text: 'Tu información personal fue modificada correctamente.',
      confirmText: 'Continuar',
      action: successModal,
      showCancel: false,
    };
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors ? Object.values(errors).flat().join(' | ') : error.response?.data?.message ?? 'No se pudieron modificar tus datos.';

    toast.show('Error', message, 'error');
  } finally {
    profileLoading.value = false;
  }
}

function openWarningPasswordModal() {
  if (!canChangePassword.value) {
    toast.show('Atención', 'Completá las contraseñas y verificá que coincidan.', 'warning');
    return;
  }

  modal.value = {
    visible: true,
    variant: 'warning',
    title: 'Cambiar contraseña',
    text: 'Recordá tu nueva contraseña. Sin ella no vas a poder acceder nuevamente.',
    confirmText: 'Cambiar contraseña',
    action: changePassword,
    showCancel: true,
  };
}

async function changePassword() {
  if (!canChangePassword.value) return;

  passwordLoading.value = true;

  try {
    await api.patch('/password', {
      actual_password: actualPassword.value,
      new_password: newPassword.value,
      new_password_confirmation: newPasswordConfirm.value,
    });

    actualPassword.value = '';
    newPassword.value = '';
    newPasswordConfirm.value = '';

    modal.value = {
      visible: true,
      variant: 'success',
      title: 'Contraseña modificada',
      text: 'La contraseña fue modificada correctamente.',
      confirmText: 'Continuar',
      action: successModal,
      showCancel: false,
    };
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors ? Object.values(errors).flat().join(' | ') : error.response?.data?.message ?? 'No se pudo modificar la contraseña.';

    toast.show('Error', message, 'error');
  } finally {
    passwordLoading.value = false;
  }
}

async function logout() {
  logoutLoading.value = true;

  try {
    await authStore.logout();
    router.push('/');
  } finally {
    logoutLoading.value = false;
  }
}

function successModal() {
  modal.value.visible = false;
  router.push('/');
}
</script>

<template>
  <div class="min-h-[100dvh] bg-slate-50 px-5 pb-28 pt-8">
    <div class="mx-auto flex w-full max-w-screen-md flex-col gap-6">
      <section class="flex flex-col gap-2">
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">Cuenta</span>
        <h1 class="text-3xl font-black tracking-tight text-emerald-950">Gestioná tu cuenta</h1>
        <p class="text-sm font-medium leading-6 text-slate-500">Administrá la información y seguridad de tu cuenta.</p>
      </section>

      <section class="rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <form @submit.prevent="openWarningProfileModal" class="flex flex-col gap-6">
          <div class="flex flex-col gap-1">
            <h2 class="text-lg font-black text-emerald-950">Información personal</h2>
            <p class="text-sm font-medium leading-6 text-slate-500">Actualizá los datos asociados a tu cuenta.</p>
          </div>

          <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-black text-emerald-900">Nombre</label>
              <input v-model="name" type="text" placeholder="Tu nombre" class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500">
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-black text-emerald-900">Email</label>
              <input v-model="email" type="email" placeholder="tuemail@email.com" class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500">
            </div>
          </div>

          <div class="flex flex-col gap-3 pt-2">
            <button type="submit" :disabled="!canUpdateProfile" class="h-13 rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100">
              <span v-if="profileLoading">Cargando...</span>
              <span v-else>Guardar cambios</span>
            </button>

            <p class="text-center text-xs font-medium text-slate-400">Los cambios se aplicarán inmediatamente en tu cuenta.</p>
          </div>
        </form>
      </section>

      <section class="rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <form @submit.prevent="openWarningPasswordModal" class="flex flex-col gap-6">
          <div class="flex flex-col gap-1">
            <h2 class="text-lg font-black text-emerald-950">Seguridad</h2>
            <p class="text-sm font-medium leading-6 text-slate-500">Cambiá tu contraseña para proteger tu cuenta.</p>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-black text-emerald-900">Contraseña actual</label>
            <input v-model="actualPassword" type="password" autocomplete="current-password" class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition focus:border-emerald-500">
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-black text-emerald-900">Nueva contraseña</label>
            <input v-model="newPassword" type="password" autocomplete="new-password" class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition focus:border-emerald-500">
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-black text-emerald-900">Confirmar nueva contraseña</label>
            <input v-model="newPasswordConfirm" type="password" autocomplete="new-password" class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition focus:border-emerald-500">
          </div>

          <button type="submit" :disabled="!canChangePassword" class="h-13 rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100">
            <span v-if="passwordLoading">Cargando...</span>
            <span v-else>Cambiar contraseña</span>
          </button>
        </form>
      </section>

      <section class="rounded-[34px] border border-red-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
        <div class="flex flex-col gap-1">
          <h2 class="text-lg font-black text-red-600">Sesión</h2>
          <p class="text-sm font-medium leading-6 text-slate-500">Cerrá tu sesión actual en este dispositivo.</p>
        </div>

        <button type="button" @click="logout" :disabled="logoutLoading" class="mt-5 h-13 w-full rounded-2xl border border-red-200 bg-red-50 text-sm font-black text-red-600 transition active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100">
          <span v-if="logoutLoading">Cargando...</span>
          <span v-else>Cerrar sesión</span>
        </button>
      </section>
    </div>

    <Modal v-if="modal.visible" :variant="modal.variant" :title="modal.title" :text="modal.text" :confirm-text="profileLoading || passwordLoading ? 'Cargando...' : modal.confirmText" :show-cancel="modal.showCancel" @confirm-action="handleModalConfirm" @close-modal="closeModal" />
  </div>
</template>
