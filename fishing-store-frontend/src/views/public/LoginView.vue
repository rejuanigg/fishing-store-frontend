<script setup>
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/toast';
import { CircleOff } from '@lucide/vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToastStore();

const email = ref('');
const password = ref('');

const loginLoading = ref(false);

const canSubmit = computed(() => {
  return email.value.trim() !== '' && password.value.trim() !== '' && !loginLoading.value;
});

async function onSubmit() {
  if (!canSubmit.value) {
    toast.show('Atención', 'Completá email y contraseña antes de ingresar.', 'warning');
    return;
  }

  loginLoading.value = true;

  try {
    const response = await api.post('/login', {
      email: email.value.trim(),
      password: password.value,
    });

    authStore.login(response.data.token, response.data.id);
    localStorage.setItem('token', response.data.token);

    if (typeof authStore.fetchMe === 'function') {
      await authStore.fetchMe();
    }

    toast.show('Éxito', 'Sesión iniciada correctamente.', 'success');

    router.replace('/');
  } catch (error) {
    const errors = error.response?.data?.errors;

    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo iniciar sesión. Revisá tus datos.';

    toast.show('Error', message, 'error');
  } finally {
    loginLoading.value = false;
  }
}
</script>

<template>
  <div class="relative min-h-[100dvh] overflow-hidden">
    <div class="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-emerald-50 via-slate-50 to-cyan-50">
      <div class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-200/45 blur-3xl"></div>
      <div class="absolute -right-24 top-32 h-80 w-80 rounded-full bg-cyan-200/35 blur-3xl"></div>
      <div class="absolute -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-100/55 blur-3xl"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_36%)]"></div>
    </div>

    <main class="relative z-10 flex min-h-[100dvh] w-full items-center justify-center px-5 py-10 sm:px-6 lg:px-10">
      <div class="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section class="hidden rounded-[34px] border border-white/70 bg-white/65 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:block">
          <div class="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2">
            <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span class="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Tienda Generica</span>
          </div>

          <h1 class="mt-8 max-w-md text-5xl font-black leading-[1.05] tracking-tight text-emerald-950">
            Volvé a tu tienda. Revisá tus pedidos.
          </h1>

          <p class="mt-5 max-w-md text-base font-medium leading-relaxed text-slate-500">
            Ingresá para continuar compras, consultar órdenes activas y coordinar tus pedidos por WhatsApp.
          </p>

          <div class="mt-10 grid gap-3">
            <div class="rounded-[28px] border border-emerald-100 bg-white/80 p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
              <p class="text-sm font-black text-emerald-950">Seguimiento de pedidos</p>
              <p class="mt-1 text-sm font-medium text-slate-500">Consultá si tu pedido está en espera, en proceso o listo.</p>
            </div>

            <div class="rounded-[28px] border border-cyan-100 bg-white/80 p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
              <p class="text-sm font-black text-emerald-950">Compra más simple</p>
              <p class="mt-1 text-sm font-medium text-slate-500">Armá tu carrito y coordiná pago, retiro o entrega directamente.</p>
            </div>
          </div>
        </section>

        <section class="mx-auto w-full max-w-md">
          <div class="mb-6 text-center lg:hidden">
            <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
              <span class="text-2xl"><CircleOff /></span>
            </div>

            <p class="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">Tienda generica</p>
            <h1 class="mt-2 text-3xl font-black tracking-tight text-emerald-950">Iniciá sesión</h1>
            <p class="mt-2 text-sm font-medium leading-relaxed text-slate-500">Entrá para ver tus pedidos y comprar más rápido.</p>
          </div>

          <div class="rounded-[34px] border border-white/80 bg-white/90 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-8">
            <div class="hidden lg:block">
              <p class="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">Ingresar</p>
              <h2 class="mt-3 text-3xl font-black tracking-tight text-emerald-950">Bienvenido de vuelta</h2>
              <p class="mt-2 text-sm font-medium leading-relaxed text-slate-500">Accedé a tu cuenta para continuar con tus compras y pedidos.</p>
            </div>

            <form class="mt-6 flex w-full flex-col gap-5 lg:mt-8" @submit.prevent="onSubmit" id="login">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-black text-emerald-950" for="login-email">Email</label>

                <input
                  v-model="email"
                  id="login-email"
                  type="email"
                  autocomplete="email"
                  placeholder="example@user.com"
                  class="min-h-[54px] rounded-2xl border border-slate-200 bg-slate-50/80 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                >
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-sm font-black text-emerald-950" for="login-password">Contraseña</label>

                <input
                  v-model="password"
                  id="login-password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Tu contraseña"
                  class="min-h-[54px] rounded-2xl border border-slate-200 bg-slate-50/80 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                >
              </div>

              <button
                type="submit"
                :disabled="!canSubmit"
                class="mt-2 min-h-[56px] rounded-2xl bg-emerald-600 px-5 text-base font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition hover:bg-emerald-700 active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100"
              >
                <span v-if="loginLoading">Cargando...</span>
                <span v-else>Iniciar sesión</span>
              </button>
            </form>

            <div class="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50/70 px-5 py-4 text-center">
              <span class="text-sm font-semibold text-slate-600">
                ¿No tenés una cuenta?
                <RouterLink class="font-black text-emerald-700" to="/register">Registrate</RouterLink>
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
