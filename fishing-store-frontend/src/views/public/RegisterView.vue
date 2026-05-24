<script setup>
import api from '@/services/api';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToastStore } from '@/stores/toast';
import { CircleOff } from '@lucide/vue';

const router = useRouter();
const toast = useToastStore();

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const registerLoading = ref(false);

const canSubmit = computed(() => {
  return name.value.trim() !== '' && email.value.trim() !== '' && password.value.length >= 8 && password.value === passwordConfirmation.value && !registerLoading.value;
});

async function onSubmit() {
  if (!canSubmit.value) {
    if (password.value.length < 8) {
      toast.show('Atención', 'La contraseña debe tener al menos 8 caracteres.', 'warning');
      return;
    }

    if (password.value !== passwordConfirmation.value) {
      toast.show('Atención', 'Las contraseñas no coinciden.', 'warning');
      return;
    }

    toast.show('Atención', 'Completá todos los campos antes de crear la cuenta.', 'warning');
    return;
  }

  registerLoading.value = true;

  try {
    await api.post('/register', {
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    });

    toast.show('Éxito', 'Cuenta creada correctamente. Ahora podés iniciar sesión.', 'success');

    router.replace('/login');
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors ? Object.values(errors).flat().join(' | ') : error.response?.data?.message ?? 'No se pudo crear la cuenta. Revisá los datos e intentá nuevamente.';

    toast.show('Error', message, 'error');
  } finally {
    registerLoading.value = false;
  }
}
</script>

<template>
  <div class="relative min-h-[100dvh] overflow-hidden">
    <div class="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50">
      <div class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/45 blur-3xl"></div>
      <div class="absolute -right-24 top-32 h-80 w-80 rounded-full bg-cyan-200/35 blur-3xl"></div>
      <div class="absolute -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-100/55 blur-3xl"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_36%)]"></div>
    </div>

    <main class="relative z-10 flex min-h-[100dvh] w-full items-center justify-center px-5 py-10 sm:px-6 lg:px-10">
      <div class="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section class="hidden rounded-[34px] border border-white/70 bg-white/65 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:block">
          <div class="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
            <span class="h-2 w-2 rounded-full bg-blue-500"></span>
            <span class="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Tienda generica</span>
          </div>

          <h1 class="mt-8 max-w-md text-5xl font-black leading-[1.05] tracking-tight text-blue-950">Comprá simple. Coordiná rápido.</h1>
          <p class="mt-5 max-w-md text-base font-medium leading-relaxed text-slate-500">Una experiencia pensada para descubrir productos, armar tu pedido y coordinar por WhatsApp sin vueltas.</p>

          <div class="mt-10 grid gap-3">
            <div class="rounded-[28px] border border-blue-100 bg-white/80 p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
              <p class="text-sm font-black text-blue-950">Productos destacados</p>
              <p class="mt-1 text-sm font-medium text-slate-500">Encontrá rápido lo más recomendado para tu próxima salida.</p>
            </div>

            <div class="rounded-[28px] border border-cyan-100 bg-white/80 p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
              <p class="text-sm font-black text-blue-950">Pedidos por WhatsApp</p>
              <p class="mt-1 text-sm font-medium text-slate-500">La tienda crea tu orden y después coordinás pago, retiro o entrega.</p>
            </div>
          </div>
        </section>

        <section class="mx-auto w-full max-w-md">
          <div class="mb-6 text-center lg:hidden">
            <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
              <span class="text-2xl"><CircleOff /></span>
            </div>

            <p class="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Tienda Generica</p>
            <h1 class="mt-2 text-3xl font-black tracking-tight text-blue-950">Creá tu cuenta</h1>
            <p class="mt-2 text-sm font-medium leading-relaxed text-slate-500">Pedí más rápido y seguí tus órdenes desde la tienda.</p>
          </div>

          <div class="rounded-[34px] border border-white/80 bg-white/90 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-8">
            <div class="hidden lg:block">
              <p class="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Crear cuenta</p>
              <h2 class="mt-3 text-3xl font-black tracking-tight text-blue-950">Bienvenido</h2>
              <p class="mt-2 text-sm font-medium leading-relaxed text-slate-500">Registrate para hacer pedidos y consultar el estado de tus compras.</p>
            </div>

            <form class="mt-6 flex w-full flex-col gap-5 lg:mt-8" @submit.prevent="onSubmit" id="register">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-black text-blue-950" for="register-name">Nombre</label>
                <input v-model="name" id="register-name" type="text" autocomplete="name" placeholder="Tu nombre" class="min-h-[54px] rounded-2xl border border-slate-200 bg-slate-50/80 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100">
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-sm font-black text-blue-950" for="register-email">Email</label>
                <input v-model="email" id="register-email" type="email" autocomplete="email" placeholder="example@user.com" class="min-h-[54px] rounded-2xl border border-slate-200 bg-slate-50/80 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100">
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-sm font-black text-blue-950" for="register-password">Contraseña</label>
                <input v-model="password" id="register-password" type="password" autocomplete="new-password" placeholder="Mínimo 8 caracteres" class="min-h-[54px] rounded-2xl border border-slate-200 bg-slate-50/80 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100">
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-sm font-black text-blue-950" for="register-password-confirmation">Confirmar contraseña</label>
                <input v-model="passwordConfirmation" id="register-password-confirmation" type="password" autocomplete="new-password" placeholder="Repetí tu contraseña" class="min-h-[54px] rounded-2xl border border-slate-200 bg-slate-50/80 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100">
              </div>

              <p v-if="password && password.length < 8" class="rounded-2xl bg-amber-50 px-4 py-3 text-xs font-bold leading-5 text-amber-700">La contraseña debe tener al menos 8 caracteres.</p>

              <p v-if="passwordConfirmation && password !== passwordConfirmation" class="rounded-2xl bg-red-50 px-4 py-3 text-xs font-bold leading-5 text-red-600">Las contraseñas no coinciden.</p>

              <button type="submit" :disabled="!canSubmit" class="mt-2 min-h-[56px] rounded-2xl bg-blue-600 px-5 text-base font-black text-white shadow-[0_14px_32px_oklch(0.424 0.199 265.638)] transition hover:bg-blue-700 active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100">
                <span v-if="registerLoading">Cargando...</span>
                <span v-else>Crear cuenta</span>
              </button>
            </form>

            <div class="mt-6 rounded-3xl border border-blue-100 bg-blue-50/70 px-5 py-4 text-center">
              <span class="text-sm font-semibold text-slate-600">
                ¿Ya tenés una cuenta?
                <RouterLink class="font-black text-blue-700" to="/login">Ingresá</RouterLink>
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
