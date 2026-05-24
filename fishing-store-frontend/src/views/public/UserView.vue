<script setup>
import Modal from '@/components/UI/Modal.vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter()

const logout = () => {
  authStore.logout();
  router.push('/');
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

const openSuccessModal = () => {
  modal.value = {
    visible: true,
    variant: 'warning',
    title: '¿Cerrar Sesión?',
    text: "Puede volver a iniciar sesión en el inicio con el boton 'Iniciar Sesión'",
    confirmText: 'Continuar',
    action: logout
  }
}

const closeModal = () => {
  modal.value.visible = false
}

</script>

<template>
  <section v-if="!authStore.isLoggedIn" class="min-h-[100dvh] bg-slate-50 px-5 pb-28 pt-8">
    <div class="overflow-hidden rounded-[34px] border border-slate-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <div class="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-6 pb-7 pt-8 text-center">
        <div class="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-100 blur-3xl"></div>
        <div class="absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-cyan-100 blur-3xl"></div>

        <div class="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-white text-blue-600 shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-9">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>

        <div class="relative mt-5">
          <span class="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">Cuenta</span>
          <h1 class="mt-2 text-2xl font-black tracking-tight text-blue-950">Iniciá sesión</h1>
          <p class="mx-auto mt-2 max-w-[300px] text-sm font-medium leading-6 text-slate-500">
            Accedé para ver tus pedidos, actualizar tus datos y seguir el estado de tus compras.
          </p>
        </div>
      </div>

      <div class="p-5">
        <div class="flex flex-col gap-3">
          <RouterLink to="/login" class="flex h-14 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98]">
            Iniciar sesión
          </RouterLink>

          <RouterLink to="/register" class="flex h-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-sm font-black text-blue-700 transition active:scale-[0.98]">
            Crear cuenta
          </RouterLink>
        </div>
      </div>
    </div>

    <section class="mt-6 overflow-hidden rounded-[34px] border border-blue-100 bg-blue-950 p-6 text-white shadow-[0_18px_45px_rgba(2,44,34,0.18)]">
      <div>
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-blue-300">Beneficios</span>
        <h2 class="mt-2 text-xl font-black leading-tight">Comprá más rápido y seguí tus pedidos.</h2>
        <p class="mt-2 text-sm font-medium leading-6 text-blue-50/75">
          Tu cuenta te permite consultar el estado de tus órdenes y coordinar mejor tus compras.
        </p>
      </div>

      <div class="mt-5 flex flex-col gap-3">
        <div class="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sm font-black">1</div>
          <span class="text-sm font-semibold text-blue-50">Guardá tus datos de cuenta.</span>
        </div>

        <div class="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sm font-black">2</div>
          <span class="text-sm font-semibold text-blue-50">Consultá órdenes activas e historial.</span>
        </div>

        <div class="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sm font-black">3</div>
          <span class="text-sm font-semibold text-blue-50">Coordiná tus pedidos por WhatsApp.</span>
        </div>
      </div>
    </section>
  </section>

  <section v-else class="min-h-[100dvh] bg-slate-50 pb-28">
    <section class="relative overflow-hidden rounded-b-[40px] bg-blue-950 px-5 pb-8 pt-10 text-white shadow-[0_18px_45px_rgba(2,44,34,0.18)]">
      <div class="absolute -right-20 top-8 h-52 w-52 rounded-full bg-blue-400/20 blur-3xl"></div>
      <div class="absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl"></div>

      <div class="relative flex items-center gap-4">
        <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-[26px] border border-white/15 bg-white/10 text-2xl font-black text-white backdrop-blur-md">
          {{ authStore.name?.charAt(0)?.toUpperCase() }}
        </div>

        <div class="min-w-0 flex-1">
          <span class="text-sm font-semibold text-blue-100/80">Bienvenido</span>
          <h1 class="mt-1 truncate text-2xl font-black tracking-tight text-white">{{ authStore.name }}</h1>
          <p class="mt-1 truncate text-xs font-medium text-blue-50/70">{{ authStore.email }}</p>
        </div>
      </div>
    </section>

    <main class="px-5 pt-6">
      <section class="rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div class="flex items-start justify-between gap-4">
          <div>
            <span class="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">Perfil</span>
            <h2 class="mt-2 text-xl font-black text-blue-950">Información personal</h2>
            <p class="mt-1 text-sm font-medium leading-6 text-slate-500">Datos principales de tu cuenta.</p>
          </div>
        </div>

        <div class="mt-5 rounded-[28px] border border-slate-100 bg-slate-50/80 p-4">
          <span class="text-[11px] font-black uppercase tracking-wide text-slate-400">Email</span>
          <p class="mt-1 break-all text-sm font-bold text-blue-950">{{ authStore.email }}</p>
        </div>
      </section>

      <section class="mt-5 rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div>
          <span class="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">Cuenta</span>
          <h2 class="mt-2 text-xl font-black text-blue-950">Seguridad</h2>
          <p class="mt-1 text-sm font-medium leading-6 text-slate-500">Administrá tus datos y sesión.</p>
        </div>

        <div class="mt-5 flex flex-col gap-3">
          <RouterLink to="/user/edit" class="flex h-13 min-h-[52px] items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 px-5 text-sm font-black text-blue-700 transition active:scale-[0.98]">
            Modificar datos personales
          </RouterLink>

          <button @click="openSuccessModal" type="button" class="flex h-13 min-h-[52px] items-center justify-center rounded-2xl bg-red-50 px-5 text-sm font-black text-red-600 transition active:scale-[0.98]">
            Cerrar sesión
          </button>
        </div>
      </section>

      <section class="mt-5 rounded-[34px] border border-blue-100 bg-blue-50/70 p-5">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">✓</div>

          <div>
            <h3 class="text-sm font-black text-blue-950">Tus pedidos quedan guardados</h3>
            <p class="mt-1 text-xs font-medium leading-5 text-blue-700">
              Desde Órdenes podés consultar pedidos activos e historial.
            </p>
          </div>
        </div>
      </section>
    </main>

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
