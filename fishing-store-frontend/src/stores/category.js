import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useCategoryStore = defineStore('category', () => {
  const sections = ref([])
  const categories = ref([])
  const isLoading = ref(false)

  const fetch = async () => {
    if (sections.value.length > 0) return  // ya están cargadas

    isLoading.value = true
    const [resSections, resCategories] = await Promise.all([
      api.get('/sections'),
      api.get('/categories')
    ])
    sections.value = resSections.data.data
    categories.value = resCategories.data.data
    isLoading.value = false
  }

  const refresh = async () => {
  isLoading.value = true
  const [resSections, resCategories] = await Promise.all([
    api.get('/sections'),
    api.get('/categories')
  ])
  sections.value = resSections.data.data
  categories.value = resCategories.data.data
  isLoading.value = false
}

return { sections, categories, isLoading, fetch, refresh }

})
