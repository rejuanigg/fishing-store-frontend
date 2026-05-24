<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { CircleAlert, CircleCheck, TriangleAlert, Info } from '@lucide/vue';

const emit = defineEmits(['closeModal', 'confirmAction']);

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
})

const variants = {
  info: {
    icon: Info,
    bg: 'bg-slate-800',
  },

  danger: {
    icon: CircleAlert,
    bg: 'bg-red-600',
  },

  success: {
    icon: CircleCheck,
    bg: 'bg-blue-700',
  },

  warning: {
    icon: TriangleAlert,
    bg: 'bg-amber-500'
  }
}

const isVisible = ref(false)

let hideTimeout = null
let closeTimeout = null

const activeVariant = computed(() => {
  return variants[props.variant] ?? variants.info
})

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })

  hideTimeout = setTimeout(() => {
    isVisible.value = false

    closeTimeout = setTimeout(() => {
      emit('closeModal')
    }, 220)
  }, 2800)
})

onUnmounted(() => {
  clearTimeout(hideTimeout)
  clearTimeout(closeTimeout)
})
</script>

<template>
  <div
    class="fixed left-4 right-4 bottom-24 z-50 transition duration-300 ease-out"
    :class="isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-[0.98]'"
  >
    <div
      class="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_14px_35px_rgba(15,23,42,0.18)] transition active:scale-[0.99]"
      :class="activeVariant.bg"
    >
      <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
        <component
          :is="activeVariant.icon"
          class="size-5"
        />
      </div>

      <div class="min-w-0 flex-1">
        <p class="text-sm font-bold text-white">{{ props.title }}</p>
        <p class="text-xs font-medium text-white/90">{{ props.text }}</p>
      </div>
    </div>
  </div>
</template>
