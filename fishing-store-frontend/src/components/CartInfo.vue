<script setup>
import api from '@/services/api';
import { cartStore } from '@/stores/cart';
import { useFormatPrice } from '@/composables/useFormatPrice';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const cart = cartStore();
const router = useRouter();
const loading = ref(false);

const { formatPrice } = useFormatPrice();

const whatsappPhone = '5493876190835';

async function confirmOrder() {
  if (cart.product.length === 0 || loading.value) return;

  loading.value = true;

  const cartProducts = cart.product.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
  }));

  const total = cart.total;

  const whatsappWindow = window.open('', '_blank');

  try {
    const response = await api.post('/orders', {
      products: cartProducts.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
      })),
    });

    const orderId = response.data?.data?.id ?? response.data?.id ?? null;

    const productsText = cartProducts.map((product, index) => {
      const subtotal = Number(product.price) * Number(product.quantity);

      return `${index + 1}. ${product.name} x${product.quantity} - ${formatPrice(subtotal)}`;
    }).join('\n');

    const message = [
      'Hola, buenas. Quiero confirmar una compra realizada desde la tienda online.',
      '',
      orderId ? `Número de orden: #${orderId}` : null,
      '',
      'Detalle del pedido:',
      productsText,
      '',
      `Total estimado: ${formatPrice(total)}`,
      '',
      'Quedo atento/a para coordinar la confirmación, el pago y la entrega.',
      'Muchas gracias.'
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;

    if (whatsappWindow) {
      whatsappWindow.location.href = whatsappUrl;
    } else {
      window.location.href = whatsappUrl;
    }

    cart.delete();

    return router.push('/orders');
  } catch (error) {
    if (whatsappWindow) {
      whatsappWindow.close();
    }

    console.error(error);
    alert('No se pudo generar la orden. Intentá nuevamente.');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="rounded-[28px] border border-blue-100 bg-white p-4 shadow-[0_-10px_35px_rgba(15,23,42,0.08)]">
      <div class="flex items-start justify-between gap-4">
        <div>
          <span class="text-[11px] font-black uppercase tracking-wide text-slate-400">
            Total
          </span>

          <p class="mt-1 text-sm font-semibold text-slate-500">
            {{ cart.count }} {{ cart.count === 1 ? 'producto' : 'productos' }}
          </p>
        </div>

        <span class="text-2xl font-black tracking-tight text-blue-950">
          {{ formatPrice(cart.total) }}
        </span>
      </div>

<button @click="confirmOrder" :disabled="cart.product.length === 0 || loading" class="mt-4 flex min-h-14 w-full items-center justify-center rounded-2xl bg-blue-500 px-3 py-3 text-center text-sm font-black leading-tight text-white shadow-lg shadow-blue-500/20 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none max-[300px]:text-[13px]">
  <span v-if="loading">
    Procesando...
  </span>

  <span v-else class="flex min-w-0 items-center justify-center gap-2">
    <svg class="h-5 w-5 shrink-0" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.04 3C8.86 3 3.02 8.84 3.02 16.02c0 2.3.6 4.55 1.75 6.53L3 29l6.62-1.73a13 13 0 0 0 6.42 1.68h.01c7.18 0 13.02-5.84 13.02-13.02C29.07 8.84 23.23 3 16.04 3Zm0 23.75h-.01c-1.91 0-3.78-.51-5.42-1.48l-.39-.23-3.93 1.03 1.05-3.83-.25-.39a10.75 10.75 0 0 1-1.65-5.83c0-5.93 4.83-10.76 10.77-10.76 2.87 0 5.57 1.12 7.6 3.15a10.7 10.7 0 0 1 3.15 7.6c0 5.94-4.83 10.76-10.76 10.76Zm5.9-8.06c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.59-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.15-.15.32-.38.49-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.57.08-.86.4-.3.32-1.13 1.11-1.13 2.71s1.16 3.14 1.32 3.36c.16.21 2.28 3.49 5.53 4.9.77.33 1.37.53 1.84.68.77.24 1.47.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.37Z" />
    </svg>

    <span class="hidden min-[300px]:inline">
      Confirmar pedido por WhatsApp
    </span>

    <span class="inline min-[300px]:hidden">
      Confirmar por WhatsApp
    </span>
  </span>
</button>

      <p class="mt-3 text-center text-[11px] font-medium leading-5 text-slate-400">
        El total final se confirma al generar la orden.
      </p>
    </div>
  </div>
</template>
