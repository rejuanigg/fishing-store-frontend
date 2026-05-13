<script setup>
import { CircleAlert, CircleCheck, TriangleAlert } from '@lucide/vue';


defineEmits(['closeModal', 'confirmAction']);

const props = defineProps({
  title: String,
  text: String,

  variant: {
    type: String,
    default: 'info'
  },

  confirmText: {
    type: String,
    default: 'Continuar'
  },

  cancelText: {
    type: String,
    default: 'Cancelar'
  },

  showCancel: {
    type: Boolean,
    default: true
  }
})

const variants = {
  danger: {
    icon: CircleAlert,
    button: 'bg-red-500',
  },

  success: {
    icon: CircleCheck,
    button: 'bg-emerald-500',
  },

  warning: {
    icon: TriangleAlert,
    button: 'bg-amber-500'
  }
}

</script>

<template>

  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-5">

    <div class="w-full max-w-sm rounded-[32px] bg-white p-6 shadow-2xl flex flex-col gap-6 animate-[modal_.2s_ease]">

      <div class="flex flex-col items-center text-center gap-4">

        <div class="h-16 w-16 rounded-2xl flex items-center justify-center"
            :class="{
            'bg-red-50 text-red-500': variant === 'danger',
            'bg-emerald-50 text-emerald-500': variant === 'success',
            'bg-amber-50 text-amber-500': variant === 'warning'}">

          <component
            :is="variants[variant].icon"
            class="size-8"
          />

        </div>

        <div class="flex flex-col gap-2">

          <h2 class="text-xl font-bold text-emerald-950">
            {{title}}
          </h2>

          <p class="text-sm leading-6 text-gray-500">
            {{ text }}
          </p>

        </div>

      </div>

      <div class="flex flex-col gap-3">

        <button
          @click="$emit('confirmAction')"
          class="h-13 rounded-2xl text-white text-sm font-semibold active:scale-[0.98] transition"
          :class="variants[variant].button"
        >
          {{ confirmText }}
        </button>
        <button @click="$emit('closeModal')" v-if="showCancel" class="h-13 rounded-2xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold active:scale-[0.98] transition">
          Cancelar
        </button>

      </div>

    </div>

  </div>

</template>
