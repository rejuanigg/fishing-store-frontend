import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {
  const toast = ref(null)

  const show = (title, text, variant = 'success') => {
    toast.value = { title, text, variant }
  }

  const hide = () => {
    toast.value = null
  }

  return { toast, show, hide }
})
